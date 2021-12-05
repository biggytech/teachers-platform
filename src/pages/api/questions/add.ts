import { addQuestion } from "@db/questions/questionsQueries";
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
            description: req.body.description,
          },
        });
        console.log(req.body);
        await addQuestion({
          columns,
          testId: req.body.test_id,
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
