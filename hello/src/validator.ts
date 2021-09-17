export const emailvalidator = (email: string) => {
  const validEmailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return validEmailRegex.test(email);
};

export const passwordValidator = (password: string) => {
  const validPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;

  return validPasswordRegex.test(password);
};

export const dateFormatValidator = (date: string) => {
  const validDateRegex = /^\d{4}[-]\d{2}[-]\d{2}/;

  return validDateRegex.test(date);
};

export const dateValidator = (date: string) => {
  const today = new Date();
  const year = today.getFullYear();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const birthDate = date.split('-');
  const birthYear = +birthDate[0];
  const birthMonth = +birthDate[1];
  const birthDay = +birthDate[2];
  const isMonthOrDayInvalid = birthMonth > 12 || birthDay > 31;
  const isFutureYear = birthYear > year;
  const isSameYearButFutureDate =
    birthYear === year && (birthMonth > month || (birthMonth === month && birthDay > day));

  return !isMonthOrDayInvalid && !isFutureYear && !isSameYearButFutureDate;
};
