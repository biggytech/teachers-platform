import Points from "@db/points/Points";
import { Returning } from "@db/types";

interface Point {
  id: number;
  title: string;
  description: string;
  duration_days: number;
  program_id: number;
}

const pointsService = {
  add: (point: Omit<Point, "id">): Promise<Returning<Point>> => {
    const fields: Array<keyof Omit<Point, "id">> = [
      "title",
      "description",
      "duration_days",
      "program_id",
    ];

    return Points.create(point, {
      fields,
      returning: true,
    }) as unknown as Promise<Returning<Point>>;
  },
};

export default pointsService;
