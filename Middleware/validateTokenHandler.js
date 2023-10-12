import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
export const ValidateToken = expressAsyncHandler(async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
//   console.log(authHeader);

  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
      if (err) {
        res.status(401);
        throw new Error("User is not Authorized!");
      } else {
        res.status(200);
        // console.log(decode);
        req.user=decode
        next();
      }
    });
  } else {
    res.status(401);
    throw new Error("Auth token or Bearer is not provided!");
  }
});
