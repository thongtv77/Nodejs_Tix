const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("token");
  try {
    const secretKey = "thongTV";
    const decode = jwt.verify(token, secretKey);
    req.user = decode;
    next();

  } catch (error) {
    res.status(401).send({
        message:"token không hợp lệ"
    });
  }
};
const authorize = (arrayRole) =>(req, res, next) => {
  const {user} = req;
  if (arrayRole.includes(user.role)){
    next();
  }else{
    res.status(403).send({
      message:"Bạn đã đăng nhập nhưng đéo đủ quyền nhé cưng"
    })
  }
}


module.exports = {
  authenticate,
  authorize,
};
