// app/middleware/db.ts   ← create this file
import postgres from 'postgres'
import type { MiddlewareFunction } from 'react-router'

export const dbMiddleware: MiddlewareFunction = async ({ request, context }, next) => {
  // We only create db once per request (very important in Workers!)
  const connectionString = context.cloudflare?.env?.HYPERDRIVE?.connectionString
    ?? process.env.LOCAL_DATABASE_URL
    ?? 'postgres://postgres:postgres@localhost:5432/yourdb'

  const sql = postgres(connectionString, {
    max: 5,              // keep low in Workers
    fetch_types: false,
    // idle_timeout: 5   // optional but recommended
  })

  try {
    // Put in the new context system
    context.set('db', sql)

    // Optional: test connection (good for dev