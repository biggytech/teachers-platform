import { checkAuthentication } from "@services/api";
import { addProgram } from "@db/programs/index";
import { cookCreatedProgramData } from "@services/pages/programs";

async function handler(req, res) {
  try {
    return await checkAuthentication({
      req,
      res,
      cb: async (user) => {
        const { program, points } = req.body;
        console.log(req.body);
        console.log(program, points);
        const { columns, children } = cookCreatedProgramData({
          program,
          points,
          userId: user.id,
        });
        await addProgram({ columns, children });
        res.redirect("/programs");
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
