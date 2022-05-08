import materialsService from "@db/materials/materialsService";
import { checkAuthentication } from "@services/api";

async function handler(req, res) {
  try {
    return await checkAuthentication({
      req,
      res,
      cb: async (user) => {
        await materialsService.add(req.body);
        res.redirect(`/materials?program_id=${req.body.program_id}`);
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export default handler;
