import { addUser } from "../../../db/users/index";
import dataTypes from "../../../db/dataTypes";
import { cookCreatedUserData } from "../../../services/users/index";
import { checkAuthentication } from "../../../services/api";

async function handler(req, res) {
  try {
    return await checkAuthentication({
      req,
      res,
      cb: async () => {
        const data = await cookCreatedUserData(req);
        await addUser({
          columns: data.columns,
          role: dataTypes.role.data.teacher,
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
