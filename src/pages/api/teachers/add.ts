import { addTeacher } from "../../../db/teachers/index";
import schema from "@db/teachers/schema";
import { cookCreatedUserData } from "../../../services/users/index";
import { checkAuthentication } from "../../../services/api";

async function handler(req, res) {
  try {
    return await checkAuthentication({
      req,
      res,
      cb: async () => {
        const data = await cookCreatedUserData(req, schema);
        await addTeacher({
          columns: data.columns,
        });
        res.redirect("/teachers");
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
