import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.NEXT_PUBLIC_NEON_DB_CONNECTION_STRING!);

async function main() {
    try {
        console.log("Adding columns to doubts table...");
        await sql`ALTER TABLE doubts ADD COLUMN IF NOT EXISTS "subTopic" varchar(255);`;
        console.log("Successfully ensured subTopic column.");
        
        console.log("Checking users table for moderation columns...");
        await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS "violationCount" integer DEFAULT 0;`;
        await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS "isBlocked" boolean DEFAULT false;`;
        await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS "blockedUntil" timestamp;`;
        await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS "blockCount" integer DEFAULT 0;`;
        console.log("Users table check complete.");

    } catch (error) {
        console.error("Error updating database:", error);
    }
}

main();
