// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Enter valid email address";
  return "";
};

// Password validation
export const validatePassword = (password) => {
  if (!password) return "Password is required";

  if (password.length < 8)
    return "Password must be at least 8 characters long";

  if (!/[A-Z]/.test(password))
    return "Password must contain at least one uppercase letter";

  if (!/[a-z]/.test(password))
    return "Password must contain at least one lowercase letter";

  if (!/[0-9]/.test(password))
    return "Password must contain at least one number";

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return "Password must contain at least one special character";

  return "";
};

// Confirm password validation
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return "Confirm password is required";

  if (password !== confirmPassword)
    return "Passwords do not match";

  return "";
};

// Indian phone validation
export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phone) return "Mobile number is required";
  if (!phoneRegex.test(phone)) return "Enter valid 10 digit Indian mobile number";
  return "";
};

// Required field (generic)
export const validateRequired = (value, fieldName) => {
  const label = fieldName.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  if (value === null || value === undefined) return `${label} is required`;

  if (typeof value === "string" && !value.trim()) return `${label} is required`;

  // if value is a file object, consider it valid (or check size if needed)
  return "";
};

// Only alphabets and spaces validation
export const validateOnlyCharacters = (value, fieldName) => {
  const nameRegex = /^[A-Za-z\s]+$/;
  const label = fieldName
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  if (!value || !value.trim()) return `${label} is required`;
  if (!nameRegex.test(value)) return `${label} must contain only letters`;
  if (value.trim().length < 2) return `${label} must be at least 2 characters`;
  return "";
};

// Name typing pattern (for blocking invalid typing)
export const nameTypingPattern = /^[A-Za-z\s]*$/;

// PIN code typing pattern (for input)
export const pinTypingPattern = /^\d{0,6}$/;

// Phone typing pattern
export const numberTypingPattern = /^\d{0,10}$/;

// Indian PIN code validation
export const validatePincode = (pincode) => {
  const pinRegex = /^[1-9]\d{5}$/;

  if (!pincode) return "PIN code is required";
  if (!pinRegex.test(pincode)) return "Enter a valid 6-digit Indian PIN code";
  return "";
};

// ---------------- AADHAAR ----------------
// Typing pattern: digits only, max 12
export const aadhaarTypingPattern = /^\d{0,12}$/;

// Full validation on blur/submit
export const validateAadhaar = (aadhaar) => {
  if (!aadhaar) return ""; // optional
  if (!/^\d{12}$/.test(aadhaar)) return "Enter valid 12-digit Aadhaar number";
  return "";
};

// ---------------- DATE OF BIRTH ---------------------
export const validateDOB = (dob) => {
  if (!dob) return "Date of birth is required";
  
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  if (age < 18) return "You must be at least 18 years old";
  if (age > 100) return "Please enter a valid date of birth";
  
  return "";
};

// ---------------- GENDER ---------------------
export const validateGender = (gender) => {
  if (!gender) return "Gender is required";
  return "";
};

// ---------------- FILE UPLOAD ---------------------
export const validateFileUpload = (file, fieldName, isRequired = true) => {
  const label = fieldName.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  
  if (!file) {
    return isRequired ? `${label} is required` : "";
  }
  
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
  
  if (file.size > maxSize) return `${label} must be less than 5MB`;
  if (!allowedTypes.includes(file.type)) return `${label} must be JPG, PNG, or PDF`;
  
  return "";
};