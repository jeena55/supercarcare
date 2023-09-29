import express from "express"
import { getTheatres, createTheatre, getTheatreById, deleteTheatreById } from "../controllers/theatreController"
import { Theatre } from "@prisma/client"

/**
 * @description Route นี้เป็น Route ที่เกี่ยวข้องกับการจัดการโรงภาพยนต์
 * @see Theatre
 */

const router = express.Router()

router.get("/", getTheatres)
router.get("/:id", getTheatreById)
router.post("/", createTheatre)
router.delete("/:id", deleteTheatreById)

export default router