import express from "express"
import { Profile } from "@prisma/client"
import { createProfile, getProfileById, getProfiles, updateProfileById } from "../controllers/profileController"

/**
 * @description Route นี้เป็น Route ที่เกี่ยวข้องกับการดึงข้อมูลของ Profile ซึ่งมันคือข้อมูลส่วนตัวของผู้ใช้งาน
 * @see Profile
 */

const router = express.Router()

router.get("/", getProfiles)
router.post("/", createProfile)
router.get("/:id", getProfileById)
router.patch("/:id", updateProfileById)

export default router