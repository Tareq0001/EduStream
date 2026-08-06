import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import { mySchema } from './schema'
import { UserModel } from './models/User'

const adapter = new SQLiteAdapter({
  schema: mySchema,
  jsi: true,
  onSetUpError: error => {
    console.error("Database setup failed", error)
  }
})

export const database = new Database({
  adapter,
  modelClasses: [
    UserModel,
  ],
})
