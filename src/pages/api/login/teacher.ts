import { Authenticator } from "@services/Authenticator";
import teachersService from "@db/teachers/teachersService";
import bcrypt from "bcryptjs";
import { ROLES } from '@projectTypes/user'

async function handler(req, res) {
  try {
    const { username, password } = req.body;

    const teacher = await teachersService.getOneBy("username", username);

    if (!teacher) {
      throw new Error("not found");
    }

    const isPasswordValid = bcrypt.compareSync(password, teacher.password); // true

    if (isPasswordValid) {
      await Authenticator.authenticateUser(res, { username, id: teacher.id, role: ROLES.TEACHER });

      res.redirect("/students");
    } else {
      res.redirect("/login/teacher?invalid=true");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export default handler;
