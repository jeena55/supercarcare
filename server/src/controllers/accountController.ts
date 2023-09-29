import { NextFunction, Request, Response } from "express"
import { Account } from "@prisma/client";
import { prisma } from "../connections/prisma"
import { CustomError } from "../models/custom-error.model";

/**
 * 
 * @route /api/accounts/
 * @method POST
 * @description สร้าง Account ใหม่เข้าไปในระบบ
 * 
 * ```
 * interface Payload {
    username: string;
    password: string;
    email: string;
    role ?: "ADMIN" | "USER";

}
 * ```
 */

export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email, role } = req.body;

    if (!username || !password || !email) {
        return next(new CustomError("กรุณากรอกข้อมูลให้ครบถ้วน", 400, "ข้อมูลไม่ครบถ้วน"))
    }

    if (role) {
        if (role !== "ADMIN" && role !== "USER") {
            return next(new CustomError("Role ไม่ถูกต้อง", 400, "Role ไม่ถูกต้อง"))
        }
    }

    const existedAccount = await prisma.account.findFirst({
        where: {
            email: email
        }
    })

    // ถ้ามีอยู่แล้วก็สมัครไม่ได้
    if (existedAccount?.email) {
        console.log(existedAccount)
        return next(new CustomError("มีผู้ใช้อีเมลนี้ไปแล้ว", 400, "โปรดเปลี่ยนอีเมล"))
    }

    const transaction = await prisma.$transaction(async (tx) => {
        // ที่เป็น prisma.profile เพราะว่าเราต้องการสร้าง profile ด้วย แต่ว่าเราไม่สามารถ nested write จาก prisma.account.create ได้
        const newAccount = await prisma.account.create({
            data: {
                username: username,
                password: password,
                email: email,
                ...(role && { role: role })
            },
            select: {
                username: true,
                email: true,
                id: true,
                created_date: true,
                updated_date: true,
                role: true,
            }
        })

        const newProfile = await prisma.profile.create({
            data: {
                id: newAccount.id,
                first_name: "",
                last_name: "",
                nickname: "",
                idcard_number: "",
                phone: ""
            }
        })

        return { ...newAccount, profile: newProfile }
    })

    res.send(transaction)
};

/**
 * 
 * @route /api/accounts/
 * @method GET
 * @description ดึงข้อมูล Account ทั้งหมดที่มีอยู่ในระบบ
 * 
 */

export const getAccounts = async (req: Request, res: Response) => {

    const accounts = await prisma.account.findMany({
        select: {
            username: true,
            email: true,
            id: true,
            created_date: true,
            updated_date: true,
            role: true
        }
    })

    res.send(accounts)
};

/**
 * 
 * @route /api/accounts/:id
 * @method GET
 * @param id รหัสของ Account ที่ต้องการดึงข้อมูล
 * @description ดึงข้อมูล Account ที่มี id ตรงกับที่ระบุ
 * 
 */

export const getAccountById = async (req: Request, res: Response, next: NextFunction) => {
    const id: string | number = req.params.id;

    if (isNaN(Number(id))) {
        return next(new CustomError("รหัสบัญชีไม่ถูกต้อง", 400, "รหัสบัญชีไม่ถูกต้อง ต้องรับเป้นตัวเลข"))
    }

    const account = await prisma.account.findUnique({
        where: {
            id: parseInt(id)
        },
        select: {
            profile: true,
            username: true,
            email: true,
            id: true,
            created_date: true,
            updated_date: true,
            role: true
        }
    })

    if (!account) {
        return next(new CustomError("ไม่พบบัญชี", 400, "ไม่พบบัญชีผู้ใช้งานจาก id ดังกล่าว"))
    }

    res.send(account);
};


/**
 * 
 * @route /api/accounts/:id
 * @method PATCH
 * @param id รหัสของ Account ที่ต้องการดึงข้อมูล
 * @description แก้ไขข้อมูล Account ที่มี id ตรงกับที่ระบุ
 * 
 * ```
 * interface Payload {
    username ?: string;
    password ?: string;
    email ?: string;
    role ?: "ADMIN" | "USER";
}
 * ```
 * 
 */


export const updateAccountById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string | number = req.params.id;

        const body = req.body;

        const checkKeyValid = (value: string): value is keyof Account => {
            return ["username", "password", "email", "role"].includes(value);
        };

        // ถ้ามี key ที่ไม่มีใน inteface
        if (Object.keys(body).map(key => checkKeyValid(key)).includes(false)) {
            return next(new CustomError("ไม่สามารถแก้ไขข้อมูลได้", 400, "ไม่สามารถแก้ไขข้อมูลได้ เนื่องจากมี key ที่ไม่ถูกต้อง"))
        }

        if (isNaN(Number(id))) {
            return next(new CustomError("Account ID ไม่ถูกต้อง", 400, "Account ID ไม่ถูกต้อง ต้องรับเป็นตัวเลข"))
        }


        const newUpdateAccount = await prisma.account.update({
            where: {
                id: Number(id)
            },
            data: {
                ...body
            },
            include: {
                profile: true
            }
        })

        res.send({ message: "แก้ไขข้อมูลสำเร็จ", status: 200, newUpdateAccount })
    } catch (err) {
        next(new CustomError("ไม่สามารถแก้ไขข้อมูลได้", 500))
    }
}