# Testing GitHub OAuth Integration Locally

## Step 1: Create a GitHub OAuth App

1. Go to GitHub: https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: `CodeX Local Dev` (or any name)
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/github/auth`
4. Click "Register application"
5. **Copy your Client ID** (you'll see it on the next page)
6. Click "Generate a new client secret" and **copy the secret**

## Step 2: Set Environment Variables

Create or edit `.env.local` file in `apps/client/` directory:

```env
# GitHub OAuth (required)
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here

# Optional: If you want to use different secrets for dev/prod
# The code will use GITHUB_CLIENT_SECRET if NEXT_PUBLIC_GITHUB_CLIENT_ID is set,
# otherwise it falls back to GITHUB_CLIENT_SECRET_DEV or GITHUB_CLIENT_SECRET_PROD
```

**Important**: The file must be named `.env.local` (not `.env`) in `apps/client/` directory.

## Step 3: Restart Your Dev Server

After adding environment variables, **restart your Next.js dev server**:

```bash
# Stop the current server (Ctrl+C)
# Then restart
pnpm dev
```

## Step 4: Test the OAuth Flow

### Test 1: Check Authentication Status

1. Open your app: http://localhost:3000
2. Create or join a room
3. Click the **Settings button** (gear icon) in the toolbar
4. Check if you see your GitHub username/avatar (means you're authenticated)
   - OR you'll see "Connect to GitHub" button (means you're not authenticated)

### Test 2: Login Flow

1. Click **"Connect to GitHub"** button (in Settings, or in Open/Save dialogs)
2. A popup window should open with GitHub authorization page
3. Click **"Authorize"** on GitHub
4. Popup should automatically close
5. You should see your GitHub username/avatar appear

### Test 3: Open File from GitHub

1. Click **File → Open from GitHub** (or toolbar icon)
2. You should see your repositories listed (not the login screen)
3. Browse your repos, select a file
4. Click "Open File"
5. File content should load in the editor

### Test 4: Save File to GitHub

1. Write some code in the editor
2. Click **File → Save to GitHub** (or toolbar icon)
3. You should see your repositories (not login screen)
4. Select a repo, branch, and file path
5. Fill in commit message
6. Click "Save"
7. Check your GitHub repo - the file should be committed

### Test 5: Logout

1. Go to Settings (gear icon)
2. Click "Disconnect from GitHub" button
3. Refresh or reopen dialogs - should show "Connect to GitHub" again

## Troubleshooting

### Issue: "Connect to GitHub" button doesn't open popup

**Check:**

- Is `NEXT_PUBLIC_GITHUB_CLIENT_ID` set in `.env.local`?
- Did you restart the dev server after adding env vars?
- Open browser console (F12) - any errors?

### Issue: Popup opens but shows "Invalid client ID"

**Fix:**

- Double-check your `NEXT_PUBLIC_GITHUB_CLIENT_ID` matches GitHub OAuth app
- Make sure there are no extra spaces in `.env.local`

### Issue: Authorization succeeds but popup doesn't close

**Check:**

- Browser console for errors
- Ensure popup blockers are disabled
- Check that `/oauth/github` page loads correctly

### Issue: "Authentication required" when trying to save/commit

**Check:**

- Is `GITHUB_CLIENT_SECRET` set correctly in `.env.local`?
- Check browser cookies - should have `access_token` cookie
- Try logging out and logging in again

### Issue: Can see repos but commit fails

**Check:**

- Make sure you have write access to the repository
- Check browser console for API errors
- Verify the branch exists

## Quick Test Command

To quickly verify your env vars are loaded:

```bash
# In apps/client directory
node -e "require('dotenv').config({path: '.env.local'}); console.log('Client ID:', process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ? 'SET' : 'MISSING');"
```

## Expected Behavior Summary

✅ **When NOT authenticated:**

- Settings shows "Connect to GitHub" button
- Open/Save dialogs show "Connect to GitHub" prompt

✅ **When authenticated:**

- Settings shows your GitHub username and avatar
- Open/Save dialogs show repository browser
- Commits work (if you have repo write access)

✅ **OAuth Flow:**

- Click "Connect" → Popup opens → Authorize on GitHub → Popup closes → You're logged in
