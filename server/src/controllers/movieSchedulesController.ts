import { NextFunction, Request, Response } from "express"
import { MovieSchedule, Prisma } from "@prisma/client";
import { prisma } from "../connections/prisma"
import { CustomError } from "../models/custom-error.model";


/**
 * 
 * @route /api/movieschedules
 * @method GET
 * @description ดึงข้อมูลตารางการฉายภาพยนต์ทั้งหมดที่มีอยู่
 *
 */

export const getMovieSchedules = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await prisma.movieSchedule.findMany({
            include: {
                movie: true,
                theatre: true
            }
        })
        res.send(category)
    } catch (err) {
        return next(new CustomError("ไม่สามารถดึงข้อมูลตารางการฉายภาพยนต์ทั้งหมดที่มีอยู่ได้", 500))
    }
}

/**
 * 
 * @route /api/movieschedules
 * @method GET
 * @description ดึงข้อมูลตารางการฉายภาพยนต์ทั้งหมดที่มีอยู่
 *
 */

export const getMovieSchedule = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    if (isNaN(Number(id))) {
        return next(new CustomError("id ต้องเป็นตัวเลขเท่านั้น", 400))
    }

    try {
        const category = await prisma.movieSchedule.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                movie: true,
                theatre: true
            }
        })

        if (!category) {
            return next(new CustomError("ไม่พบข้อมูลตารางการฉายภาพยนต์ที่ต้องการ", 404))
        }

        res.send(category)
    } catch (err) {
        return next(new CustomError("ไม่สามารถดึงข้อมูลตารางการฉายภาพยนต์ทั้งหมดที่มีอยู่ได้", 500))
    }
}

/**
 * 
 * @route /api/movieschedules/
 * @method POST
 * @description สร้างตารางฉายภาพยนต์ใหม่เข้าไปในระบบ
 * 
 * ```
 * interface Payload {
      startTime : Date,
      movieId : number,
      theatreId : number,
   }
 * ```
 * @example
 * ```
 * {
 *    "startTime": "2021-08-01T12:30:00Z",
 *    "movieId": 1,
 *    "theatreId": 1
 * }
 * ```
 */

export const createMovieSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
        interface createMovieSchedulePayload {
            startTime: Date,
            movieId: number,
            theatreId: number,
        }

        const { startTime, movieId, theatreId }: createMovieSchedulePayload = req.body

        console.log(new Date(startTime), movieId, theatreId)

        if (!startTime || !movieId || !theatreId) {
            return next(new CustomError("โปรดส่งข้อมูลที่จำเป็นให้ครบถ้วน", 400))
        }

        if (!(new Date(startTime) instanceof Date)) {
            return next(new CustomError("รูปแบบของวันที่ไม่ถูกต้อง", 400))
        }

        const newMovieSchedule = await prisma.movieSchedule.create({
            data: {
                startTime,
                movieId,
                theatreId
            },
            include: {
                movie: true,
                theatre: true
            }
        })

        res.send(newMovieSchedule)
    } catch (err) {
        return next(new CustomError("ไม่สามารถสร้างตารางฉายภาพยนต์ใหม่เข้าไปในระบบได้", 500, "โปรดตรวจสอบข้อมูลที่ส่งมาให้ถูกต้อง"))
    }
}


/**
 * 
 * @route /api/movieschedules/:id
 * @method DELETE
 * @description ลบตารางฉายภาพยนต์ใหม่เข้าไปในระบบ
 * @param id รหัสตารางการฉายภาพยนต์
 */

export const deleteMovieSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const deleteMovieSchedule = await prisma.movieSchedule.delete({
            where: {
                id: Number(id)
            }
        })

        res.send(deleteMovieSchedule)

    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                case 'P2025':
                    return next(new CustomError("ไม่สามารถลบตารางฉายภาพยนต์ในระบบได้", 500, "ไม่พบไอดีของรอบฉายภาพยนต์ที่ต้องการลบ"))
                default:
                    return;
            }
        }

        return next(new CustomError("ไม่สามารถลบตารางฉายภาพยนต์ในระบบได้", 500, "โปรดตรวจสอบข้อมูลที่ส่งมาให้ถูกต้อง"))
    }
}