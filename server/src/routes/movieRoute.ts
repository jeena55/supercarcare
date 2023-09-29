import express from "express"
import { getMovies, getMovieById, createMovie , deleteMovieById } from "../controllers/movieController"
import { Movie } from "@prisma/client"

/**
 * @description Route นี้เป็น Route ที่เกี่ยวข้องกับการจัดการข้อมูลของภาพยนต์
 * @see Movie
 */

const router = express.Router()

router.get("/", getMovies)
router.post("/", createMovie)
router.get("/:id", getMovieById)
router.delete("/:id", deleteMovieById)

// router.patch("/:id", updateMovieById)

// Todo : Patch Movie

export default router