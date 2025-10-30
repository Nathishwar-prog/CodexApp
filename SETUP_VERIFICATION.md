# GitHub OAuth Setup Verification Guide

## Current Status Check

The `.env.local` file was not found in `apps/client/`. Please follow these steps:

## Step 1: Create the Environment File

Create a file named `.env.local` in the `apps/client/` directory with:

```env
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET_DEV=your_client_secret
```

**Important:**

- File must be named exactly `.env.local` (not `.env` or `.env.local.txt`)
- File must be in `apps/client/` directory (not root)
- No quotes around values
- No spaces around `=`

## Step 2: Get GitHub OAuth Credentials

1. Go to: https://github.com/settings/developers
2. Click **"New OAuth App"**
3. Fill in:
   - **Application name**: `CodeX Local Dev`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/github/auth`
4. Click **"Register application"**
5. Copy the **Client ID**
6. Click **"Generate a new client secret"** and copy it

## Step 3: Verify File Was Created

After creating `.env.local`, verify it exists:

```powershell
# PowerShell command
Test-Path apps/client/.env.local
```

Should return: `True`

## Step 4: Verify Contents

```powershell
# PowerShell command (if file exists)
Get-Content apps/client/.env.local
```

Should show:

```
NEXT_PUBLIC_GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET_DEV=...
```

## Step 5: Run Verification Script

```bash
cd apps/client
node verify-github-setup.js
```

This will check if all required variables are set.

## Step 6: Restart Dev Server

**CRITICAL**: After creating/modifying `.env.local`:

1. Stop the dev server (Ctrl+C)
2. Start again: `pnpm dev`

Next.js only loads env files on startup!

## Step 7: Test in Browser

1. Open: http://localhost:3000
2. Create/join a room
3. Click **Settings** (gear icon)
4. Click **"Connect to GitHub"**
5. Should open popup → Authorize → Popup closes → Shows your username

## Troubleshooting

### File Not Found Error

- Make sure file is in `apps/client/` not root
- File name is exactly `.env.local` (check for hidden file extension)
- Check file is not in `.gitignore` blocking (this is normal)

### "GitHub OAuth not configured" Error

- Verify both variables are in `.env.local`
- Restart dev server after editing
- Check no typos in variable names
- Check no extra spaces

### "Invalid client" Error

- Verify Client ID matches GitHub exactly
- Re-copy Client ID from GitHub settings
- Check callback URL in GitHub app: `http://localhost:3000/api/github/auth`

## What's Already Configured ✅

- Constants read from environment variables
- OAuth flow handlers ready
- Callback route at `/api/github/auth`
- Error handling and validation added

## Next Steps

Once `.env.local` is created and dev server restarted:

- Test authentication flow
- Test opening files from GitHub
- Test saving/committing to GitHub
