
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nkymrcptkbtkvhfpfwpa.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5reW1yY3B0a2J0a3ZoZnBmd3BhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MTI1NTQsImV4cCI6MjA4NTM4ODU1NH0.RbhKxoAFrhDs26pl-BwEDHHyp1mrRqy3v0LYYQQJxlU';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function createUser() {
    console.log('Creating user...');

    // 1. Check if user exists (we can't easily with anon key, but we can try to sign up)
    const { data, error } = await supabase.auth.signUp({
        email: 'maksymilian.kasprowicz@gmail.com',
        password: '!Ka5pr0w1cz',
    });

    if (error) {
        console.error('Error creating user:', error.message);
    } else {
        console.log('User created successfully (or email sent):', data.user?.email);
    }
}

createUser();
