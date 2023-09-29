import express from "express"
import { signin } from "../controllers/authenController"

/**
 * @description Route นี้เป็น Route ที่เกี่ยวข้องกับการ Authentication
 * @see Account
 */

const router = express.Router()

router.post("/signin", signin)

export default router