import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import type { OAuth2Client } from 'google-auth-library';

export async function GET() {
  try {
    // Parse the service account credentials from environment variable
    const credentials = JSON.parse(
      process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}'
    );

    // Create auth client
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: [
        'https://www.googleapis.com/auth/forms.responses.readonly',
        'https://www.googleapis.com/auth/forms.body.readonly',
      ],
    });

    const authClient = await auth.getClient();

    // Create Forms API client
    const forms = google.forms({
      version: 'v1',
      auth: authClient as OAuth2Client,
    });

    const formId = process.env.GOOGLE_FORMS_ID;

    if (!formId) {
      return NextResponse.json(
        { error: 'Form ID not configured' },
        { status: 500 }
      );
    }

    try {
      // Get form metadata
      const formData = await forms.forms.get({
        formId,
      });

      // Get form responses
      const responses = await forms.forms.responses.list({
        formId,
      });

      // Transform the data into a more usable format
      const formattedResponses =
        responses.data.responses?.map((response) => {
          const answers: Record<string, string | undefined> = {};

          // Map question IDs to their titles
          const questionMap: Record<string, string> = {};
          formData.data.items?.forEach((item) => {
            if (item.questionItem) {
              const questionId = item.questionItem.question?.questionId;
              const title = item.title || 'Untitled';
              if (questionId) {
                questionMap[questionId] = title;
              }
            }
          });

          // Extract answers
          if (response.answers) {
            Object.entries(response.answers).forEach(([questionId, answer]) => {
              const questionTitle = questionMap[questionId] || questionId;
              // Extract text value from answer
              if (answer.textAnswers?.answers?.[0]?.value) {
                answers[questionTitle] = answer.textAnswers.answers[0].value;
              }
            });
          }

          return {
            responseId: response.responseId,
            createTime: response.createTime,
            lastSubmittedTime: response.lastSubmittedTime,
            answers,
          };
        }) || [];

      return NextResponse.json({
        form: {
          formId: formData.data.formId,
          title: formData.data.info?.title,
          documentTitle: formData.data.info?.documentTitle,
        },
        responses: formattedResponses,
        totalResponses: formattedResponses.length,
      });
    } catch (apiError) {
      console.error('Google Forms API Error:', apiError);

      // Check if it's a permission error
      const error = apiError as { code?: number; message?: string };
      if (error.code === 403) {
        return NextResponse.json(
          {
            error:
              'Permission denied. Please ensure the form is shared with the service account email: forms-api-service@links-form-472123.iam.gserviceaccount.com',
            details: error.message,
          },
          { status: 403 }
        );
      }

      return NextResponse.json(
        {
          error: 'Failed to fetch form responses',
          details: error.message || 'Unknown error',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
