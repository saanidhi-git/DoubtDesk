import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.NEXT_PUBLIC_NEON_DB_CONNECTION_STRING!);

async function main() {
    try {
        console.log("Listing columns for 'doubts' table...");
        const columns = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'doubts';
        `;
        console.log("Columns in 'doubts':", JSON.stringify(columns, null, 2));

        console.log("\nListing all tables...");
        const tables = await sql`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public';
        `;
        console.log("Tables:", JSON.stringify(tables, null, 2));

    } catch (error) {
        console.error("Error inspecting database:", error);
    }
}

main();
