import JWT from "jsonwebtoken";

const createToken = (res, id) => {
  const token = JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default createToken;
