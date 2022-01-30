import Students from "@db/students/Students";
import { SequelizeReturning } from "@db/types";
import hashPassword from "@services/hashPassword";

interface Student {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  picture?: Buffer;
  teacher_id: number;
}

const studentsService = {
  add: async (student: Omit<Student, "id">): Promise<Student> => {
    const preparedStudent = {
      ...student,
      password: hashPassword(student.password),
    };

    const fields: Array<keyof Omit<Student, "id">> = [
      "username",
      "firstname",
      "lastname",
      "password",
      "picture",
      "teacher_id",
    ];

    const created: SequelizeReturning<Student> = (await Students.create(
      preparedStudent,
      {
        fields,
        returning: true,
      }
    )) as unknown as SequelizeReturning<Student>;

    return created.dataValues;
  },
};

export default studentsService;
