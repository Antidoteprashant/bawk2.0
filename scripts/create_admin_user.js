import { createClient } from '@supabase/supabase-js';

// Load env vars manually since we are running via node
const supabaseUrl = 'https://thkxdoawntcjxkbxuhyc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoa3hkb2F3bnRjanhrYnh1aHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NjIxNjcsImV4cCI6MjA4NjAzODE2N30.rDw9iclea9fF66pGypeBb3h8B5FB2Daz5Jp0mHfAMSA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
    const email = 'admin2@bawk.com';
    const password = 'admin123';

    console.log(`Creating user: ${email}...`);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                role: 'admin',
                full_name: 'System Administrator'
            }
        }
    });

    if (error) {
        console.error('Error creating user:', error.message);
    } else {
        console.log('User created successfully:', data);
        console.log('Please check your email for confirmation (if required).');
        // Note: If using fake email, you might need to disable confirm email in Supabase dashboard
        // or use the In-App Confirmation link from dashboard.
    }
}

createAdmin();
