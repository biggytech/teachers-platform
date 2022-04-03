import plansService from "@db/plans/plansService";
import { checkAuthentication } from "@services/api";

interface PlanBody {
  start_date: Date;
  student_id: number;
  program_id: number;
}

async function handler(req, res) {
  try {
    return await checkAuthentication({
      req,
      res,
      cb: async (user) => {
        const plan: PlanBody = req.body;
        const { id } = await plansService.add(plan);

        res.redirect(`/plans/${id}`);
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export default handler;
