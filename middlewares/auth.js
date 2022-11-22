import jwt  from "jsonwebtoken";
// the auth middleware functions


export function generateToken (user){
  // implement jwt token
  return jwt.sign(user, process.env.TOKEN_SECRET);
}


export function authenticateUser (req, res, next){
  // implement checking jwt token and authenticating

  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader && authHeader.split(' ')[1];

  if(!bearerToken){
    return res.status(401).end();
  }

  // now verify the bearer token
  jwt.verify(bearerToken, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      res.status(404).end();
    } else {
      req.user = user;
      next();
    }
  });


}