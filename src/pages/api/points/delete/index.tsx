import { checkAuthentication } from "@services/api";
import pointsService from "@db/points/pointsService";

async function handler(req, res) {
  try {
    return await checkAuthentication({
      req,
      res,
      cb: async (user) => {
        await pointsService.delete(JSON.parse(req.body).id);
        res.status(200).end();
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}
export default handler;
