import { NextFunction, Request, Response } from "express"
import { Seat } from "@prisma/client";
import { prisma } from "../connections/prisma"
import { CustomError } from "../models/custom-error.model";

/**
 * 
 * @route /api/seats/
 * @method POST
 * @description สร้าง seat ใหม่เข้าไปในระบบ
 * 
 * ```
 * interface Payload {
  number : string
  seatType :? "NORMAL" | "HONEYMOON" | "FIRSTCLASS" | "IMAX" | "FOURDX"
  theatreId : number
}
 * ```
 */

export const createSeat = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { number, seatType, theatreId } = req.body;

        if (!number || !theatreId) {
            return next(new CustomError("ข้อมูลที่นั่งไม่เพียงพอ", 400, "เกิดข้อผิดพลาดในระบบ"))
        }

        // create new Seat
        const newSeat = await prisma.seat.create({
            data: {
                number,
                theatreId,
                ...(seatType && { seatType })
            },
            include: {
                theatre: true
            }
        })

        res.send(newSeat)
        
    } catch (err) {
        console.log(err)
        next(new CustomError("ไม่สามารถสร้างที่นั่งได้", 500, "เกิดข้อผิดพลาดในระบบ"))
    }
};


/**
 * 
 * @route /api/seats/
 * @method GET
 * @description ดึงข้อมูลที่นั่งทั้งหมดที่มีอยู่
 * 
 */


export const getSeats = async (req: Request, res: Response, next: NextFunction) => {
    const seats = await prisma.seat.findMany({
        include: {
            theatre: {
                select: {
                    id: true,
                    name: true,

                }
            }
        }
    })

    res.send(seats)
};

/**
 * 
 * @route /api/seats/:id
 * @method GET
 * @param id รหัสของ Seat ที่ต้องการดึงข้อมูล
 * @description ดึงข้อมูล Seat ที่มี id ตรงกับที่ระบุ
 * 
 */

export const getSeatById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (isNaN(Number(id))) {
        return next(new CustomError("รหัสที่นั่งไม่ถูกต้อง", 400, "รหัสที่นั่งไม่ถูกต้อง ต้องรับเป้นตัวเลข"))
    }

    const seat = await prisma.seat.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            theatre: true
        }
    })

    if (!seat) {
        return next(new CustomError("ไม่พบที่นั่ง", 400, "ไม่พบที่นั่งใช้งานจาก id ดังกล่าว"))
    }

    res.send(seat)
};
