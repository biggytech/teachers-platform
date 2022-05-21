import taskMarksService from "@db/task_marks/taskMarksService";
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
        const { point_id, ...task } = req.body;
        await taskMarksService.add(task);
        res.redirect(`/points/by_plans/${point_id}?plan_id=${task.plan_id}`);
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export default handler;
