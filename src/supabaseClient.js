import { createClient } from '@supabase/supabase-js';

// Reemplaza con la URL y clave pública de tu proyecto en Supabase

const supabaseUrl = 'https://wmbwoynuiyimtqgdasio.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtYndveW51aXlpbXRxZ2Rhc2lvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTAxMzI1MCwiZXhwIjoyMDQ2NTg5MjUwfQ.MayObtoQtRq28n7HKPtMl9ChLglNZ-bmmAR3Tuj6w84"/*process.env.SUPABASE_KEY*/

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;