import express from "express"
import { getMovieSchedules, getMovieSchedule, createMovieSchedule, deleteMovieSchedule } from "../controllers/movieSchedulesController"
import { MovieSchedule } from "@prisma/client"

/**
 * @description Route นี้เป็น Route ที่เกี่ยวข้องกับการดึงข้อมูลของ Movie Schedule ซึ่งเป็ยตารางฉายภาพยนต์
 * @see MovieSchedule
 */

const router = express.Router()

router.get("/", getMovieSchedules)
router.get("/:id", getMovieSchedule)
router.post("/", createMovieSchedule)
router.delete("/:id", deleteMovieSchedule)

export default router