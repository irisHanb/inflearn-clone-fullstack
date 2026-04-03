import bcrypt from "bcryptjs";

// salt + hash
export function saltAndHashPassword(password: string): string {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

// 입력받은 비밀번호 vs DB 에 있는 비밀번호
export function comparePassword(
  password: string,
  hasedPassword: string,
): boolean {
  return bcrypt.compareSync(password, hasedPassword);
}
