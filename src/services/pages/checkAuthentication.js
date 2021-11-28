import { userFromRequest } from "../tokens";

const checkAuthentication = async ({ req, cb }) => {
  const auth = await userFromRequest(req);
  console.log(auth);
  if (!auth) {
    return {
      redirect: {
        destination: "/login/teacher",
        permanent: false,
      },
    };
  } else {
    return cb();
  }
};

export default checkAuthentication;
