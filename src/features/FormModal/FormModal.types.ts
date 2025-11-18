export interface FormModalProps {
  className?: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  companyName: string;
  workEmail: string;
  message: string;
  files: File[];
  agreeToPrivacyPolicy: boolean;
}

export interface ContactFormErrors {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  workEmail?: string;
  message?: string;
  files?: string;
  agreeToPrivacyPolicy?: string;
}

export interface FormSubmissionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}
