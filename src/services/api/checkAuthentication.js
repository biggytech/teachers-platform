import { userFromRequest } from "../tokens";

const checkAuthentication = async ({ req, res, cb }) => {
  const user = await userFromRequest(req);
  console.log(user);
  if (!user) {
    return res.redirect("/login/teacher");
  } else {
    return cb(user);
  }
};

export default checkAuthentication;
