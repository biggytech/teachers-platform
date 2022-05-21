
import pointsService from "@db/points/pointsService";
import { checkRoleAuthentication } from "@services/pages";
import { ROLES } from "@projectTypes/user";

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
