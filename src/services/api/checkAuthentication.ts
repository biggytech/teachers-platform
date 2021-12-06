import { userFromRequest } from "../tokens";

const checkAuthentication = async ({ req, res, cb }) => {
  const user = await userFromRequest(req);
  if (!user) {
    return res.redirect("/");
  } else {
    return cb(user);
  }
};

export default checkAuthentication;
