import { Points } from "@db/models";
import { SequelizeReturning } from "@db/types";
import { Point } from "@db/interfaces";

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
  // TODO: type this function
  delete: async (id: number) => {
    await Points.destroy({ where: { id } });
  },
  update: async (id: number, body: any) => {
    await Points.update(body, { where: { id } });
  },
};

export default pointsService;
