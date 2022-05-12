import tasksService from "@db/tasks/tasksService";
import { checkAuthentication } from "@services/api";

async function handler(req, res) {
  try {
    return await checkAuthentication({
      req,
      res,
      cb: async (user) => {
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
