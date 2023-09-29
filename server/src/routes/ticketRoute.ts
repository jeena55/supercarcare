import express from "express"
import { getTickets, getTicketById, createTicket, deleteTicketById } from "../controllers/ticketController"
import { Ticket } from "@prisma/client"

/**
 * @description Route นี้เป็น Route ที่เกี่ยวข้องกับการจัดการ Ticket
 * @see Ticket
 */

const router = express.Router()

router.get("/", getTickets)
router.get("/:id", getTicketById)
router.post("/", createTicket)
router.delete("/:id", deleteTicketById)

export default router