export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export function validateContactForm(payload: Partial<ContactPayload>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!payload.name || payload.name.trim().length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!payload.email || !emailRegex.test(payload.email.trim())) {
    errors.email = "Please provide a valid email address.";
  }

  if (!payload.message || payload.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters long.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
