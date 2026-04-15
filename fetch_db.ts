import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
    'https://qelysliakmygxyxwgupf.supabase.co',
    'sb_publishable_rRKVF5q2D73FZnpkcJ0EeQ_9tbSB5mG'
);

async function check() {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) console.error(error);
    else console.log(JSON.stringify(data, null, 2));
}
check();
