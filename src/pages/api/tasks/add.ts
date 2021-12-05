import { addTask } from "@db/tasks/tasksQueries";
import schema from "@db/materials/schema";
import { cookSimpleBodyData } from "@services/pages";
import { checkAuthentication } from "@services/api";

async function handler(req, res) {
  try {
    return await checkAuthentication({
      req,
      res,
      cb: async (user) => {
        const columns = await cookSimpleBodyData({
          body: {
            title: req.body.title,
            description: req.body.description,
          },
        });
        await addTask({
          columns,
          pointId: req.body.point_id,
        });
        res.redirect("/programs");
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export default handler;
