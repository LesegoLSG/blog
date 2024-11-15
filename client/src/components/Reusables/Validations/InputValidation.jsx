export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/;
  return passwordRegex.test(password);
};

// Add more validation functions as needed
export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^\d+$/;
  return phoneRegex.test(phone);
};

export const validateLettersOnly = (letters) => {
  const letterRegex = /^[A-Za-z]+$/;
  return letterRegex.test(letters);
};

export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
  return usernameRegex.test(username);
};
