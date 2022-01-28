import { Authenticator } from "../Authenticator";

const checkAuthentication = async ({ req, res, cb }) => {
  const user = await Authenticator.userFromRequest(req);
  if (!user) {
    return res.redirect("/");
  } else {
    return cb(user);
  }
};

export default checkAuthentication;
