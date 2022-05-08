import { Students } from "@db/models";
import {
  PaginatedResult,
  SequelizeReturning,
  SequelizeRowsAndCount,
} from "@db/types";
import hashPassword from "@services/hashPassword";
import { Student, StudentMainInfo, StudentSafeInfo } from "@db/interfaces";

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
  ): Promise<PaginatedResult<StudentMainInfo>> => {
    const attributes: Array<keyof StudentMainInfo> = [
      "id",
      "username",
      "firstname",
      "lastname",
      "teacher_id",
    ];

    const data: SequelizeRowsAndCount<StudentMainInfo> =
      (await Students.findAndCountAll({
        attributes,
        offset: (page - 1) * limit,
        limit,
      })) as unknown as SequelizeRowsAndCount<StudentMainInfo>;

    return {
      rows: data.rows.map(({ dataValues }) => dataValues),
      totalRecords: data.count,
    };
  },
  getAllBy: async <T extends keyof StudentMainInfo>(
    field: T,
    value: Student[T],
    page: number,
    limit: number
  ): Promise<PaginatedResult<StudentMainInfo>> => {
    const attributes: Array<keyof StudentMainInfo> = [
      "id",
      "username",
      "firstname",
      "lastname",
      "teacher_id",
    ];

    const data: SequelizeRowsAndCount<StudentMainInfo> =
      (await Students.findAndCountAll({
        attributes,
        offset: (page - 1) * limit,
        limit,
        where: {
          [field]: value,
        },
      })) as unknown as SequelizeRowsAndCount<StudentMainInfo>;

    return {
      rows: data.rows.map(({ dataValues }) => dataValues),
      totalRecords: data.count,
    };
  },
  get: async (id: Student["id"]): Promise<StudentSafeInfo | null> => {
    const attributes: Array<keyof StudentSafeInfo> = [
      "id",
      "username",
      "firstname",
      "lastname",
      "picture",
      "teacher_id",
    ];

    const data: SequelizeReturning<StudentSafeInfo> | null =
      (await Students.findByPk(id, {
        attributes,
      })) as unknown as SequelizeReturning<StudentSafeInfo> | null;

    return data?.dataValues ?? null;
  },
  getOneBy: async <T extends keyof StudentMainInfo>(
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
  // TODO: type this function
  delete: async (id: number) => {
    await Students.destroy({ where: { id } });
  },
};

export default studentsService;
