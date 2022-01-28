import { Authenticator } from "../Authenticator";

const checkAuthentication = async ({ req, cb }) => {
  const user = await Authenticator.userFromRequest(req);
  if (!user) {
    return {
      redirect: {
        destination: "/login/teacher",
        permanent: false,
      },
    };
  } else {
    return cb(user);
  }
};

export default checkAuthentication;
