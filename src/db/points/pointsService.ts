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
};

export default pointsService;
