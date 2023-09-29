import express from "express"
import { createAccount, getAccounts, getAccountById, updateAccountById } from "../controllers/accountController"
import { Account } from "@prisma/client"

/**
 * @description Route นี้เป็น Route ที่เกี่ยวข้องกับการดึงข้อมูลของ Account ซึ่งเป็นบัญชีของผู้ใช้งาน
 * @see Account
 */

const router = express.Router()

router.get("/", getAccounts)
router.post("/", createAccount)
router.get("/:id", getAccountById)
router.patch("/:id", updateAccountById)

export default router