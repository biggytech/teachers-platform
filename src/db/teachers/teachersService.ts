import Teachers from "@db/teachers/Teachers";
import hashPassword from "@services/hashPassword";
import { Returning } from "@db/types";

interface Teacher {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  picture?: Buffer;
}

const teachersService = {
  add: (teacher: Omit<Teacher, "id">): Promise<Returning<Teacher>> => {
    const preparedTeacher = {
      ...teacher,
      password: hashPassword(teacher.password),
    };

    const fields: Array<keyof Omit<Teacher, "id">> = [
      "username",
      "firstname",
      "lastname",
      "password",
      "picture",
    ];

    return Teachers.create(preparedTeacher, {
      fields,
      returning: true,
    }) as unknown as Promise<Returning<Teacher>>;
  },
};

export default teachersService;
