import express from "express"
import { banUser, deleteUser, getAllUser, getUserById, unBanUser } from "./user.service.js"
import { authenticate, authorize } from "../../common/middleware/auth.js"

let router = express.Router()

router.get("/",authenticate, authorize("admin"),getAllUser)
router.get("/:id",authenticate, authorize("admin"),getUserById)
router.patch("/:id/ban",authenticate, authorize("admin"),banUser)
router.patch("/:id/unban",authenticate, authorize("admin"),unBanUser)
router.delete("/:id",authenticate, authorize("admin"),deleteUser)


export default router