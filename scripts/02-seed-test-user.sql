-- Seed test user for development/testing
-- Password: TestPassword123 (hashed with bcrypt)
INSERT INTO users (email, password_hash, name, created_at, updated_at)
VALUES (
  'test@verimyst.com',
  '$2b$10$YourHashedPasswordHere', -- This will be replaced by the Node script
  'Test User',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;
