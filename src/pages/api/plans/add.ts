import { addPlan } from "@db/plans/plansQueries";
import schema from "@db/materials/materialsSchema";
import { cookCreatedPlanData } from "@services/pages/plans/index";
import { checkAuthentication } from "@services/api";

async function handler(req, res) {
  try {
    return await checkAuthentication({
      req,
      res,
      cb: async (user) => {
        const columns = await cookCreatedPlanData({
          body: req.body,
        });
        await addPlan({
          columns,
        });
        res.redirect("/students");
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export default handler;
