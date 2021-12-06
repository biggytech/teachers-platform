import { checkAuthentication } from "@services/api";
import { addProgram } from "@db/programs/index";
import { cookSimpleBodyData } from "@services/pages";

async function handler(req, res) {
  try {
    return await checkAuthentication({
      req,
      res,
      cb: async (user) => {
        const columns = await cookSimpleBodyData({
          body: req.body,
        });
        await addProgram({
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

export const config = {
  api: {
    bodyParser: true,
  },
};

export default handler;
