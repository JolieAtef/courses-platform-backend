import express from "express"
import { databaseConnection } from "./database/connection.js"
import authRouter from "./modules/auth/auth.controller.js"
import userRouter from "./modules/user/user.controller.js"
import courseRouter from "./modules/course/course.controller.js"
import sessionRouter from "./modules/session/session.controller.js"
import questionRouter from "./modules/question/question.controller.js"
import subscriptionRouter from "./modules/subscription/subscription.controller.js"

export const bootstrap=()=>{
  const app = express()
  app.use(express.json())
  databaseConnection()
  app.use("/auth",authRouter)
  app.use("/users",userRouter)
  app.use("/courses",courseRouter)
  app.use("/sessions",sessionRouter)
  app.use("/questions",questionRouter)
  app.use(subscriptionRouter)

  app.listen(3000,()=>{
       console.log("server running on port 3000")
  })
}