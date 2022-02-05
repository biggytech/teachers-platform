import { Teachers } from "@db/models";
import hashPassword from "@services/hashPassword";
import {
  PaginatedResult,
  SequelizeReturning,
  SequelizeRowsAndCount,
} from "@db/types";
import { Teacher, TeacherMainInfo, TeacherSafeInfo } from "@db/interfaces";

const teachersService = {
  add: async (teacher: Omit<Teacher, "id">): Promise<Teacher> => {
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

    const created: SequelizeReturning<Teacher> = (await Teachers.create(
      preparedTeacher,
      {
        fields,
        returning: true,
      }
    )) as unknown as SequelizeReturning<Teacher>;

    return created.dataValues;
  },
  getAll: async (
    page: number,
    limit: number
  ): Promise<PaginatedResult<TeacherMainInfo>> => {
    const attributes: Array<keyof TeacherMainInfo> = [
      "id",
      "username",
      "firstname",
      "lastname",
    ];

    const data: SequelizeRowsAndCount<TeacherMainInfo> =
      (await Teachers.findAndCountAll({
        attributes,
        offset: (page - 1) * limit,
        limit,
      })) as unknown as SequelizeRowsAndCount<TeacherMainInfo>;

    const result: PaginatedResult<TeacherMainInfo> = {
      rows: data.rows.map(({ dataValues }) => dataValues),
      totalRecords: data.count,
    };

    return result;
  },
  get: async (id: Teacher["id"]): Promise<TeacherSafeInfo | null> => {
    const attributes: Array<keyof Omit<Teacher, "password">> = [
      "id",
      "username",
      "firstname",
      "lastname",
      "picture",
    ];

    const data: SequelizeReturning<Omit<Teacher, "password">> | null =
      (await Teachers.findByPk(id, {
        attributes,
      })) as unknown as SequelizeReturning<Omit<Teacher, "password">> | null;

    return data?.dataValues ?? null;
  },
  getOneBy: async <T extends keyof TeacherMainInfo>(
    field: T,
    value: Teacher[T]
  ): Promise<Teacher | null> => {
    const data: SequelizeReturning<Teacher> | null = (await Teachers.findOne({
      where: {
        [field]: value,
      },
    })) as unknown as SequelizeReturning<Teacher> | null;

    return data?.dataValues ?? null;
  },
};

export default teachersService;
