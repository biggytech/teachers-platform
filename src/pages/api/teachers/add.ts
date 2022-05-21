
import teachersService from "@db/teachers/teachersService";
import getFormData from "@services/getFormData";
import fs from "fs";
import { checkRoleAuthentication } from "@services/pages";
import { ROLES } from "@projectTypes/user";

interface TeacherFields {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
}

interface TeacherFiles {
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
          TeacherFields,
          TeacherFiles
        >(req);
        const teacher = {
          ...fields,
          picture: files.picture
            ? fs.readFileSync(files.picture.filepath)
            : null,
        };
        const { id } = await teachersService.add(teacher);
        res.redirect(`/teachers/${id}`);
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
