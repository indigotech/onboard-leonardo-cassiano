export const emailvalidator = (email: string) => {
  const validEmailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (validEmailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
};

export const passwordValidator = (password: string) => {
  const validPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;

  if (validPasswordRegex.test(password)) {
    return true;
  } else {
    return false;
  }
};
