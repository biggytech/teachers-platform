import { addMaterial } from "@db/materials/index";
import schema from "@db/materials/schema";
import { cookCreatedMaterialData } from "@services/pages/materials/index";
import { checkAuthentication } from "@services/api";

async function handler(req, res) {
  try {
    return await checkAuthentication({
      req,
      res,
      cb: async (user) => {
        console.log(req.body);
        const columns = await cookCreatedMaterialData({
          body: req.body,
        });
        await addMaterial({
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