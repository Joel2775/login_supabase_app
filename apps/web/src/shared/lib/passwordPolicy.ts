export const PASSWORD_POLICY_DESCRIPTION =
  "Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.";

export const isPasswordSecure = (password: string): boolean =>
  password.length >= 8 &&
  /[A-Z]/.test(password) &&
  /[a-z]/.test(password) &&
  /\d/.test(password) &&
  /[^A-Za-z0-9]/.test(password);
