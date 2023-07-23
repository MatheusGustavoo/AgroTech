const jwt = require("jsonwebtoken");
const getToken = require("./getToken");

// validate token
const checkToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Acesso Negado!" });
  }
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Acesso Negado!" });
  }
  try {
    const verified = jwt.verify(token, "agrotechtoken");
    req.user = verified;
    // console.log(req.user);
    next();
  } catch (error) {
    return res.status(400).json({ message: "Token Invalido!" });
  }
};
module.exports = checkToken;
