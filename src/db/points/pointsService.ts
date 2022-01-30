import Points from "@db/points/Points";
import { SequelizeReturning } from "@db/types";

interface Point {
  id: number;
  title: string;
  description: string;
  duration_days: number;
  program_id: number;
}

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
