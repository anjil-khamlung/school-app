import type { RegisterFormErrors } from "../../type/registerType";
import type { RegisterForm } from "../../type/registerType";


export const validateRegister = (
  formData: RegisterForm,
): RegisterFormErrors => {
  const errors: RegisterFormErrors = {};

  // Name
  if (!formData.name.trim()) {
    errors.name = "Name is required";
  } else if (formData.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters";
  } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
    errors.name = "Name can only contain letters and spaces";
  }

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
 } else if (!/[A-Z]/.test(formData.password)) {
   errors.password = "Password must contain an uppercase letter";
 } else if (!/[a-z]/.test(formData.password)) {
   errors.password = "Password must contain a lowercase letter";
 } else if (!/[0-9]/.test(formData.password)) {
   errors.password = "Password must contain a number";
 } else if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]\/'`~+=;]/.test(formData.password)) {
   errors.password = "Password must contain a special character";
 }

  // Confirm password
  if (!formData.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
