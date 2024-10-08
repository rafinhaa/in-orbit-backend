import { migrate } from "drizzle-orm/postgres-js/migrator"
import { db, client } from "./"
import { dirname } from "node:path"

const filename = require?.main?.filename ?? null

if (!filename) throw new Error("filename not found!")

const appDir = dirname(filename)

if (!appDir) throw new Error("AppDir not found!")

const main = async () => {
  console.log("Database: Migrating...")

  await migrate(db, { migrationsFolder: `${appDir}/../../.migrations` })
  await client.end()

  console.log("Database: Migrated successfully!")
}

main()
