-- ==========================================
-- FamilyBond 최고 보안 레벨 (RLS) 및 Admin 스키마 정의
-- ==========================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users 테이블 (auth.users와 연동되는 Public 프로필 + Verified 상태 추가)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  trust_score INT DEFAULT 50, 
  preferred_lang TEXT DEFAULT 'ko',
  is_verified BOOLEAN DEFAULT false
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile." ON public.users FOR UPDATE USING (auth.uid() = id);

-- 2. Posts 테이블 (상태: pending, approved, rejected, blind)
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  search_target_name TEXT NOT NULL,
  location_code TEXT,
  timezone TEXT,
  story_text TEXT NOT NULL,
  contact_info TEXT, -- 원본 연락처 (암호화/마스킹 대상)
  status TEXT DEFAULT 'pending',
  audio_url TEXT, -- 목소리 증거 (Supabase Storage URL)
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
-- [중개자 방어 규칙] 오직 status가 'approved'인 것만 대중에게 오픈. (Admin은 모두 볼 수 있음)
CREATE POLICY "Approved Posts are viewable by public." ON public.posts FOR SELECT USING (status = 'approved');
CREATE POLICY "Authenticated users can insert posts." ON public.posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can edit their own posts." ON public.posts FOR UPDATE USING (auth.uid() = author_id);

CREATE INDEX idx_posts_location ON public.posts(location_code);

-- 3. Interactions 테이블 (Micro-Yes 퍼널 데이터)
CREATE TABLE public.interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  supporter_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL CHECK (interaction_type IN ('HEART', 'MESSAGE', 'SUBSCRIBE')),
  message_content TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.interactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Post author can view interactions" ON public.interactions FOR SELECT USING (EXISTS (SELECT 1 FROM public.posts WHERE id = post_id AND author_id = auth.uid()));
CREATE POLICY "Supporters can view their own interactions" ON public.interactions FOR SELECT USING (auth.uid() = supporter_id);
CREATE POLICY "Authenticated users can insert interactions" ON public.interactions FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 4. Audit Logs (관리자 무결성 기록 - Admin Dashboard)
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES public.users(id),
  target_post_id UUID REFERENCES public.posts(id),
  action TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
-- 롤이 어드민인 유저만 로그 기록 열람 가능. (Supabase claims 연동)
CREATE POLICY "Admins can view audit logs" ON public.audit_logs FOR SELECT USING (auth.jwt()->>'role' = 'admin');

-- 5. Match Requests (매칭 승인 시스템 컨트롤 타워)
CREATE TABLE public.match_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  requester_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  target_post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  request_reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'revoked')),
  admin_memo TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.match_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own match requests" ON public.match_requests FOR SELECT USING (auth.uid() = requester_id);
CREATE POLICY "Admins can manage all match requests" ON public.match_requests FOR ALL USING (auth.jwt()->>'role' = 'admin');
