import { Authenticator } from "../Authenticator";

const checkAuthentication = async ({ req, cb }) => {
  const user = await Authenticator.userFromRequest(req);
  if (!user) {
    // TODO: delete browser cookies
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return cb(user);
  }
};

export default checkAuthentication;
