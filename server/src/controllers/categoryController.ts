import { NextFunction, Request, Response } from "express"
import { Category } from "@prisma/client";
import { prisma } from "../connections/prisma"
import { CustomError } from "../models/custom-error.model";

/**
 * 
 * @route /api/categories
 * @method GET
 * @description ดึงข้อมูล Category ทั้งหมดที่มีอยู่
 *
 */

export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await prisma.category.findMany()
        res.send(category)
    } catch (err) {
        return next(new CustomError("ไม่สามารถดึงข้อมูล Category ได้", 500))
    }
}

/**
 * 
 * @route /api/categories
 * @method POST
 * @description สร้าง category ใหม่
 * 
 * ```
 * interface Payload {
    name: string;
   }
 * ```
 *
 */

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;

        if (!name) {
            return next(new CustomError("ไม่สามารถสร้าง Category ใหม่ได้", 400, "โปรดกรอกข้อมูลมาให้ครบ"))
        }

        const newCategory = await prisma.category.create({
            data: {
                name
            }
        })

        res.send(newCategory)

    } catch (err) {
        return next(new CustomError("ไม่สามารถสร้าง Category ใหม่ได้", 500))
    }
}

/**
 * 
 * @route /api/categories/:id
 * @method DELETE
 * @description ลบ category
 * @param id รหัสของ Category ที่ต้องการลบ
 *
 */

export const deleteCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!id) {
            return next(new CustomError("ไม่สามารถลบ Category ได้", 400, "โปรดกรอกข้อมูล id ด้วย"))
        }

        const newCategory = await prisma.category.delete({
            where: {
                id: Number(id)
            }
        })

        res.send(newCategory)
    } catch (err) {
        return next(new CustomError("ไม่สามารถลบ Category ได้", 500))
    }
}