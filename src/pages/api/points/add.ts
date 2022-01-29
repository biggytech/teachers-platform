import { checkAuthentication } from "@services/api";
import pointsService from "@db/points/pointsService";

async function handler(req, res) {
  try {
    return await checkAuthentication({
      req,
      res,
      cb: async (user) => {
        const {
          dataValues: { id },
        } = await pointsService.add(req.body);
        res.redirect(`/points/${id}`);
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export default handler;
