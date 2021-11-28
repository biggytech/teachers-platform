import { addStudent } from "../../../db/students/index";
import schema from "../../../db/students/schema";
import { cookCreatedUserData } from "../../../services/users/index";
import { checkAuthentication } from "../../../services/api";

async function handler(req, res) {
  try {
    return await checkAuthentication({
      req,
      res,
      cb: async () => {
        const data = await cookCreatedUserData(req, schema);
        await addStudent({
          columns: data.columns,
        });
        res.redirect("/students");
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
export default handler;
