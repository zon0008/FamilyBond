# 🛠 Supabase SNS 로그인(Google, Kakao) 활성화 가이드

현재 발생하고 있는 `Unsupported provider` 에러는 Supabase 프로젝트 설정에서 해당 로그인 기능을 활성화하지 않았기 때문입니다. 아래 단계에 따라 설정을 완료하시면 소셜 로그인이 정상 작동합니다.

---

## 1. Supabase 대시보드 접속
1. [Supabase Dashboard](https://supabase.com/dashboard)에 로그인합니다.
2. 해당 프로젝트(**FamilyBond**)를 선택합니다.

## 2. 인증 제공자(Providers) 설정 이동
1. 왼쪽 사이드바 맨 아래에서 **Authentication** (자물쇠 아이콘) 혹은 **Settings** > **Authentication**을 클릭합니다.
2. 상단 탭에서 **Configuration** > **Providers**를 선택합니다.

## 3. SNS 공급자 활성화 (Google/Kakao)

### [카카오(Kakao) 설정]
1. 목록에서 **Kakao**를 찾아 클릭하여 펼칩니다.
2. **Kakao 활성화(Enable Kakao)** 스위치를 켭니다.
3. [카카오 개발자 센터](https://developers.kakao.com/)에서 발급받은 **REST API 키**를 `Client ID`에, **Client Secret**을 해당 칸에 입력합니다.
4. **Save**를 누릅니다.

### [구글(Google) 설정]
1. 목록에서 **Google**을 찾아 클릭하여 펼칩니다.
2. **Google 활성화(Enable Google)** 스위치를 켭니다.
3. [Google Cloud Console](https://console.cloud.google.com/)에서 생성한 **Client ID**와 **Client Secret**을 입력합니다.
4. **Save**를 누릅니다.

## 4. 사이트 URL 설정 확인
1. **Authentication** > **URL Configuration**으로 이동합니다.
2. **Site URL**이 `https://family-bond-final.vercel.app`으로 되어 있는지 확인합니다.
3. **Redirect URLs**에 `https://family-bond-final.vercel.app/auth/callback`을 추가합니다.

---

> [!TIP]
> 위 설정이 복잡하시다면, 로그인 페이지 최상단에 추가된 **"테스트 계정으로 즉시 둘러보기 (Demo)"** 버튼을 클릭하여 즉시 앱을 테스트해 보실 수 있습니다!
