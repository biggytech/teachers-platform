import { addPoint } from "@db/points/index";
import { cookSimpleBodyData } from "@services/pages";
import { checkAuthentication } from "@services/api";

async function handler(req, res) {
  try {
    return await checkAuthentication({
      req,
      res,
      cb: async (user) => {
        const columns = await cookSimpleBodyData({
          body: req.body,
        });
        await addPoint({
          columns,
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
