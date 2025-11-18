import {createEvent, createStore, createEffect, sample, combine} from 'effector';

import type {ContactFormData, ContactFormErrors, FormSubmissionState} from '../FormModal.types';

// Events
export const openModal = createEvent<void>();
export const closeModal = createEvent<void>();
export const updateFormField = createEvent<{
  field: keyof ContactFormData;
  value: string | boolean | File[];
}>();
export const addFiles = createEvent<File[]>();
export const removeFile = createEvent<number>();
export const submitForm = createEvent<void>();
export const resetForm = createEvent<void>();

// Internal pipeline events
const validate = createEvent<ContactFormData>();
const validated = createEvent<{data: ContactFormData; errors: ContactFormErrors}>();

// Effects
export const submitFormFx = createEffect<ContactFormData, {ok: true}, Error>(async (formData) => {
  const formDataToSend = new FormData();

  for (const [key, value] of Object.entries(formData)) {
    if (key === 'files') {
      for (const file of value as File[]) formDataToSend.append('files', file);
    } else if (typeof value === 'boolean') {
      formDataToSend.append(key, String(value));
    } else {
      formDataToSend.append(key, value as string);
    }
  }

  let response: Response;
  try {
    response = await fetch('/api/contact', {method: 'POST', body: formDataToSend});
  } catch {
    throw new Error('Network error. Please try again.');
  }

  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData?.error || `Failed to submit form (${response.status})`);
    } catch {
      throw new Error(`Failed to submit form (${response.status})`);
    }
  }

  return {ok: true};
});

// Close with delay after success
const closeModalDelayedFx = createEffect<void, void>(async () => {
  await new Promise((r) => setTimeout(r, 3000));
});

// Stores
export const $isModalOpen = createStore(false)
  .on(openModal, () => true)
  .on(closeModal, () => false);

export const $formData = createStore<ContactFormData>({
  firstName: '',
  lastName: '',
  companyName: '',
  workEmail: '',
  message: '',
  files: [],
  agreeToPrivacyPolicy: false,
})
  .on(updateFormField, (state, {field, value}) => ({
    ...state,
    [field]: value,
  }))
  .on(addFiles, (state, files) => ({
    ...state,
    files: [...state.files, ...files].slice(0, 3), // максимум 3 файла
  }))
  .on(removeFile, (state, index) => ({
    ...state,
    files: state.files.filter((_, i) => i !== index),
  }))
  .on(resetForm, () => ({
    firstName: '',
    lastName: '',
    companyName: '',
    workEmail: '',
    message: '',
    files: [],
    agreeToPrivacyPolicy: false,
  }));

export const $formErrors = createStore<ContactFormErrors>({})
  .on(updateFormField, (state, {field}) => ({
    ...state,
    [field]: undefined,
  }))
  .on(addFiles, (state) => ({
    ...state,
    files: undefined,
  }))
  .on(removeFile, (state) => ({
    ...state,
    files: undefined,
  }))
  .on(validated, (_, {errors}) => errors)
  .on(resetForm, () => ({}));

export const $submissionState = createStore<FormSubmissionState>({
  isSubmitting: false,
  isSuccess: false,
  error: null,
})
  .on(submitFormFx, (state) => ({
    ...state,
    isSuccess: false,
    error: null,
  }))
  .on(submitFormFx.pending, (state, p) => ({
    ...state,
    isSubmitting: p,
  }))
  .on(submitFormFx.done, (state) => ({
    ...state,
    isSuccess: true,
    error: null,
  }))
  .on(submitFormFx.failData, (state, error) => ({
    ...state,
    isSuccess: false,
    error: error?.message ?? 'Unknown error',
  }));
// .on(resetForm, () => ({
//   isSubmitting: false,
//   isSuccess: false,
//   error: null,
// }));

// Derived
export const $hasErrors = $formErrors.map((e) => Object.values(e).some(Boolean));
export const $canSubmit = combine(
  $hasErrors,
  $submissionState,
  (hasErrors, s) => !hasErrors && !s.isSubmitting,
);

// Validation pipeline
sample({
  clock: submitForm,
  source: $formData,
  target: validate,
});

sample({
  clock: validate,
  fn: (data) => ({data, errors: validateForm(data)}),
  target: validated,
});

sample({
  clock: validated,
  source: $submissionState,
  filter: ({isSubmitting}, {errors}) => !isSubmitting && Object.values(errors).every((v) => !v),
  fn: (_, {data}) => data,
  target: submitFormFx,
});

// Success flow
sample({clock: submitFormFx.done, target: resetForm});
sample({clock: submitFormFx.done, target: closeModalDelayedFx});
sample({clock: closeModalDelayedFx.done, target: closeModal});

// If user closes after success — reset
sample({
  clock: closeModal,
  source: $submissionState,
  filter: (s) => s.isSuccess,
  target: resetForm,
});

// =====================
// Validation helpers — только required поля
// =====================
function validateForm(formData: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const isEmpty = (v: string) => !v || !v.trim();

  // REQUIRED: firstName, lastName, workEmail, agreeToPrivacyPolicy
  if (isEmpty(formData.firstName)) errors.firstName = 'ContactForm.errors.required';
  if (isEmpty(formData.lastName)) errors.lastName = 'ContactForm.errors.required';

  if (isEmpty(formData.workEmail)) {
    errors.workEmail = 'ContactForm.errors.required';
  } else if (!isValidEmail(formData.workEmail)) {
    errors.workEmail = 'ContactForm.errors.email';
  }

  if (!formData.agreeToPrivacyPolicy) {
    errors.agreeToPrivacyPolicy = 'ContactForm.errors.required';
  }

  // НЕ required: companyName, message, files
  // Валидируем файлы только если пользователь их добавил
  if (formData.files.length > 0) {
    const allowedExtensions = ['doc', 'docx', 'pdf', 'ppt', 'pptx'];
    const maxFileSize = 5 * 1024 * 1024;

    if (formData.files.length > 3) {
      errors.files = 'ContactForm.errors.maxFiles';
    } else {
      for (const file of formData.files) {
        if (file.size > maxFileSize) {
          errors.files = 'ContactForm.errors.fileSize';
          break;
        }
        const ext = file.name.split('.').pop()?.toLowerCase();
        if (!ext || !allowedExtensions.includes(ext)) {
          errors.files = 'ContactForm.errors.fileType';
          break;
        }
      }
    }
  }

  return errors;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
