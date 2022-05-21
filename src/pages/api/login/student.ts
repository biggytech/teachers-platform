import { Authenticator } from "@services/Authenticator";
import studentsService from "@db/students/studentsService";
import bcrypt from "bcryptjs";
import { ROLES } from '@projectTypes/user';

async function handler(req, res) {
  try {
    const { username, password } = req.body;

    const user = await studentsService.getOneBy("username", username);

    if (!user) {
      throw new Error("not found");
    }

    var val = bcrypt.compareSync(password, user.password); // true

    if (val) {
      await Authenticator.authenticateUser(res, { username, id: user.id, role: ROLES.STUDENT });

      res.redirect("/students/courses");
    } else {
      res.redirect("/login/student?invalid=true");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export default handler;
