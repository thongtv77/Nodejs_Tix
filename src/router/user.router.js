const { Router } = require("express");
const {
  findAllUser,
  findDetailUser,
  createUser,
  updateUser,
  removeUser,
  uploadAvatar,
} = require("../controller/user.controller");
const {
  authenticate,
  authorize,
} = require("../middlewares/validation/auth/verify-token.middleware");
const {
  checkExist,
} = require("../middlewares/validation/checkExist.middlewares");
const { User } = require("../models");
const userRouter = Router();
//http://localhost:3000/api/v1/users/upload-avatar
userRouter.post("/upload-avatar", uploadAvatar);
//http://localhost:3000/api/v1/users
userRouter.get("/", findAllUser);
//http://localhost:3000/api/v1/users/:id
userRouter.get("/:id", checkExist(User), findDetailUser);
//http://localhost:3000/api/v1/users
userRouter.post("/", createUser);
//http://localhost:3000/api/v1/users/1
userRouter.put("/:id", checkExist(User), updateUser);
//http://localhost:3000/api/v1/users/1
userRouter.delete(
  "/:id",
  [checkExist(User), authenticate, authorize],
  removeUser
);

module.exports = {
  userRouter,
};
