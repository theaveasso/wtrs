import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { config } from '../env'

const client = createClient({ url: config.env.DATABASE_URL, authToken: config.env.DATABASE_AUTH_TOKEN })

export const db = drizzle(client)

