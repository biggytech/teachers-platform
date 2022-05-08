import { Programs, Teachers } from "@db/models";
import {
  PaginatedResult,
  SequelizeReturning,
  SequelizeRowsAndCount,
} from "@db/types";
import { Program, Teacher, ProgramWithTeacher } from "@db/interfaces";

const programsService = {
  add: async (program: Omit<Program, "id">): Promise<Program> => {
    const fields: Array<keyof Omit<Program, "id">> = [
      "title",
      "description",
      "owner_id",
    ];

    const created: SequelizeReturning<Program> = (await Programs.create(
      program,
      {
        fields,
        returning: true,
      }
    )) as unknown as SequelizeReturning<Program>;

    return created.dataValues;
  },
  getAllBy: async <T extends keyof Program>(
    field: T,
    value: Program[T],
    page: number,
    limit: number
  ): Promise<PaginatedResult<Program>> => {
    const data: SequelizeRowsAndCount<Program> =
      (await Programs.findAndCountAll({
        offset: (page - 1) * limit,
        limit,
        where: {
          [field]: value,
        },
      })) as unknown as SequelizeRowsAndCount<Program>;

    return {
      rows: data.rows.map(({ dataValues }) => dataValues),
      totalRecords: data.count,
    };
  },
  get: async (id: Program["id"]): Promise<ProgramWithTeacher | null> => {
    const data: SequelizeReturning<
      Program & {
        teacher: SequelizeReturning<Teacher>;
      }
    > | null = (await Programs.findByPk(id, {
      include: {
        model: Teachers,
        as: "teacher",
      },
    })) as unknown as SequelizeReturning<
      Program & {
        teacher: SequelizeReturning<Teacher>;
      }
    > | null;

    return data?.dataValues
      ? {
          ...data.dataValues,
          teacher: data.dataValues.teacher.dataValues,
        }
      : null;
  },
  // TODO: type this function
  delete: async (id: number) => {
    await Programs.destroy({ where: { id } });
  },
  update: async (id: number, body: any) => {
    await Programs.update(body, { where: { id } });
  },
};

export default programsService;
