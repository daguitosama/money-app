## Database Migrations

We need to make the hyperdrive-user able to commit changes to the schema on the db

```sql
-- Replace '"hyperdrive-user"' with your actual role name from the DATABASE_URL secret
GRANT ALL ON SCHEMA public TO "hyperdrive-user";
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "hyperdrive-user";
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO "hyperdrive-user";
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO "hyperdrive-user";
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO "hyperdrive-user";
```
