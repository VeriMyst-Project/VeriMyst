import { neon } from "@neondatabase/serverless"
import crypto from "crypto"

const sql = neon(process.env.NEON_NEON_DATABASE_URL)

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex")
}

async function setupDatabase() {
  try {
    console.log("🔧 Setting up VeriMyst database...")

    console.log("📋 Creating database schema...")

    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(255),
        role VARCHAR(50) DEFAULT 'user',
        organization VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      )
    `

    // Create scans table
    await sql`
      CREATE TABLE IF NOT EXISTS scans (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        content_type VARCHAR(50) NOT NULL,
        content_hash VARCHAR(255) UNIQUE,
        trust_score DECIMAL(3, 2),
        risk_level VARCHAR(50),
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completed_at TIMESTAMP
      )
    `

    // Create scan_results table
    await sql`
      CREATE TABLE IF NOT EXISTS scan_results (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        scan_id UUID NOT NULL REFERENCES scans(id) ON DELETE CASCADE,
        detection_type VARCHAR(100),
        confidence DECIMAL(3, 2),
        evidence TEXT,
        sources TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create uploads table
    await sql`
      CREATE TABLE IF NOT EXISTS uploads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        scan_id UUID REFERENCES scans(id) ON DELETE CASCADE,
        file_name VARCHAR(255),
        file_size INTEGER,
        file_type VARCHAR(50),
        storage_path VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create feedback table
    await sql`
      CREATE TABLE IF NOT EXISTS feedback (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        scan_id UUID NOT NULL REFERENCES scans(id) ON DELETE CASCADE,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        feedback_type VARCHAR(50),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create provenance table
    await sql`
      CREATE TABLE IF NOT EXISTS provenance (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        scan_id UUID NOT NULL REFERENCES scans(id) ON DELETE CASCADE,
        source_url VARCHAR(500),
        first_seen TIMESTAMP,
        last_seen TIMESTAMP,
        spread_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create analytics table
    await sql`
      CREATE TABLE IF NOT EXISTS analytics (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        event_type VARCHAR(100),
        event_data JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_scans_user_id ON scans(user_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_scans_created_at ON scans(created_at)`
    await sql`CREATE INDEX IF NOT EXISTS idx_scans_status ON scans(status)`
    await sql`CREATE INDEX IF NOT EXISTS idx_scan_results_scan_id ON scan_results(scan_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_uploads_user_id ON uploads(user_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_feedback_scan_id ON feedback(scan_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_provenance_scan_id ON provenance(scan_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON analytics(user_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at)`

    console.log("✅ Database schema created successfully")

    // Seed test user
    console.log("👤 Seeding test user...")
    const testEmail = "test@verimyst.com"
    const testPassword = "TestPassword123"
    const passwordHash = hashPassword(testPassword)

    try {
      await sql`
        INSERT INTO users (email, password_hash, full_name, role)
        VALUES (${testEmail}, ${passwordHash}, 'Test User', 'user')
        ON CONFLICT (email) DO NOTHING
      `
      console.log("✅ Test user created/verified")
      console.log(`📧 Email: ${testEmail}`)
      console.log(`🔐 Password: ${testPassword}`)
    } catch (err) {
      console.log("ℹ️  Test user already exists")
    }

    console.log("\n✨ Database setup complete!")
    console.log("You can now log in with the test credentials above.")
    process.exit(0)
  } catch (error) {
    console.error("❌ Database setup failed:", error.message)
    process.exit(1)
  }
}

setupDatabase()
