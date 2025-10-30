import bcrypt from "bcryptjs"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_DATABASE_URL)

async function seedTestUser() {
  try {
    const password = "TestPassword123"
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await sql`
      INSERT INTO users (email, password_hash, full_name, created_at, updated_at)
      VALUES (
        'test@verimyst.com',
        ${hashedPassword},
        'Test User',
        NOW(),
        NOW()
      )
      ON CONFLICT (email) DO NOTHING
      RETURNING id, email, full_name;
    `

    if (result.length > 0) {
      console.log("[v0] Test user created successfully:")
      console.log("[v0] Email:", result[0].email)
      console.log("[v0] Password: TestPassword123")
      console.log("[v0] User ID:", result[0].id)
    } else {
      console.log("[v0] Test user already exists")
    }
  } catch (error) {
    console.error("[v0] Error seeding test user:", error)
    process.exit(1)
  }
}

seedTestUser()
