import { NextFunction, Request, Response } from "express"
import { Seat, Theatre } from "@prisma/client";
import { prisma } from "../connections/prisma"
import { CustomError } from "../models/custom-error.model";
import seatGenerate from "../functions/seatGenerate";

/**
 * 
 * @route /api/theatres
 * @method GET
 * @description ดึงข้อมูลโรงภาพยนต์ทั้งหมดที่มีอยู่
 *
 */

export const getTheatres = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const theatres = await prisma.theatre.findMany({
            include: {
                seats: true,
                movieSchedules: true
            }
        })
        res.send(theatres)
    } catch (err) {
        return next(new CustomError("ไม่สามารถดึงข้อมูลโรงภาพยนต์ได้", 500))
    }
}



/**
 * 
 * @route /api/theatres/:id
 * @method GET
 * @description ดึงข้อมูลโรงภาพยนต์ตาม id ที่ระบุ
 * @param id รหัสของโรงภาพยนต์ที่ต้องการดึงข้อมูล
 *
 */

export const getTheatreById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!id) {
            return next(new CustomError("ไม่สามารถดึงข้อมูลของโรงภาพยนต์ได้", 400, "โปรดระบุ id ของโรงภาพยนต์"))
        }

        const theare = await prisma.theatre.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                seats: true,
                movieSchedules: true
            }
        })

        if (!theare) {
            return next(new CustomError("ไม่สามารถดึงข้อมูลของโรงภาพยนต์ได้", 400, "ไม่พบโรงภาพยนต์ที่มี id ดังกล่าว"))
        }

        res.send(theare)

    } catch (err) {
        return next(new CustomError("ไม่สามารถดึงข้อมูลของโรงภาพยนต์ได้", 500))
    }
}


/**
 * 
 * @route /api/theatres
 * @method POST
 * @description สร้างโรงภาพยนต์ใหม่
 * 
 * ```
 * interface Payload {
    name : string;
    theatreType ?: "TWOD" | "THREED" | "FOURD" | "IMAX";
    seatAmount : number; // จำนวนของที่นั่ง เช่น 20, 30, 40
   }
 * ```
 *
 * @example
 {
    "name": "Theatre name",
    "theatreType": "IMAX",
    "seatAmount": 220
}
 */

export const createTheatre = async (req: Request, res: Response, next: NextFunction) => {
    const { name, theatreType, seatAmount } = req.body

    if (!name || !seatAmount) return next(new CustomError("ไม่สามารถสร้างโรงภาพยนต์ได้", 400, "โปรดระบุข้อมูลให้ครบถ้วน"))

    try {

        const newTheatre = await prisma.theatre.create({
            data: {
                name: name,
                theatreType: theatreType,
                seats: {
                    createMany: {
                        data: seatGenerate(null, seatAmount) as Seat[]
                    }
                }
            },
            include: {
                seats: true
            }
        })

        res.send(newTheatre)

    } catch (err) {
        return next(new CustomError("ไม่สามารถสร้างโรงภาพยนต์ได้", 500))
    }
}


/**
 * 
 * @route /api/theatres/:id
 * @method DELETE
 * @description ลบ Movie จากระบบ
 * @param id รหัสของภาพยนต์ที่ต้องการลบ
 *
 */

export const deleteTheatreById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!id) {
            return next(new CustomError("ไม่สามารถลบโรงภาพยนต์ได้", 400, "โปรดกรอกข้อมูล id ด้วย"))
        }

        const deletedTheatre = await prisma.theatre.delete({
            where: {
                id: Number(id)
            }
        })

        res.send(deletedTheatre)

    } catch (err) {
        return next(new CustomError("ไม่สามารถลบโรงภาพยนต์ได้", 500))
    }
}