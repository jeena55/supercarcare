import express from "express"
import { Reservation } from "@prisma/client"
import { createReservation, getReservations, getReservationById } from "../controllers/reservationController"

/**
 * @description Route นี้เป็น Route ที่เกี่ยวข้องกับการ Reservation
 * @see Reservation
 */

const router = express.Router()

router.get("/", getReservations)
router.post("/", createReservation)
router.get("/:id", getReservationById)


export default router