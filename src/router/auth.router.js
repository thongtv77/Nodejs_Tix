const { Router } = require("express");
const {
  signIn,
  signUp,
  resetPassword,
} = require("../controller/auth.controller");
const authRouter = Router();
//http://localhost:3000/api/v1/auth/sign-in
authRouter.post("/sign-in", signIn);
//http://localhost:3000/api/v1/auth/sign-up
authRouter.post("/sign-up", signUp);
//http://localhost:3000/api/v1/auth/reset-password
authRouter.post("/reset-password", resetPassword);
module.exports = {
  authRouter,
};
