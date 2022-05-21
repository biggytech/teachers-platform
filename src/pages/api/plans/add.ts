import plansService from "@db/plans/plansService";
import { checkRoleAuthentication } from "@services/pages";
import { ROLES } from "@types/user";

interface PlanBody {
  start_date: Date;
  student_id: number;
  program_id: number;
}

async function handler(req, res) {
  try {
    return await checkRoleAuthentication({
      role: ROLES.TEACHER,
      req,
      res,
      cb: async (redirect, user) => {
        if (redirect) {
          return res.redirect(redirect);
        }
        
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
