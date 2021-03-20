const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Missing Authorization Header" });
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ msg: "No authentication token, authorization denied" });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid Token" });
  }
};

module.exports = auth;
