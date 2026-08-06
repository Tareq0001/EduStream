import os
import shutil

root = r"C:\Users\abuos\.gemini\antigravity\scratch\mobile-portfolio\EduStream"

dirs_to_create = [
    "apps/mobile",
    "apps/api",
    "packages/shared"
]

for d in dirs_to_create:
    os.makedirs(os.path.join(root, d), exist_ok=True)

# move backend to apps/api
# Wait, it's better to move contents of backend to apps/api
backend_dir = os.path.join(root, "backend")
if os.path.exists(backend_dir):
    for item in os.listdir(backend_dir):
        shutil.move(os.path.join(backend_dir, item), os.path.join(root, "apps", "api", item))
    os.rmdir(backend_dir)

# move mobile stuff to apps/mobile
mobile_items = ["App.js", "app.json", "src", "package.json", "package-lock.json", "babel.config.js", "tsconfig.json", "node_modules"]
for item in mobile_items:
    path = os.path.join(root, item)
    if os.path.exists(path):
        shutil.move(path, os.path.join(root, "apps", "mobile", item))

# Create root package.json for monorepo
root_pkg = """{
  "name": "edustream-monorepo",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}"""

with open(os.path.join(root, "package.json"), "w") as f:
    f.write(root_pkg)

print("Restructured successfully")
