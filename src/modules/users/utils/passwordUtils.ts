import bcrypt from "bcrypt";

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

const checkPassword = async (password: string, passwordFromDb: string) => {
  return await bcrypt.compare(password, passwordFromDb);
};


export {hashPassword, checkPassword}
