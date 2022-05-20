import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import logger from '@logger'

namespace Utils {
  export class CookieService {
    protected static setCookie(
      res,
      name: string,
      value: any,
      options: object = {}
    ): void {
      const stringValue =
        typeof value === "object"
          ? `j:${JSON.stringify(value)}`
          : String(value);

      res.setHeader(
        "Set-Cookie",
        serialize(name, String(stringValue), options)
      );
    }
  }
}

export class Authenticator extends Utils.CookieService {
  static cookieOptions = {
    httpOnly: true,
    path: "/",
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
  };

  // This sets the cookie on a NextApiResponse so we can authenticate
  // users on API routes.
  public static authenticateUser(res, payload: any): void {
    const token = jwt.sign(payload, process.env.JWT_TOKEN_KEY, {
      expiresIn: "1d",
    });

    this.setCookie(res, "auth", token, this.cookieOptions);
  }

  // This removes the auth cookie, effectively logging out
  // the user.
  public static clearUser(res): void {
    this.setCookie(res, "auth", "0", {
      ...this.cookieOptions,
      path: "/",
      maxAge: 1,
    });
  }

  // This gives back the user behind a given request
  // either on API routes or getServerSideProps
  public static async userFromRequest(req): Promise<any> {
    const { auth: token } = req.cookies;

    if (!token) return null;

    try {
      const data = jwt.verify(token, process.env.JWT_TOKEN_KEY);
      logger.info(`User data is:`, data);

      if (!data) return null;
      return data;
    } catch (error) {
      logger.err(error.message);
      return null;
    }
  }
}
