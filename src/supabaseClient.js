import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mhujohelpoculcrzungq.supabase.co";
const supabaseKey = "sb_publishable_mKix_UFXKUNiDJARO0P1HA_6FMLPYQw";

export const supabase = createClient(supabaseUrl, supabaseKey);