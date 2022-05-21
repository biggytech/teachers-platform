
import programsService from "@db/programs/programsService";
import { checkRoleAuthentication } from "@services/pages";
import { ROLES } from "@projectTypes/user";

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
        let program = {
          ...(req.body as ProgramBody),
          owner_id: user.id,
        };
        program = Object.keys(program).reduce((o, key) => {
          if (program[key]) {
            o[key] = program[key];
          }
          return o;
        }, {});
        const id = req.query.id;
        await programsService.update(id, program);

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
