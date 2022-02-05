import { Authenticator } from "@services/Authenticator";
import studentsService from "@db/students/studentsService";
const bcrypt = require("bcryptjs");

async function handler(req, res) {
  try {
    const { username, password } = req.body;

    const user = await studentsService.getOneBy("username", username);

    if (!user) {
      throw new Error("not found");
    }

    var val = bcrypt.compareSync(password, user.password); // true

    if (val) {
      await Authenticator.authenticateUser(res, { username, id: user.id });

      res.redirect("/students");
    } else {
      res.redirect("/login/student?invalid=true");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export default handler;
