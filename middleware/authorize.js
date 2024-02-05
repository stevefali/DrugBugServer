const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const bearerTokenString = req.headers.authorization;

  if (!bearerTokenString) {
    return res.status(401).json({
      message: "Resource requires Bearer token in Authorization header",
    });
  }

  const splitBearerTokenString = bearerTokenString.split(" ");

  if (splitBearerTokenString.length !== 2) {
    return res.status(400).json({ message: "Bearer token is malformed" });
  }
  const token = splitBearerTokenString[1];

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    console.log(err);
    if (err) {
      return res.status(403).json({ error: "Invalid JWT" });
    }

    delete decoded.password;
    // Include the verified user's id in the req.
    req.verId = decoded.id;
    next();
  });
};
