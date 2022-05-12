import testsService from "@db/tests/testsService";
import { checkAuthentication } from "@services/api";

async function handler(req, res) {
  try {
    return await checkAuthentication({
      req,
      res,
      cb: async (user) => {
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
