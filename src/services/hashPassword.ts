const bcrypt = require("bcryptjs");

// TODO: make function asynchronous
export default function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(+process.env.BCRYPT_SALT);
  const hash: string = bcrypt.hashSync(password, salt);
  return hash;
}
