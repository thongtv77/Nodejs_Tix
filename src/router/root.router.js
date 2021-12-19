const {Router} = require("express");
const { userRouter } = require("./user.router");
const { authRouter } = require("./auth.router");
const rootRouter = Router();
//http://localhost:3000/api/v1/users
rootRouter.use("/users", userRouter)
//http://localhost:3000/api/v1/auth
rootRouter.use("/auth", authRouter)



module.exports={
    rootRouter,
}

