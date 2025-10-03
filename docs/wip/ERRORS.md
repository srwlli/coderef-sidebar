**⚠️ OBSOLETE** - Forms module has been removed from the application

---

## Error Type

Console Error

## Error Message

Project create error: {}

    at handleSubmit (src/components/forms/ProjectForm.tsx:121:15)
    at async handleFormSubmit (src/components/forms/FormGenerator.tsx:228:7)

## Code Frame

119 | }
120 | } catch (error: unknown) {

> 121 | console.error(`Project ${mode} error:`, error);

      |               ^

122 |
123 | // Enhanced error logging
124 | if (error && typeof error === 'object') {

Next.js version: 15.5.2 (Turbopack)

## Error Type

Console Error

## Error Message

Detailed error: "{\n \"code\": \"PGRST204\",\n \"details\": null,\n \"hint\": null,\n \"message\": \"Could not find the 'links' column of 'projects' in the schema cache\"\n}"

    at handleSubmit (src/components/forms/ProjectForm.tsx:125:17)
    at async handleFormSubmit (src/components/forms/FormGenerator.tsx:228:7)

## Code Frame

123 | // Enhanced error logging
124 | if (error && typeof error === 'object') {

> 125 | console.error('Detailed error:', JSON.stringify(error, null, 2));

      |                 ^

126 | }
127 |
128 | // Better error message extraction

Next.js version: 15.5.2 (Turbopack)

## Error Type

Console Error

## Error Message

Form submission error: {}

    at handleFormSubmit (src/components/forms/FormGenerator.tsx:230:15)

## Code Frame

228 | await onSubmit(supabaseData as T);
229 | } catch (error) {

> 230 | console.error('Form submission error:', error);

      |               ^

231 | throw error;
232 | }
233 | };

Next.js version: 15.5.2 (Turbopack)
Call Stack
2

Hide 2 ignore-listed frame(s)
coerceError
node_modules/next/src/next-devtools/userspace/app/errors/stitched-error.ts (14:35)
onUnhandledRejection
node_modules/next/src/next-devtools/userspace/app/errors/use-error-handler.ts (116:28)
