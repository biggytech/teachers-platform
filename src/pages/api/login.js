import { getUserByUsername } from "../../db/users/index";
import schema from "../../db/users/schema";
import dataTypes from "../../db/dataTypes";
import { authenticateUser } from "../../services/tokens";
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

    const columns = [schema.columns.username, schema.columns.password];

    const user = await getUserByUsername({
      username,
      columns,
      role: dataTypes.role.data.student,
    });
    if (!user) {
      throw new Error("not found");
    }
    var val = bcrypt.compareSync(password, user.password); // true

    if (val) {
      await authenticateUser(res, { username });

      res.redirect("/students");
    } else {
      res.redirect("/login?invalid=true");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export default handler;
