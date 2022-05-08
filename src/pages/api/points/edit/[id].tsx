import { checkAuthentication } from "@services/api";
import pointsService from "@db/points/pointsService";

interface ProgramBody {
  title: string;
  description: string;
}

async function handler(req, res) {
  try {
    return await checkAuthentication({
      req,
      res,
      cb: async (user) => {
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
