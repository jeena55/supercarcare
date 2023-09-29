import { Request, Response, NextFunction } from 'express';
import { prisma } from "../connections/prisma"
import { Prisma } from '@prisma/client';
import { CustomError } from '../models/custom-error.model';
import reservationCodeGenerate from "../functions/reservationCodeGenerate"

/**
 * 
 * @route /api/tickets
 * @method GET
 * @description ดึงข้อมูลตั๋วภาพยนต์ที่มีทั้งหมด
 *
 */

export const getTickets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tickets = await prisma.ticket.findMany({
            include: {
                account: true,
                seat: true,
                movieSchedule: {
                    include: {
                        movie: true,
                        theatre: true
                    }
                }
            }
        })
        res.send(tickets)
    } catch (err) {
        return next(new CustomError("ไม่สามารถดึงข้อมูลตตั๋วภาพยนต์ทั้งหมดที่มีอยู่ได้", 500))
    }
}

/**
 * 
 * @route /api/tickets/:id
 * @method GET
 * @param id รหัสของตั๋วภาพยนต์
 * @description ดึงข้อมูลตั๋วภาพยนต์จาก ID ที่ได้มา
 *
 */

export const getTicketById = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params
    if (isNaN(Number(id))) {
        return next(new CustomError("ID ต้องเป็นตัวเลขเท่านั้น", 400))
    }

    try {
        const ticket = await prisma.ticket.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                price: true,
                movieSchedule: {
                    select: {
                        id: true,
                        startTime: true,
                        movie: true,
                        theatre: true
                    },
                    include: {
                        movie: true,
                        theatre: true
                    }
                },
                reservation: true,
                seat: true,
                account: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        created_date: true,
                        updated_date: true,
                        role: true,
                        profile: true,
                    }
                },

            }
        })

        if (!ticket) {
            return next(new CustomError("ไม่พบข้อมูลตั๋วภาพยนต์ที่ต้องการ", 404))
        }

        res.send(ticket)
    } catch (err) {
        return next(new CustomError("ไม่สามารถดึงข้อมูลตตั๋วภาพยนต์ที่มีอยู่ได้", 500))
    }
}


/**
 * 
 * @route /api/tickets/:id
 * @method POST
 * @description สร้างตั๋วภาพยนต์ใหม่
 * 
 * ```
 * interface Payload {
    price : number;
    accountId : number; // ID ของผู้ที่เป็นเจ้าของตั๋ว
    scheduleId : number; // ID รอบฉาย
    seatId: number; // ID ของเลขที่นั่ง (สามารถบอกโรงภาพยนต์ได้)
   }
 * ```
 *
 * @example
 {
    "price": 150,
    "accountId": 1,
    "scheduleId": 4,
    "seatId": 45
 }
 *
 */
export const createTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { price, accountId, scheduleId, seatId } = req.body

        if (!price || !accountId || !scheduleId || !seatId) {
            return next(new CustomError("ข้อมูลไม่ครบถ้วน", 400))
        }

        const transaction = await prisma.$transaction(async (tx) => {
            const newReservation = await prisma.reservation.create({
                data: {
                    reservationCode: reservationCodeGenerate(10)
                }
            })

            if (!newReservation) {
                return next(new CustomError("ไม่สามารถสร้างการจองตั๋วภาพยนต์ใหม่ได้", 500, "เนื่องจากไม่สามารถสร้างรหัส reservation ได้"))
            }

            const newTicket = await prisma.ticket.create({
                data: {
                    price,
                    accountId,
                    scheduleId,
                    seatId,
                    reservationId: newReservation.id
                },
                select: {
                    id: true,
                    price: true,
                    movieSchedule: {
                        select: {
                            id: true,
                            startTime: true,
                            movie: true,
                            theatre: true
                        }
                    },
                    reservation: true,
                    seat: true,
                    account: {
                        select: {
                            id: true,
                            username: true,
                            email: true,
                            created_date: true,
                            updated_date: true,
                            role: true,
                            profile: true,
                        }
                    },

                }
            })

            return newTicket
        })

        res.send(transaction)

    } catch (err) {
        console.log(err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                case "P2002":
                    return next(new CustomError("ไม่สามารถสร้างตั๋วภาพยนต์ใหม่ได้", 500, "เนื่องจากมีข้อมูลการจองที่ ที่นั่ง โรงภาพยนต์ และ รอบการฉายตรงกัน"))
                default:
                    return;
            }
        }
        return next(new CustomError("ไม่สามารถสร้างตั๋วภาพยนต์ใหม่ได้", 500))
    }
}

/**
 * 
 * @route /api/tickets/:id
 * @method DELETE
 * @param id รหัสของตั๋วภาพยนต์
 * @description ลบข้อมูลตั๋วภาพยนต์จาก ID ที่ได้มา
 *
 */

export const deleteTicketById = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { id } = req.params;

        if (isNaN(Number(id))) {
            return next(new CustomError("ID ต้องเป็นตัวเลขเท่านั้น", 400))
        }

        const deletedTicket = await prisma.ticket.delete({
            where: {
                id: Number(req.params.id)
            }
        })

        res.send(deletedTicket)

    } catch (err) {
        console.log(err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                case "P2025":
                    return next(new CustomError("ไม่พบข้อมูลตั๋วภาพยนต์ที่ต้องการลบ", 404))
                default:
                    return next(new CustomError("ไม่สามารถลบข้อมูลตั๋วภาพยนต์ได้", 500));
            }
        }
        return next(new CustomError("ไม่สามารถสร้างตั๋วภาพยนต์ใหม่ได้", 500))
    }
}