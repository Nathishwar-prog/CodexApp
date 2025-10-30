# GitHub OAuth Setup Verification Checklist

## ✅ Step-by-Step Verification

### 1. Environment File Location

- [ ] File exists at: `apps/client/.env.local`
- [ ] File contains: `NEXT_PUBLIC_GITHUB_CLIENT_ID=...`
- [ ] File contains: `GITHUB_CLIENT_SECRET_DEV=...` (or `GITHUB_CLIENT_SECRET=...`)

### 2. GitHub OAuth App Settings

Go to: https://github.com/settings/developers/oauth_apps

- [ ] OAuth App exists
- [ ] **Authorization callback URL** = `http://localhost:3000/api/github/auth`
- [ ] **Homepage URL** = `http://localhost:3000`
- [ ] Client ID matches `NEXT_PUBLIC_GITHUB_CLIENT_ID` in `.env.local`
- [ ] Client Secret matches `GITHUB_CLIENT_SECRET_DEV` in `.env.local`

### 3. Code Configuration (Already Done ✅)

- [x] Constants updated to read from env vars
- [x] OAuth URL construction uses `GITHUB_CLIENT_ID`
- [x] Callback handler uses `GITHUB_CLIENT_SECRET`

### 4. Quick Test

**Before starting dev server:**

```bash
cd apps/client
node verify-github-setup.js
```

**After starting dev server:**

1. Open: http://localhost:3000
2. Create/join a room
3. Click Settings (gear icon)
4. If you see "Connect to GitHub" → Click it
5. Popup should open → Click "Authorize" on GitHub
6. Popup should close automatically
7. Settings should show your GitHub username

### 5. Expected Behavior

**When NOT authenticated:**

- Settings shows "Connect to GitHub" button
- Open/Save GitHub dialogs show login prompt

**When authenticated:**

- Settings shows GitHub username and avatar
- "Disconnect from GitHub" button visible
- Can browse repositories in Open/Save dialogs
- Can commit files to GitHub

### 6. Troubleshooting

**Problem: Button doesn't open popup**

- Check browser console (F12) for errors
- Verify `NEXT_PUBLIC_GITHUB_CLIENT_ID` is set
- Restart dev server after adding env vars

**Problem: "Invalid client" error**

- Verify Client ID in `.env.local` matches GitHub OAuth App
- Check for extra spaces/characters in env file
- Re-copy Client ID from GitHub

**Problem: Popup opens but doesn't close after auth**

- Check browser console for errors
- Verify callback URL in GitHub OAuth App matches exactly
- Check `/oauth/github` page loads (should show "Processing authentication...")

**Problem: "Authentication required" error**

- Verify `GITHUB_CLIENT_SECRET_DEV` is set correctly
- Check cookies in browser (should have `access_token`)
- Try logout and login again

## Quick Verification Commands

```bash
# Check if env file exists
Test-Path apps/client/.env.local

# Verify setup (requires dotenv package)
cd apps/client
node verify-github-setup.js

# Check environment variables are loaded (in Next.js dev server logs)
# Should see no errors about missing GITHUB_CLIENT_ID
```
