import logger from '@logger';
import { Authenticator } from '@services/Authenticator';
import { ROLES, User } from '@projectTypes/user';


const checkRoleAuthentication = async ({ req, cb, role }: { role: ROLES, cb: (redirect: string | null, user?: User) => void }) => {
  const user = await Authenticator.userFromRequest(req);

  if (!user) {
    // TODO: delete browser cookiess
    cb('/')
  } else if (user.role !== role) {
    // TODO: delete browser cookies
    logger.info(`User with id ${user.id} has no access rights to this page`);
    cb('/errors/403')
  } else {
    return cb(null, user);
  }
};

export default checkRoleAuthentication;