import { userFromRequest } from "../tokens";

const checkAuthentication = async ({ req, cb }) => {
  const user = await userFromRequest(req);
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
