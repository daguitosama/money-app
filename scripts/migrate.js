// migrate.js
import fs from "fs/promises";
import path from "path";
import postgres from "postgres";

async function runMigrations() {
    const connectionString = process.env.DATABASE_URL; // ← from env (local or CI)
    if (!connectionString) throw new Error("DATABASE_URL required");

    const sql = postgres(connectionString, { max: 1, onnotice: false }); // single conn for migrations
    sql.onnotice = false;
    try {
        // Create tracking table if missing
        await sql`
        CREATE TABLE IF NOT EXISTS schema_migrations (
            version BIGINT PRIMARY KEY,
            applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
        `;

        // Get migration files (sorted by version)
        const migrationsDir = path.join(process.cwd(), "migrations");
        // console.log({ migrationsDir });
        const files = (await fs.readdir(migrationsDir)).filter((f) => f.endsWith(".sql") && /^\d+_.+\.sql$/.test(f)).sort();

        for (const file of files) {
            const version = parseInt(file.split("_")[0], 10);
            const applied = await sql`SELECT version FROM schema_migrations WHERE version = ${version}`;
            if (applied.length > 0) continue; // already done

            const sqlContent = await fs.readFile(path.join(migrationsDir, file), "utf-8");
            await sql.unsafe(sqlContent); // run the SQL

            await sql`INSERT INTO schema_migrations (version) VALUES (${version})`;
            console.log(`Applied migration ${file}`);
        }

        console.log("All migrations up to date");
    } finally {
        await sql.end();
    }
}

runMigrations().catch((err) => {
    console.error(err);
    process.exit(1);
});
