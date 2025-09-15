# Google Forms Integration

This project features a real-time integration with Google Forms that automatically displays form submissions on the `/links` page.

## 🚀 Features

- **Real-time Data**: Form submissions appear automatically
- **Search & Filter**: Find submissions by title, project, or description
- **Auto-refresh**: Updates every 10 minutes, plus manual refresh button
- **Responsive Design**: Works on mobile and desktop
- **Professional UI**: Card layout with project tags and timestamps
- **Error Handling**: Clear error messages and retry functionality

## 🏗️ Architecture

```
Google Form → Google Forms API → Next.js API Route → React Query → UI Components
```

### Components

1. **Google Form**: https://docs.google.com/forms/d/1hJHIOV5GbWHSESmSO8xepOcG7gi-R4IUfz7OJSiuLaU/edit
2. **API Route**: `/src/app/api/form-responses/route.ts`
3. **React Hook**: `/src/hooks/useFormResponses.ts`
4. **UI Component**: `/src/components/forms/FormSubmissionsDisplay.tsx`
5. **Page Integration**: `/src/app/(app)/links/page.tsx`

## 📁 File Structure

```
src/
├── app/
│   ├── api/
│   │   └── form-responses/
│   │       └── route.ts              # Google Forms API endpoint
│   └── (app)/
│       └── links/
│           └── page.tsx              # Links page with form display
├── components/
│   └── forms/
│       └── FormSubmissionsDisplay.tsx # Main display component
├── hooks/
│   └── useFormResponses.ts           # React Query hook
├── providers/
│   └── QueryProvider.tsx            # React Query setup
├── types/
│   └── form-response.ts              # TypeScript definitions
└── app/
    └── layout.tsx                    # Root layout with providers
```

## 🔧 Setup Process

### 1. Google Cloud Console

- Created project: `links-form-472123`
- Enabled Google Forms API
- Created service account: `forms-api-service@links-form-472123.iam.gserviceaccount.com`
- Generated JSON credentials

### 2. Environment Configuration

```bash
# .env.local
GOOGLE_FORMS_ID=1hJHIOV5GbWHSESmSO8xepOcG7gi-R4IUfz7OJSiuLaU
GOOGLE_SERVICE_ACCOUNT_KEY='{...service account JSON...}'
```

### 3. Form Permissions

- Shared Google Form with service account email as Editor
- Enables API to read form structure and responses

### 4. Dependencies Added

```bash
npm install googleapis @tanstack/react-query
```

## 🛠️ How It Works

### Data Flow

1. **Form Submission**: User fills out Google Form
2. **API Call**: App calls `/api/form-responses`
3. **Google API**: Fetches form metadata and responses
4. **Data Transform**: Maps question IDs to readable field names
5. **React Query**: Caches data and manages loading states
6. **UI Update**: Displays submissions as responsive cards

### API Response Format

```typescript
{
  form: {
    formId: string;
    title: string;
    documentTitle: string;
  }
  responses: Array<{
    responseId: string;
    createTime: string;
    lastSubmittedTime: string;
    answers: {
      title?: string;
      project?: string;
      'sub categorization'?: string;
      description?: string;
      link?: string;
    };
  }>;
  totalResponses: number;
}
```

### Caching Strategy

- **Stale Time**: 5 minutes (data considered fresh)
- **Refetch Interval**: 10 minutes (automatic background updates)
- **Retry Logic**: 3 attempts with exponential backoff
- **Manual Refresh**: Instant updates on user request

## 🎨 UI Features

### Search & Filter

- Real-time text search across title, project, description
- Case-insensitive matching
- Instant results without API calls

### Card Layout

- **Title**: Prominent display of submission title
- **Project Tags**: Color-coded project and subcategory badges
- **Description**: Full description text
- **Timestamp**: When the form was submitted
- **Links**: Clickable external links (when provided)

### Loading States

- **Skeleton Loaders**: During initial load
- **Refresh Indicators**: Spinning icon during updates
- **Error States**: Clear error messages with retry options

## 🔒 Security

- **Environment Variables**: Sensitive credentials stored in `.env.local`
- **Git Ignore**: `.env*` files excluded from version control
- **Service Account**: Limited permissions (forms access only)
- **API Scopes**: Minimal required permissions
  - `https://www.googleapis.com/auth/forms.responses.readonly`
  - `https://www.googleapis.com/auth/forms.body.readonly`

## 📊 Form Fields

The Google Form collects:

- **Title**: Project/submission title
- **Project**: Project category/name
- **Sub Categorization**: Additional categorization
- **Description**: Detailed description
- **Link**: Optional URL/link

## 🚀 Usage

1. **View Submissions**: Navigate to `/links` page
2. **Search**: Use search bar to filter submissions
3. **Refresh**: Click refresh button for latest data
4. **Submit New**: Click "Open Form in New Tab" to add submissions

## 📈 Performance

- **Initial Load**: ~1-2 seconds (depending on submission count)
- **Background Updates**: Seamless, no UI blocking
- **Search**: Instant client-side filtering
- **Caching**: Reduces API calls and improves response time

## 🔧 Troubleshooting

### Common Issues

1. **"Permission denied"**: Ensure form is shared with service account
2. **"API not enabled"**: Enable Google Forms API in Cloud Console
3. **"Entity not found"**: Verify correct Form ID in environment
4. **"Invalid credentials"**: Check service account JSON format

### Debug Steps

1. Check browser console for error messages
2. Verify API endpoint: `http://localhost:3003/api/form-responses`
3. Confirm environment variables are loaded
4. Test form permissions with service account email

## 🎯 Future Enhancements

Potential improvements:

- **Real-time Updates**: WebSocket or Server-Sent Events for instant updates
- **Export Functionality**: Download submissions as CSV/JSON
- **Analytics Dashboard**: Submission trends and statistics
- **Form Management**: Edit form fields through the app
- **Bulk Operations**: Select and manage multiple submissions
- **Webhooks**: Push notifications for new submissions
