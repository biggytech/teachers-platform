import { getStudentByUsername } from "@db/students/index";
import studentsSchema from "@db/students/schema";
import { Authenticator } from "@services/Authenticator";
var bcrypt = require("bcryptjs");

async function handler(req, res) {
  try {
    const { username, password } = req.body;

    let user;

    const columns = [
      studentsSchema.column("id").toObject(),
      studentsSchema.column("username").toObject(),
      studentsSchema.column("password").toObject(),
    ];

    user = await getStudentByUsername({
      username,
      columns,
    });

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
