import { checkAuthentication } from "@services/api";
import teachersService from "@db/teachers/teachersService";
import getFormData from "@services/getFormData";
import fs from "fs";

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
    return await checkAuthentication({
      req,
      res,
      cb: async (user) => {
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
