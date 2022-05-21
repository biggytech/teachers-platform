
import studentsService from "@db/students/studentsService";
import { checkRoleAuthentication } from "@services/pages";
import { ROLES } from "@types/user";

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
        await studentsService.delete(JSON.parse(req.body).id);
        res.status(200).end();
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}
export default handler;
