import { User } from "@projectTypes/user";
import { Authenticator } from "../Authenticator";

const checkAuthentication = async ({ req, cb }: { cb: (user: User) => void}) => {
  const user = await Authenticator.userFromRequest(req);
  if (!user) {
    // TODO: delete browser cookiess
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
