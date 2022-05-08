import { addMaterial } from "@db/materials/index";
import schema from "@db/materials/materialsSchema";
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
        await addMaterial({
          columns,
        });
        res.redirect(`/materials?program_id=${req.body.program_id}`);
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export default handler;
