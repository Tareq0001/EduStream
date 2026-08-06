import os

base = r"C:\Users\abuos\.gemini\antigravity\scratch\mobile-portfolio\EduStream\apps\api"

# DDD structure
dirs = [
    "src/domain/entities",
    "src/domain/repositories",
    "src/application/use-cases",
    "src/infrastructure/repositories",
    "src/infrastructure/database",
    "src/infrastructure/cache",
    "src/presentation/controllers",
    "src/presentation/routes",
]

for d in dirs:
    os.makedirs(os.path.join(base, d), exist_ok=True)

# 1. Domain Entity
with open(os.path.join(base, "src/domain/entities/User.ts"), "w") as f:
    f.write("""export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string
  ) {}
}
""")

# 2. Domain Repository Interface
with open(os.path.join(base, "src/domain/repositories/IUserRepository.ts"), "w") as f:
    f.write("""import { User } from '../entities/User';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
""")

# 3. Infrastructure Cache (Redis)
with open(os.path.join(base, "src/infrastructure/cache/RedisCache.ts"), "w") as f:
    f.write("""import { createClient } from 'redis';

export class RedisCache {
  private client;

  constructor() {
    this.client = createClient();
    this.client.connect().catch(console.error);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }
}
""")

# 4. Infrastructure Repository (Prisma or Mock)
with open(os.path.join(base, "src/infrastructure/repositories/UserRepository.ts"), "w") as f:
    f.write("""import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { injectable, inject } from 'tsyringe';
import { RedisCache } from '../cache/RedisCache';

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject(RedisCache) private cache: RedisCache) {}

  async findById(id: string): Promise<User | null> {
    const cached = await this.cache.get(`user:${id}`);
    if (cached) {
      const data = JSON.parse(cached);
      return new User(data.id, data.name, data.email);
    }
    // mock DB call
    return null;
  }

  async save(user: User): Promise<void> {
    await this.cache.set(`user:${user.id}`, JSON.stringify(user));
  }
}
""")

# 5. Use Case
with open(os.path.join(base, "src/application/use-cases/GetUser.ts"), "w") as f:
    f.write("""import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { injectable, inject } from 'tsyringe';

@injectable()
export class GetUserUseCase {
  constructor(@inject('IUserRepository') private userRepository: IUserRepository) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
""")

# 6. tsconfig.json (strict: true)
with open(os.path.join(base, "tsconfig.json"), "w") as f:
    f.write("""{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
""")

# 7. package.json update
with open(os.path.join(base, "package.json"), "w") as f:
    f.write("""{
  "name": "@edustream/api",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc"
  },
  "dependencies": {
    "express": "^4.18.2",
    "redis": "^4.6.7",
    "tsyringe": "^4.8.0",
    "reflect-metadata": "^0.1.13"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
""")
