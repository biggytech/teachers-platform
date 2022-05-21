import pointsService from "@db/points/pointsService";
import { checkRoleAuthentication } from "@services/pages";
import { ROLES } from "@projectTypes/user";

interface ProgramBody {
  title: string;
  description: string;
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

        let point = req.body;
        point = Object.keys(point).reduce((o, key) => {
          if (point[key]) {
            o[key] = point[key];
          }
          return o;
        }, {});

        const id = req.query.id;
        await pointsService.update(id, point);

        res.redirect(`/points/${id}`);
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};

export default handler;
