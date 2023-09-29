import express from "express"
import { getCategory, createCategory, deleteCategoryById } from "../controllers/categoryController"
import { Category } from "@prisma/client"

/**
 * @description Route นี้เป็น Route ที่เกี่ยวข้องกับการจัดการ Category
 * @see Category
 */

const router = express.Router()

router.get("/", getCategory)
router.post("/", createCategory)
router.delete("/:id", deleteCategoryById)

export default router