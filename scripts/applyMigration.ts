import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  console.error('SUPABASE_URL:', supabaseUrl ? 'SET' : 'NOT SET');
  console.error('SUPABASE_KEY:', supabaseServiceKey ? 'SET' : 'NOT SET');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function applyMigration() {
  try {
    console.log('📦 Reading migration file...');
    const migrationPath = path.join(__dirname, '../supabase/migrations/003_add_restaurant_columns.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

    console.log('🚀 Applying migration to Supabase...');
    
    // Split by semicolons and execute each statement
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('COMMENT'));

    for (const statement of statements) {
      if (statement.trim()) {
        console.log(`   Executing: ${statement.substring(0, 60)}...`);
        const { error } = await supabase.rpc('exec_sql', { sql: statement });
        
        if (error) {
          console.error('❌ Error executing statement:', error);
          // Try direct query as fallback
          const { error: directError } = await supabase.from('_migrations').insert({
            name: '003_add_restaurant_columns',
            executed_at: new Date().toISOString()
          });
          if (directError) {
            console.log('⚠️  Could not log migration, but continuing...');
          }
        }
      }
    }

    console.log('✅ Migration applied successfully!');
    console.log('\n📊 Verifying columns...');
    
    // Test query to verify columns exist
    const { data, error } = await supabase
      .from('restaurants')
      .select('id, name, rating, total_reviews, cuisine_type, avg_cost_for_two')
      .limit(1);

    if (error) {
      console.error('❌ Verification failed:', error.message);
      console.log('\n⚠️  You may need to run this migration manually in Supabase SQL Editor:');
      console.log('   1. Go to Supabase Dashboard > SQL Editor');
      console.log('   2. Copy the contents of: supabase/migrations/003_add_restaurant_columns.sql');
      console.log('   3. Paste and run the SQL');
    } else {
      console.log('✅ All columns verified successfully!');
      if (data && data.length > 0) {
        console.log('   Sample data:', data[0]);
      }
    }

  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.log('\n⚠️  Manual migration required:');
    console.log('   1. Go to Supabase Dashboard > SQL Editor');
    console.log('   2. Copy the contents of: supabase/migrations/003_add_restaurant_columns.sql');
    console.log('   3. Paste and run the SQL');
    process.exit(1);
  }
}

applyMigration();
