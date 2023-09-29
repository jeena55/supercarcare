import { NextFunction, Request, Response } from "express"
import { Movie } from "@prisma/client";
import { prisma } from "../connections/prisma"
import { Prisma } from "@prisma/client";
import { CustomError } from "../models/custom-error.model";

/**
 * 
 * @route /api/movies/
 * @method POST
 * @description สร้างภาพยนต์ใหม่เข้าไปในระบบ
 * 
 * ```
 * interface Payload {
    title: string;
    duration: number;
    synopsis ?: string;
    imageUrl ?: string;
    trailerUrl ?: string;
    categoryIds ?: number[]; // เป็น ID ของ category ที่ต้องการเชื่อมโยง
    previewURL ?: string;
}
 * ```
 *
 * @example
 * {
    "title":"Movie title 6",
    "duration": 120,
    "synopsis": "Some cool movie description goes here",
    "imageUrl": "http://movie.poster.com/movie-poster",
    "trailerUrl": "http://movie.trailer.com/movie-trailer",
    "categoryIds": [1,3],
    "previewURL": "http://movie.preview.com/movie-preview"
}
 */

export const createMovie = async (req: Request, res: Response, next: NextFunction) => {

    interface CreateMoviePayload {
        title: string;
        duration: number;
        synopsis: string;
        imageUrl: string;
        trailerUrl: string;
        categoryIds?: number[]; // เป็น ID ของ category ที่ต้องการเชื่อมโยง
        previewURL?: string;
    }

    try {

        const { title, duration, synopsis, imageUrl, trailerUrl, categoryIds, previewURL }: CreateMoviePayload = req.body;

        if (!title || !duration) {
            return next(new CustomError("ไม่สามารถสร้างภาพยนต์ได้", 400, "กรุณากรอกข้อมูลให้ครบถ้วน"))
        }

        const hasCategoryIds = Array.isArray(categoryIds) && !categoryIds.some((id: number) => isNaN(id))

        // create new Movies
        const newMovie = prisma.movie.create({
            data: {
                title,
                duration,
                synopsis,
                imageUrl,
                trailerUrl,
                ...({ previewURL: previewURL }),
                movieCategories: {
                    createMany: {
                        data: hasCategoryIds ? categoryIds.map(categoryId => ({ categoryId })) : []
                    }
                }
            },
            include: {
                movieCategories: {
                    include: {
                        category: true,
                    }
                }
            }
        })

        const transaction = await prisma.$transaction([newMovie])

        res.send(transaction)


    } catch (err) {

        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                case "P2003":
                    return next(new CustomError("ไม่สามารถสร้างภาพยนต์ได้", 400, "ไม่พบรหัส Category ดังกล่าว"))
                default:
                    return;
            }
        }

        next(new CustomError("ไม่สามารถสร้างภาพยนต์ได้", 500, "เกิดข้อผิดพลาดในระบบ"))
    }
};

/**
 * 
 * @route /api/movies/
 * @method GET
 * @description ดึงข้อมูลภาพยนต์ทั้งหมดที่มีอยู่
 * 
 */

export const getMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accounts = await prisma.movie.findMany({
            include: {
                movieCategories: {
                    include: {
                        category: true
                    }
                }
            }
        })

        res.send(accounts)
    } catch (err) {
        return next(new CustomError("ไม่สามารถดึงข้อมูลของภาพยนต์ได้", 500, "เกิดข้อผิดพลาดในระบบ"))
    }
};

/**
 * 
 * @route /api/movies/:id
 * @method GET
 * @param id รหัสของภาพยนต์ที่ต้องการดึงข้อมูล
 * @description ดึงข้อมูลภาพยนต์ที่มี id ตรงกับที่ระบุ
 * 
 */

export const getMovieById = async (req: Request, res: Response, next: NextFunction) => {
    const id: string | number = req.params.id;

    if (isNaN(Number(id))) {
        return next(new CustomError("รหัสภาพยนต์ไม่ถูกต้อง", 400, "รหัสภาพยนต์ไม่ถูกต้อง ต้องรับเป้นตัวเลข"))
    }

    const movie = await prisma.movie.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            movieCategories: {
                include: {
                    category: true
                }
            }
        }
    })

    if (!movie) {
        return next(new CustomError("ไม่พบภาพยนต์", 400, "ไม่พบภาพยนต์จากรหัสภาพยนต์ดังกล่าว"))
    }

    res.send(movie);
};

/**
 * 
 * @route /api/movies
 * @method DELETE
 * @description ลบ Movie จากระบบ
 * @param id รหัสของภาพยนต์ที่ต้องการลบ
 *
 */

export const deleteMovieById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!id) {
            return next(new CustomError("ไม่สามารถลบภาพยนต์ได้", 400, "โปรดกรอกข้อมูล id ด้วย"))
        }

        const deletedMovie = await prisma.movie.delete({
            where: {
                id: Number(id)
            },
            include: {
                movieCategories: {
                    include: {
                        category: true,
                    }
                }
            }
        })

        res.send(deletedMovie)

    } catch (err) {
        return next(new CustomError("ไม่สามารถลบภาพยนต์ได้", 500))
    }
}