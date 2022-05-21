import tasksService from "@db/tasks/tasksService";
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
        await tasksService.add(
          {
            title: req.body.title,
            description: req.body.description,
          },
          req.body.point_id
        );
        res.redirect(`/tasks?point_id=${req.body.point_id}`);
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export default handler;
