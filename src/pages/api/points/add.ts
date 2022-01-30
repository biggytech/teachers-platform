import { checkAuthentication } from "@services/api";
import pointsService from "@db/points/pointsService";

interface PointBody {
  title: string;
  description: string;
  duration_days: number;
  program_id: number;
}

async function handler(req, res) {
  try {
    return await checkAuthentication({
      req,
      res,
      cb: async (user) => {
        const point: PointBody = req.body;

        const { id } = await pointsService.add(point);
        res.redirect(`/points/${id}`);
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export default handler;
