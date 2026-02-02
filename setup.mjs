import { execSync } from "child_process";
import fs from "fs";

function run(command, cwd = process.cwd()) {
  execSync(command, { stdio: "inherit", cwd });
}

console.log("\n🚀 Setting up Pokedex...\n");

console.log("📦 Installing root dependencies...");
run("npm install");

console.log("📦 Installing backend dependencies...");
run("npm install", "./backend");

console.log("📦 Installing frontend dependencies...");
run("npm install", "./frontend");

console.log("📝 Creating backend .env if not exists...");

const envPath = "./backend/.env";

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(
    envPath,
    `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pokedex"
PORT=3000`,
  );
  console.log("✅ .env created");
} else {
  console.log("ℹ️ .env already exists");
}

console.log("🗄 Running Prisma migrations...");
run("npx prisma migrate dev --name init", "./backend");

console.log("\n✅ Setup complete!");
console.log("\nRun the project with:");
console.log("npm run dev\n");
