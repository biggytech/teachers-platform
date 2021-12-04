import { clearUser } from "@services/tokens";

async function handler(req, res) {
  try {
    clearUser(res);

    res.redirect("/login/teacher");
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export default handler;
