export interface FormResponse {
  responseId: string;
  createTime: string;
  lastSubmittedTime: string;
  answers: {
    title?: string;
    project?: string;
    'sub categorization'?: string;
    description?: string;
    link?: string;
    [key: string]: string | undefined;
  };
}

export interface FormData {
  formId: string;
  title?: string;
  documentTitle?: string;
}

export interface FormResponsesData {
  form: FormData;
  responses: FormResponse[];
  totalResponses: number;
}

export interface FormSubmission {
  id: string;
  timestamp: string;
  title: string;
  project: string;
  subCategory: string;
  description: string;
  link?: string;
}
