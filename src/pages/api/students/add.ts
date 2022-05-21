
import getFormData from "@services/getFormData";
import fs from "fs";
import studentsService from "@db/students/studentsService";
import { checkRoleAuthentication } from "@services/pages";
import { ROLES } from "@types/user";

interface StudentFields {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
}

interface StudentFiles {
  picture?: Buffer;
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
        const { fields, files } = await getFormData<
          StudentFields,
          StudentFiles
        >(req);
        const student = {
          ...fields,
          teacher_id: user.id,
          picture: files.picture
            ? fs.readFileSync(files.picture.filepath)
            : null,
        };

        const { id } = await studentsService.add(student);

        res.redirect(`/students/${id}`);
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
