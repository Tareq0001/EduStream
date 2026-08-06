import { createClient } from '@supabase/supabase-js'

// Replace with your Supabase project URL and anon key
const supabaseUrl = 'https://your-project.supabase.co'
const supabaseAnonKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Example function to fetch courses
export const fetchCourses = async () => {
    const { data, error } = await supabase
        .from('courses')
        .select('*')
    
    if (error) {
        console.error('Error fetching courses:', error)
        return []
    }
    return data
}
