import jwt from "jsonwebtoken";
// the auth middleware functions

export function generateToken(user) {
  // implement jwt token
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

export function authenticateUser(req, res, next) {
  // implement checking jwt token and authenticating

  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader && authHeader.split(" ")[1];

  if (!bearerToken) {
    return res.sendStatus(401);
  }

  // now verify the bearer token
  jwt.verify(bearerToken, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      req.user = user;
      next();
    }
  });
}
