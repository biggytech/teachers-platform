import { Points, Programs } from "@db/models";
import { SequelizeReturning } from "@db/types";
import { Point, PointWithProgram, Program, } from "@db/interfaces";
import plansService from "@db/plans/plansService";

const pointsService = {
  add: async (point: Omit<Point, "id">): Promise<Point> => {
    const fields: Array<keyof Omit<Point, "id">> = [
      "title",
      "description",
      "duration_days",
      "program_id",
    ];

    const created: SequelizeReturning<Point> = (await Points.create(point, {
      fields,
      returning: true,
    })) as unknown as SequelizeReturning<Point>;

    return created.dataValues;
  },
  get: async (id: Point["id"]): Promise<Point | null> => {
    const data: SequelizeReturning<
    Point
    > | null = (await Points.findByPk(id)) as unknown as SequelizeReturning<
    Point
    > | null;

    return data?.dataValues ?? null;
  },
  // TODO: type this function
  delete: async (id: number) => {
    await Points.destroy({ where: { id } });
  },
  update: async (id: number, body: any) => {
    await Points.update(body, { where: { id } });
  },
  getAllBy: async <T extends keyof Point>(
    field: T,
    value: Point[T]
  ): Promise<PointWithProgram[]> => {

    const data: SequelizeReturning<
    Point & {
        program: SequelizeReturning<Program>;
      }
    >[] = (await Points.findAll({
      where: {
        [field]: value,
      },
      include: [
        {
          model: Programs,
          as: "program",
        },
      ],
    })) as unknown as SequelizeReturning<
    Point & {
        program: SequelizeReturning<Program>;
      }
    >[];

    return data.map(({ dataValues }) => ({
      ...dataValues,
      program: dataValues.program.dataValues,
    }));
  },
  getAllByPlanId: async (planId: number): Promise<PointWithProgram[]> => {
    const plans = await plansService.getAllBy('id', planId);
    const programsIds = plans.map(plan => plan.program_id);

    if (!programsIds.length) return [];

    const data: SequelizeReturning<
    Point & {
        program: SequelizeReturning<Program>;
      }
    >[] = (await Points.findAll({
      where: {
        'program_id': programsIds,
      },
      include: [
        {
          model: Programs,
          as: "program",
        },
      ],
    })) as unknown as SequelizeReturning<
    Point & {
        program: SequelizeReturning<Program>;
      }
    >[];

    return data.map(({ dataValues }) => ({
      ...dataValues,
      program: dataValues.program.dataValues,
    }));
  },
};

export default pointsService;
