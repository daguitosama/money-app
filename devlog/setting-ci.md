## Database Migrations

We need to make the hyperdrive-user able to commit changes to the schema on the db

```sql

GRANT CREATE, USAGE ON SCHEMA public TO "hyperdrive-user";   -- ← replace with your actual role name
-- OR if you want it forever:
ALTER ROLE "hyperdrive-user" IN DATABASE "money" SET search_path = public;
GRANT CREATE ON SCHEMA public TO "hyperdrive-user";
```
