import programsService from "@db/programs/programsService";
import { checkRoleAuthentication } from "@services/pages";
import { ROLES } from "@types/user";

interface ProgramBody {
  title: string;
  description: string;
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
        const program = {
          ...(req.body as ProgramBody),
          owner_id: user.id,
        };
        const { id } = await programsService.add(program);

        res.redirect(`/programs/${id}`);
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};

export default handler;
