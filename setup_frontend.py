import os

base = r"C:\Users\abuos\.gemini\antigravity\scratch\mobile-portfolio\EduStream\apps\mobile"

os.makedirs(os.path.join(base, "src/database/models"), exist_ok=True)

# 1. Watermelon schema
with open(os.path.join(base, "src/database/schema.ts"), "w") as f:
    f.write("""import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'users',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' },
      ]
    })
  ]
})
""")

# 2. Watermelon Model
with open(os.path.join(base, "src/database/models/User.ts"), "w") as f:
    f.write("""import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export class UserModel extends Model {
  static table = 'users'

  @field('name') name!: string
  @field('email') email!: string
}
""")

# 3. Watermelon Database init
with open(os.path.join(base, "src/database/index.ts"), "w") as f:
    f.write("""import { Database } from '@nozbe/watermelondb'
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
""")

# 4. tsconfig.json (strict)
with open(os.path.join(base, "tsconfig.json"), "w") as f:
    f.write("""{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "lib": ["esnext"],
    "allowJs": true,
    "jsx": "react-native",
    "noEmit": true,
    "isolatedModules": true,
    "strict": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "experimentalDecorators": true,
    "resolveJsonModule": true
  },
  "exclude": [
    "node_modules", "babel.config.js", "metro.config.js", "jest.config.js"
  ]
}
""")

# 5. update package.json with dependencies
with open(os.path.join(base, "package.json"), "w") as f:
    f.write("""{
  "name": "@edustream/mobile",
  "version": "1.0.0",
  "scripts": {
    "start": "expo start"
  },
  "dependencies": {
    "@nozbe/watermelondb": "^0.27.1",
    "react": "18.2.0",
    "react-native": "0.72.6"
  },
  "devDependencies": {
    "@babel/plugin-proposal-decorators": "^7.23.3",
    "@types/react": "~18.2.14",
    "typescript": "^5.1.3"
  }
}
""")
