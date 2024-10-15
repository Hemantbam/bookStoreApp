export const emailPasswordValidation = (email, password) => {
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();
  if (trimmedEmail !== "" && trimmedPassword !== "") {
    return true;
  }
  return false;
};
