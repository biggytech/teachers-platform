import { Plans, Students, Programs } from "@db/models";
import {
  Plan,
  PlanWithStudentAndProgram,
  Program,
  Student,
} from "@db/interfaces";
import { SequelizeReturning } from "@db/types";

const plansService = {
  getAllBy: async <T extends keyof Plan>(
    field: T,
    value: Plan[T]
  ): Promise<PlanWithStudentAndProgram[]> => {
    const data: SequelizeReturning<
      Plan & {
        student: SequelizeReturning<Student>;
        program: SequelizeReturning<Program>;
      }
    >[] = (await Plans.findAll({
      where: {
        [field]: value,
      },
      include: [
        {
          model: Students,
          as: "student",
        },
        {
          model: Programs,
          as: "program",
        },
      ],
    })) as unknown as SequelizeReturning<
      Plan & {
        student: SequelizeReturning<Student>;
        program: SequelizeReturning<Program>;
      }
    >[];

    return data.map(({ dataValues }) => ({
      ...dataValues,
      student: dataValues.student.dataValues,
      program: dataValues.program.dataValues,
    }));
  },
  add: async (plan: Omit<Plan, "id">): Promise<Plan> => {
    const fields: Array<keyof Omit<Plan, "id">> = [
      "start_date",
      "student_id",
      "program_id",
    ];

    const created: SequelizeReturning<Plan> = (await Plans.create(plan, {
      fields,
      returning: true,
    })) as unknown as SequelizeReturning<Plan>;

    return created.dataValues;
  },
};

export default plansService;
