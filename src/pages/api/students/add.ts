import { addStudent } from "@db/students/index";
import schema from "@db/students/schema";
import { cookCreatedUserData } from "@services/users/index";
import { checkAuthentication } from "@services/api";

async function handler(req, res) {
  try {
    return await checkAuthentication({
      req,
      res,
      cb: async (user) => {
        const data = await cookCreatedUserData(req, schema);
        console.log(data.columns);
        await addStudent({
          columns: data.columns.concat({
            name: schema.column("teacher_id").name,
            value: user.id,
          }),
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
