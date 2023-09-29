import { NextFunction, Request, Response } from "express"
import { Profile } from "@prisma/client";
import { prisma } from "../connections/prisma"
import { CustomError } from "../models/custom-error.model";

/**
 * 
 * @route /api/profiles/
 * @method POST
 * @description สร้าง Profile ใหม่เข้าไปในระบบ
 * 
 * ```
 * interface Payload {
    id: number; // id เป็นอันเดียวกับ id ของ Account
    first_name: string;
    last_name: string;
    nickname: string;
    idcard_number: string;
    phone: string;
}
 * ```
 */

export const createProfile = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { id, first_name, last_name, nickname, idcard_number, phone } = req.body;

        if (!first_name || !last_name || !nickname || !idcard_number || !phone) {
            return next(new CustomError("โปรดกรอก Profile ของผู้ใช้ให้ครบ", 400))
        }

        const existingProfile = await prisma.profile.findUnique({
            where: {
                id: id
            }
        })

        if (existingProfile?.id) {
            return next(new CustomError("id นี้มี Profile อยู่แล้ว", 400))
        }

        const newProfile = await prisma.profile.create({
            data: {
                id: id,
                first_name: first_name,
                last_name: last_name,
                nickname: nickname,
                idcard_number: idcard_number,
                phone: phone
            },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                nickname: true,
                idcard_number: true,
                phone: true,
                account: {
                    select: {
                        username: true,
                        email: true,
                    }
                },
            }
        })

        res.send(newProfile)
    } catch (err) {
        return next(new CustomError("ไม่สามารถสร้าง Profile ได้", 500))
    }

};

/**
 * 
 * @route /api/profiles/
 * @method GET
 * @description ดึงข้อมูล Profile ทั้งหมดที่มีอยู่ในระบบ
 * 
 */

export const getProfiles = async (req: Request, res: Response) => {
    const profiles = await prisma.profile.findMany({
        include: {
            account: {
                select: {
                    username: true,
                    email: true,
                }
            }
        }
    })

    res.send(profiles)
};

/**
 * 
 * @route /api/profile/:id
 * @method GET
 * @param id รหัสของ Profile ที่ต้องการดึงข้อมูล
 * @description ดึงข้อมูล Profile ที่มี id ตรงกับที่ระบุ
 * 
 */

export const getProfileById = async (req: Request, res: Response, next: NextFunction) => {
    const id: string | number = req.params.id;

    if (isNaN(Number(id))) {
        return next(new CustomError("รหัสโปรไฟล์ไม่ถูกต้อง", 400, "รหัสโปรไฟล์ไม่ถูกต้อง ต้องรับเป้นตัวเลข"))
    }

    const profile = await prisma.profile.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            account: {
                select: {
                    username: true,
                    email: true,
                }
            }
        }
    })

    if (!profile) {
        return next(new CustomError("ไม่พบโปรไฟล์", 400, "ไม่พบโปรไฟล์ผู้ใช้งานจาก id ดังกล่าว"))
    }

    res.send(profile)
};

/**
 * 
 * @route /api/profile/:id
 * @method PATCH
 * @param id รหัสของ Profile ที่ต้องการดึงข้อมูล
 * @description แก้ไขข้อมูล Profile ที่มี id ตรงกับที่ระบุ
 * 
 * ```
 * interface Payload {
    first_name ?: string;
    last_name ?: string;
    nickname ?: string;
    idcard_number ?: string;
    phone ?: string;
}
 * ```
 * 
 */

export const updateProfileById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string | number = req.params.id;

        const body = req.body;

        const checkKeyValid = (value: string): value is keyof Profile => {
            return ["first_name", "last_name", "nickname", "idcard_number", "phone"].includes(value)
        }

        // ถ้ามี key ที่ไม่มีใน inteface
        if (Object.keys(body).map(key => checkKeyValid(key)).includes(false)) {
            return next(new CustomError("ไม่สามารถแก้ไขข้อมูลได้", 400, "ไม่สามารถแก้ไขข้อมูลได้ เนื่องจากมี key ที่ไม่ถูกต้อง"))
        }


        if (isNaN(Number(id))) {
            return next(new CustomError("Profile ID ไม่ถูกต้อง", 400, "Profile ID ไม่ถูกต้อง ต้องรับเป็นตัวเลข"))
        }

        const newUpdateProfile = await prisma.profile.update({
            where: {
                id: Number(id)
            },
            data: {
                ...body
            }
        })

        res.send({ message: "แก้ไขข้อมูลสำเร็จ", status: 200, newUpdateProfile })
    } catch (err) {
        next(new CustomError("ไม่สามารถแก้ไขข้อมูลได้", 500))
    }
}