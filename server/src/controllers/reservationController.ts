import { NextFunction, Request, Response } from "express"
import { Reservation } from "@prisma/client";
import { prisma } from "../connections/prisma"
import { CustomError } from "../models/custom-error.model";

/**
 * 
 * @route /api/reservations/
 * @method POST
 * @description สร้าง Reservation ใหม่เข้าไปในระบบ
 * 
 * ```
 * interface Payload {
  reservationCode : string
}
 * ```
 */

export const createReservation = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { reservationCode } = req.body;

        if (!reservationCode) {
            return next(new CustomError("ข้อมูลไม่เพียงพอ", 400, "เกิดข้อผิดพลาดในระบบ"))

        }

        // create new Reservation
        const newReservation = prisma.reservation.create({
            data: {
                reservationCode
            }
        })


        res.send(newReservation)
    } catch (err) {
        console.log(err)
        next(new CustomError("ข้อมูลไม่เพียงพอ", 500, "เกิดข้อผิดพลาดในระบบ"))
    }
};


/**
 * 
 * @route /api/reservations/
 * @method GET
 * @description ดึงข้อมูลที่นั่งทั้งหมดที่มีอยู่
 * 
 */


export const getReservations = async (req: Request, res: Response, next: NextFunction) => {
    const reservations = await prisma.reservation.findMany({
        include: {
            tickets: true
        }
    })

    res.send(reservations)
};

/**
 * 
 * @route /api/reservations/:id
 * @method GET
 * @param id รหัสของ reservation ที่ต้องการดึงข้อมูล
 * @description ดึงข้อมูล reservation ที่มี id ตรงกับที่ระบุ
 * 
 */

export const getReservationById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        return next(new CustomError("รหัสการจองไม่ถูกต้อง", 400, "เกิดข้อผิดพลาดในระบบ"))
    }

    const reservation = await prisma.reservation.findUnique({
        where: {
            id: Number(id)
        },
    })


    if (!reservation) {
        return next(new CustomError("ไม่พบการจอง", 400, "ไม่พบที่นั่งใช้งานจาก id ดังกล่าว"))
    }

    res.send(reservation)
};
