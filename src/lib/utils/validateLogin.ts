interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
}

export const validateLogin = (formData: LoginFormData): LoginFormErrors => {
  const errors: LoginFormErrors = {};

  // Email
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Enter a valid email address";
  }

  // Password
  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
};
