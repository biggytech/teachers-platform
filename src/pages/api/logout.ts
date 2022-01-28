import { Authenticator } from "@services/Authenticator";

async function handler(req, res) {
  try {
    Authenticator.clearUser(res);

    res.redirect("/login/teacher");
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export default handler;
