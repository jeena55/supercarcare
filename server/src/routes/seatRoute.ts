import express from "express"
import { Seat } from "@prisma/client"
import { createSeat, getSeats, getSeatById } from "../controllers/seatController"


/**
 * @description Route นี้เป็น Route ที่เกี่ยวข้องกับการ Seat
 * @see Seat
 */

const router = express.Router()

router.get("/", getSeats)
router.post("/", createSeat)
router.get("/:id", getSeatById)


export default router