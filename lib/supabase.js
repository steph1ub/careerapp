import { createClient } from "@supabase/supabase-js";
const supabaseURL= process.env.NEXT_PUBLIC_SUPABASE_URL
const supabasKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
export const supabase = createClient (supabaseURL,supabasKey)



