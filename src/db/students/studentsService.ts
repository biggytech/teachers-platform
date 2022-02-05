import Students from "@db/students/Students";
import {
  PaginatedResult,
  SequelizeReturning,
  SequelizeRowsAndCount,
} from "@db/types";
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
  getAll: async (
    page: number,
    limit: number
  ): Promise<PaginatedResult<Omit<Student, "password" | "picture">>> => {
    const attributes: Array<keyof Omit<Student, "password" | "picture">> = [
      "id",
      "username",
      "firstname",
      "lastname",
      "teacher_id",
    ];

    const data: SequelizeRowsAndCount<Omit<Student, "picture" | "password">> =
      (await Students.findAndCountAll({
        attributes,
        offset: (page - 1) * limit,
        limit,
      })) as unknown as SequelizeRowsAndCount<
        Omit<Student, "picture" | "password">
      >;

    return {
      rows: data.rows.map(({ dataValues }) => dataValues),
      totalRecords: data.count,
    };
  },
  getAllBy: async <T extends keyof Omit<Student, "password" | "picture">>(
    field: T,
    value: Student[T],
    page: number,
    limit: number
  ): Promise<PaginatedResult<Omit<Student, "password" | "picture">>> => {
    const attributes: Array<keyof Omit<Student, "password" | "picture">> = [
      "id",
      "username",
      "firstname",
      "lastname",
      "teacher_id",
    ];

    const data: SequelizeRowsAndCount<Omit<Student, "password" | "picture">> =
      (await Students.findAndCountAll({
        attributes,
        offset: (page - 1) * limit,
        limit,
        where: {
          [field]: value,
        },
      })) as unknown as SequelizeRowsAndCount<
        Omit<Student, "password" | "picture">
      >;

    return {
      rows: data.rows.map(({ dataValues }) => dataValues),
      totalRecords: data.count,
    };
  },
  get: async (id: Student["id"]): Promise<Omit<Student, "password"> | null> => {
    const attributes: Array<keyof Omit<Student, "password">> = [
      "id",
      "username",
      "firstname",
      "lastname",
      "picture",
      "teacher_id",
    ];

    const data: SequelizeReturning<Omit<Student, "password">> | null =
      (await Students.findByPk(id, {
        attributes,
      })) as unknown as SequelizeReturning<Omit<Student, "password">> | null;

    return data?.dataValues ?? null;
  },
  getOneBy: async <T extends keyof Omit<Student, "password" | "picture">>(
    field: T,
    value: Student[T]
  ): Promise<Student | null> => {
    const data: SequelizeReturning<Student> | null = (await Students.findOne({
      where: {
        [field]: value,
      },
    })) as unknown as SequelizeReturning<Student> | null;

    return data?.dataValues ?? null;
  },
};

export default studentsService;
