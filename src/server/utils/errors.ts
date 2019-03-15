export const validEmail = (email: string) => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validUsername = (username: string) => {
  if (username.length >= 3) return true;
  else return false;
};

export const validPassword = (password: string) => {
  if (password.length >= 8) return true;
  else return false;
};
