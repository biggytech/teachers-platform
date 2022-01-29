import { checkAuthentication } from "@services/api";
import getFormData from "@services/getFormData";
import fs from "fs";
import studentsService from "@db/students/studentsService";

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
    return await checkAuthentication({
      req,
      res,
      cb: async (user) => {
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

        const {
          dataValues: { id },
        } = await studentsService.add(student);

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
