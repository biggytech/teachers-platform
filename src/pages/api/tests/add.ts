import testsService from "@db/tests/testsService";
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
        const { id } = await testsService.add(
          {
            title: req.body.title,
            description: req.body.description,
          },
          req.body.point_id
        );
        res.redirect(`/tests/${id}`);
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export default handler;
