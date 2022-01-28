import "@db/points/Points";
import sequelize, { authenticate } from "@db/sequelize";

interface Point {
  id: number;
  title: string;
  description: string;
  duration_days: number;
  program_id: number;
}

const pointsService = {
  add: async (point: Omit<Point, "id">) => {
    // await sequelize.sync();
    await authenticate();
    return sequelize.models.Points.create(point, {
      fields: ["title", "description", "duration_days", "program_id"],
      returning: true,
    });
  },
};

export default pointsService;
