import pointsService from "@db/points/pointsService";
import { checkRoleAuthentication } from "@services/pages";
import { ROLES } from "@projectTypes/user";

interface PointBody {
  title: string;
  description: string;
  duration_days: number;
  program_id: number;
}

async function handler(req, res) {
  try {
    return await checkRoleAuthentication({
      role: ROLES.TEACHER,
      req,
      res,
      cb: async (redirect, user) => {
        if (redirect) {
          return res.redirect(redirect);
        }
        
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
