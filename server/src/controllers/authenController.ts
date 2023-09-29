import { NextFunction, Request, Response } from "express"
import { Account } from "@prisma/client";
import { prisma } from "../connections/prisma"
import { CustomError } from "../models/custom-error.model";

/**
 * 
 * @route /api/authen/signin
 * @method POST
 * @description ผู้ใช้ Signin เข้าสู่ระบบ
 * ```
 * interface Payload {
    email : string,
    password : string
   }
 * ```
 */

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password }: { email: string, password: string } = req.body

    if (!email || !password) {
      return next(new CustomError("ไม่สามารถเข้าสู่ระบบได้", 400, "โปรดกรอก email และ password ให้ครบถ้วน"))
    }

    const user = await prisma.account.findUnique({
      where: { email },
      include: {
        profile:true
      }
    })

    if (!user) {
      return next(new CustomError("ไม่พบผู้ใช้งานนี้ในระบบ", 400, "โปรดตรวจสอบอีเมบ"))
    }

    if (user.password != password) {
      return next(new CustomError("รหัสผ่านไม่ถูกต้อง", 400, "โปรดตรวจสอบรหัสผ่าน"))
    }

    user.password = "------"
    res.send(user)
  } catch (err) {
    return next(new CustomError("ไม่สามารถเข้าสู่ระบบได้", 500))
  }
}