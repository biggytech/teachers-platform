import { addPoint } from "@db/points/index";
import { cookSimpleBodyData } from "@services/pages";
import { checkAuthentication } from "@services/api";
import Points from "@services/Points";

async function handler(req, res) {
  try {
    return await checkAuthentication({
      req,
      res,
      cb: async (user) => {
        const {
          // @ts-ignore TODO: fix type error
          dataValues: { id },
        } = await Points.add(req.body);
        res.redirect(`/points/${id}`);
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export default handler;
