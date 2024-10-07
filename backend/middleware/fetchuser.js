var jwt = require("jsonwebtoken");
const JWT_Secret = "ThisSecure";

//middleware to fetch user from jwt token

const fetchuser = (req, res, next) => {
  //get the user from jwt token and id to req obj
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using valid token" });
  }
  try {
    const data = jwt.verify(token,JWT_Secret);
    req.user = data.user;
    next();
    
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

module.exports = fetchuser;
