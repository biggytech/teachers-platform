import { getTeacherByUsername } from "@db/teachers/index";
import teachersSchema from "@db/teachers/schema";
import { Authenticator } from "@services/Authenticator";
var bcrypt = require("bcryptjs");

async function handler(req, res) {
  try {
    const { username, password } = req.body;

    let user;

    const columns = [
      teachersSchema.column("id").toObject(),
      teachersSchema.column("username").toObject(),
      teachersSchema.column("password").toObject(),
    ];

    user = await getTeacherByUsername({
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
      res.redirect("/login/teacher?invalid=true");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export default handler;
