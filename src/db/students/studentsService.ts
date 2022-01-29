import Students from "@db/students/Students";
import { Returning } from "@db/types";
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
  add: (student: Omit<Student, "id">): Promise<Returning<Student>> => {
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

    return Students.create(preparedStudent, {
      fields,
      returning: true,
    }) as unknown as Promise<Returning<Student>>;
  },
};

export default studentsService;
