import questionsService from "@db/questions/questionsService";
import { checkRoleAuthentication, cookSimpleBodyData } from "@services/pages";
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
        const { id } = await questionsService.add(req.body);
        res.redirect(`/questions/${id}`);
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export default handler;
