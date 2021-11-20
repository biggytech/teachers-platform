import { userFromRequest } from "../tokens";

const checkAuthentication = async ({ req, res, cb }) => {
  const auth = await userFromRequest(req);
  console.log(auth);
  if (!auth) {
    return res.redirect("/students");
  } else {
    return cb();
  }
};

export default checkAuthentication;
