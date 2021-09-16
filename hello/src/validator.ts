export const emailvalidator = (email: string) => {
  const validEmailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return validEmailRegex.test(email)
};

export const passwordValidator = (password: string) => {
  const validPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;

  result validPasswordRegex.test(password)
};
