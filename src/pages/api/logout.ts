import { Authenticator } from "@services/Authenticator";

async function handler(req, res) {
  try {
    Authenticator.clearUser(res);

    res.status(200).end();
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export default handler;
