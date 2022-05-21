import materialsService from "@db/materials/materialsService";
import { checkRoleAuthentication } from "@services/pages";
import { ROLES } from "@types/user";

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
