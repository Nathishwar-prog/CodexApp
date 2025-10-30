/**
 * Quick verification script for GitHub OAuth setup
 * Run: node verify-github-setup.mjs
 */

import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const required = {
  NEXT_PUBLIC_GITHUB_CLIENT_ID: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET:
    process.env.GITHUB_CLIENT_SECRET || process.env.GITHUB_CLIENT_SECRET_DEV,
};

console.log('\n🔍 Checking GitHub OAuth Configuration...\n');

let allGood = true;

for (const [key, value] of Object.entries(required)) {
  if (value && value.trim()) {
    const display = key.includes('SECRET')
      ? value.substring(0, 8) + '...' + value.substring(value.length - 4)
      : value;
    console.log(`✅ ${key}: ${display}`);
  } else {
    console.log(`❌ ${key}: MISSING`);
    allGood = false;
  }
}

// Check callback URL format
const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
if (clientId) {
  console.log(`\n📋 Expected GitHub OAuth App Settings:`);
  console.log(
    `   - Authorization callback URL: http://localhost:3000/api/github/auth`,
  );
  console.log(`   - Homepage URL: http://localhost:3000`);
  console.log(`   - Client ID: ${clientId}`);
}

if (allGood) {
  console.log(`\n✅ All required environment variables are set!`);
  console.log(`\n💡 Next steps:`);
  console.log(
    `   1. Make sure your GitHub OAuth App has callback: http://localhost:3000/api/github/auth`,
  );
  console.log(`   2. Restart your dev server: pnpm dev`);
  console.log(`   3. Test by clicking "Connect to GitHub" in Settings`);
} else {
  console.log(
    `\n❌ Missing required variables. Please add them to apps/client/.env.local`,
  );
  process.exit(1);
}
