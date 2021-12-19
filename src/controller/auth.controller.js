const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  // Mã hóa Password
  // tạo chuỗi ngẫu nhiên
  // Kết hợp chuỗi ngẫu nhiên và password thành mã Hash
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  try {
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      phone,
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const signIn = async (req, res) => {
  /**
   * 2 bước đăng nhập
   * tìm user có email đã đky
   * so sanh password
   */
  try {
    const { email, password } = req.body;
    const userLogin = await User.findOne({
      where: {
        email,
      },
    });
    if (userLogin) {
      //So sanh password
      const isAuth = bcrypt.compareSync(password, userLogin.password);
      if (isAuth) {
        /**
         * Tạo jsonwebtoken
         */
        const payload = {
          id: userLogin.id,
          email: userLogin.email,
          role: userLogin.role,
        };
        const secretKey = process.env.secretKey;
        const token = jwt.sign(payload, secretKey,{ expiresIn: 30 });

        res.status(200).send({
          message: " Đăng nhập thành công",
          token,
        });
      } else {
        res.status(400).send({
          message: "Mật khẩu không đúng",
        });
      }
    } else {
      res.status(404).send({
        message: "Không tìm thấy email phù hợp",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const passwordDefault = "123456789";
    const userDetail = await User.findOne({
      where: {
        email,
      },
    });
    if (userDetail) {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(passwordDefault, salt);
      userDetail.password = hashPassword;
      await userDetail.save();
      res.status(200).send({
        message: "reset password thành công",
        newPassword: passwordDefault,
      });
    } else {
      res.status(404).send({
        message: "Email không đúng",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  signIn,
  signUp,
  resetPassword,
};
