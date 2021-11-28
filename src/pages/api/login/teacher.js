import { getTeacherByUsername } from "../../../db/teachers/index";
import teachersSchema from "../../../db/teachers/schema";
import { authenticateUser } from "../../../services/tokens";
var bcrypt = require("bcryptjs");

// const cookieOptions = {
//   httpOnly: true,
//   maxAge: 2592000,
//   path: "/",
//   sameSite: "Strict",
//   secure: process.env.NODE_ENV === "production",
// };

async function handler(req, res) {
  try {
    const { username, password } = req.body;

    let user;

    const columns = [
      teachersSchema.columns.id,
      teachersSchema.columns.username,
      teachersSchema.columns.password,
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
      await authenticateUser(res, { username, id: user.id });

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
