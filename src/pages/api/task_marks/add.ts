import taskMarksService from "@db/task_marks/taskMarksService";
import { checkAuthentication } from "@services/api";

async function handler(req, res) {
  try {
    return await checkAuthentication({
      req,
      res,
      cb: async (user) => {
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
