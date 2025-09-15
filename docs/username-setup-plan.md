# Username Setup Plan

## Current Status

- Username stored in `auth.users.raw_user_meta_data->>'display_name'`
- Projects table cleaned up (no username column)
- Created `projects_with_username` view for easy querying

## Where Users Can Set Username

### Option 1: Settings Page (Recommended)

Add a "Username" form to the existing settings page:

**Location**: `src/app/(app)/settings/page.tsx`

**Form Fields**:

- Current Username: `srwlli` (read-only display)
- New Username: `[text input]`
- Save Button

**API Endpoint**: `POST /api/user/update-username`

### Option 2: Signup Flow

Add username field to registration:

**Location**: `src/components/auth/login-form.tsx`

- Add username field to signup form
- Save to display_name during user creation

### Option 3: Profile Setup

Create dedicated profile setup page:

**Location**: `src/app/(app)/profile/setup/page.tsx`

- Redirect new users here after first login
- Required username setup before accessing app

## Implementation Priority

1. **Settings Page Form** (easiest to add)
2. **API Endpoint** for updating display_name
3. **Username Validation** (3-20 chars, alphanumeric + underscore/dash)
4. **Signup Form Enhancement** (optional)

## Next Steps

1. Execute `setup-display-name.sql` to clean up database
2. Add username form to settings page
3. Create API endpoint for username updates
4. Test the full flow

## Display Format

Projects will show as: **"My Sports Rank by srwlli"**

Query: `SELECT * FROM projects_with_username WHERE user_id = auth.uid()`
