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

// Generic phone validation (any 10-digit number)
export const validatePhoneGeneric = (phone) => {
  if (!phone) return "Phone number is required";
  if (!/^\d{10}$/.test(phone)) return "Enter a valid 10-digit phone number";
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

// ============================================================
// INPUT RESTRICTION HANDLERS (reusable across all forms)
// ============================================================

// Restrict to letters & spaces only — for Name, City, State, Country
export const restrictToLetters = (value) =>
  value.replace(/[^A-Za-z\s]/g, '');

// Restrict to digits only with max length — for Phone(10), Pincode(6), Aadhaar(12)
export const restrictToDigits = (value, maxLength) =>
  value.replace(/\D/g, '').slice(0, maxLength);

// Detect if value contains invalid chars for letters-only fields
export const hasInvalidLetterChars = (value) => /[^A-Za-z\s]/.test(value);

// Detect if value contains non-digit chars
export const hasInvalidDigitChars = (value) => /\D/.test(value);

// Handle paste for letters-only fields
export const handlePasteLettersOnly = (e, onChange) => {
  e.preventDefault();
  const pasted = e.clipboardData.getData('text').replace(/[^A-Za-z\s]/g, '');
  onChange(pasted);
};

// Handle paste for digits-only fields
export const handlePasteDigitsOnly = (e, maxLength, onChange) => {
  e.preventDefault();
  const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, maxLength);
  onChange(pasted);
};

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

// ---------------- ADDRESS ---------------------
export const validateAddress = (value) => {
  if (!value || !value.trim()) return "Address is required";
  if (value.trim().length < 10) return "Please enter a complete address";
  return "";
};

// ---------------- TEXTAREA ---------------------
export const validateTextarea = (value, fieldName, minLength = 20) => {
  const label = fieldName.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  if (!value || !value.trim()) return `${label} is required`;
  if (value.trim().length < minLength) return `${label} must be at least ${minLength} characters`;
  return "";
};

// ---------------- SELECT ---------------------
export const validateSelect = (value, fieldName) => {
  const label = fieldName.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  if (!value || value === "") return `${label} is required`;
  return "";
};

// ---------------- LEGAL CONSENT ---------------------
export const validateConsent = (checked) => {
  if (!checked) return "You must accept the legal consent to proceed";
  return "";
};

// ---------------- SSN ---------------------
export const validateSSN = (ssn) => {
  if (!ssn) return "Social Security Number is required";
  if (!/^\d{3}-\d{2}-\d{4}$/.test(ssn)) return "Enter valid SSN in format XXX-XX-XXXX";
  return "";
};

// ---------------- DETECTIVE LICENSE NUMBER ---------------------
export const validateLicenseNumber = (value) => {
  if (!value || !value.trim()) return "License number is required";
  if (value.trim().length < 4) return "Enter a valid license number";
  return "";
};

// ---------------- BANK ACCOUNT NUMBER ---------------------
export const validateAccountNumber = (value) => {
  if (!value || !value.trim()) return "Account number is required";
  if (!/^\d{6,17}$/.test(value.trim())) return "Enter a valid account number (6-17 digits)";
  return "";
};

// ---------------- ROUTING NUMBER ---------------------
export const validateRoutingNumber = (value) => {
  if (!value || !value.trim()) return "Routing number is required";
  if (!/^\d{9}$/.test(value.trim())) return "Enter a valid 9-digit routing number";
  return "";
};

// ---------------- LICENSE DATES ---------------------
export const validateLicenseIssueDate = (value) => {
  if (!value) return "License issue date is required";
  if (new Date(value) > new Date()) return "Issue date cannot be in the future";
  return "";
};

export const validateLicenseExpiryDate = (value, issueDate) => {
  if (!value) return "License expiry date is required";
  if (issueDate && new Date(value) <= new Date(issueDate)) return "Expiry date must be after issue date";
  return "";
};

// ---------------- ZIP CODE ---------------------
export const validateZip = (value) => {
  if (!value || !value.trim()) return "ZIP/Postal code is required";
  if (value.trim().length < 3) return "Enter a valid ZIP/Postal code";
  return "";
};