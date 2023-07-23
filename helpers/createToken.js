const jwt = require("jsonwebtoken");

//criar token
const createToken = async (user, req, res) => {
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    "agrotechtoken"
  );

  //retorno
  res.status(200).json({
    message: "Você está autenticado",
    token: token,
    id: user._id,
  });
};
module.exports = createToken;
