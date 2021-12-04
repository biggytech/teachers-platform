import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const cookieOptions = {
  httpOnly: true,
  path: "/",
  sameSite: "Strict",
  secure: process.env.NODE_ENV === "production",
};

function setCookie(res, name, value, options = {}) {
  const stringValue =
    typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value);

  res.setHeader("Set-Cookie", serialize(name, String(stringValue), options));
}

// This sets the cookie on a NextApiResponse so we can authenticate
// users on API routes.
export function authenticateUser(res, payload) {
  const token = jwt.sign(payload, process.env.JWT_TOKEN_KEY, {
    expiresIn: "1d",
  });

  setCookie(res, "auth", token, cookieOptions);
}

// This removes the auth cookie, effectively logging out
// the user.
export function clearUser(res) {
  setCookie(res, "auth", "0", {
    ...cookieOptions,
    path: "/",
    maxAge: 1,
  });
}

// This gives back the user behind a given request
// either on API routes or getServerSideProps
export async function userFromRequest(req) {
  const { auth: token } = req.cookies;

  if (!token) return null;

  try {
    const data = jwt.verify(token, process.env.JWT_TOKEN_KEY);

    if (!data) return null;
    return data;
  } catch (error) {
    console.log("ERROR!!!");
    console.log(error);
    return null;
  }
}
