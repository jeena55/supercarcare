import { PrismaClient, Seat } from '@prisma/client'
import seatGenerate from '../src/functions/seatGenerate'

const prisma = new PrismaClient()

async function main() {
    const newAccounts = await prisma.account.createMany({
        data: [{
            username: "supakorn_kub",
            password: "password",
            email: "64070108@it.kmitl.ac.th",
        }, {
            username: "Johncena",
            password: "john123",
            email: "johncena@it.kmitl.ac.th",
        }, {
            username: "P'Best",
            password: "xxxxxxxx",
            email: "bestnut@gmail.com",
            role: "ADMIN",
        }, {
            username: "P'Earth",
            password: "xxxxxxxx",
            email: "earthnut@gmail.com",
        }, {
            username: "P'Kub",
            password: "xxxxxxxx",
            email: "kubnut@gmail.,com",
        }, {
            username: "Tinz",
            password: "xxxxxxxx",
            email: "tinz@gmail.com  ",
        }, {
            username: "Mai",
            password: "xxxxxxxx",
            email: "mai@gmail.com",
        }, {
            username: "Trai",
            password: "xxxxxxxx",
            email: "trai@gmail.com",
        }, {
            username: "Non",
            password: "xxxxxxxx",
            email: "non@gmail.com",
        }, {
            username: "Lux",
            password: "xxxxxxxx",
            email: "lux@gmail.com"
        },
        ]
    });

    // ตาม usecase ที่เกิดขึ้นแบบ async กัน
    const newProfile = await prisma.profile.createMany({
        data: [{
            id: 1,
            first_name: "Supakorn",
            last_name: "Netsuwan",
            nickname: "Earth",
            idcard_number: "1234567890123",
            phone: "0987654321",
        }, {
            id: 2,
            first_name: "Johncema",
            last_name: "cena",
            nickname: "John",
            idcard_number: "2412412",
            phone: "089942912",
        }, {
            id: 3,
            first_name: "Cool",
            last_name: "Admin",
            nickname: "Mhukrob",
            idcard_number: "64124070242",
            phone: "0948281284",
        }, {
            id: 4,
            first_name: "Phuri",
            last_name: "Siripool",
            nickname: "Earth",
            idcard_number: "64124070243",
            phone: "0948281285",
        }, {
            id: 5,
            first_name: "Poom",
            last_name: "Kirdin",
            nickname: "Poom",
            idcard_number: "64124070244",
            phone: "0948281286",
        }, {
            id: 6,
            first_name: "Tinnaphoom",
            last_name: "Kirdin",
            nickname: "Tinz",
            idcard_number: "64124070245",
            phone: "0948281287",
        }, {
            id: 7,
            first_name: "Sasithorn",
            last_name: "Srijun",
            nickname: "Mai",
            idcard_number: "64124070246",
            phone: "0948281288",
        }, {
            id: 8,
            first_name: "Trai",
            last_name: "Traitum",
            nickname: "Saengdoun",
            idcard_number: "64124070247",
            phone: "0948281289",
        }, {
            id: 9,
            first_name: "Nantanon",
            last_name: "Rashford",
            nickname: "Non",
            idcard_number: "64124070248",
            phone: "0948281290",
        }, {
            id: 10,
            first_name: "Thanyathep",
            last_name: "Inrung",
            nickname: "Lux",
            idcard_number: "64124070249",
            phone: "0948281291",
        }]
    })

    const newMovies = await prisma.movie.createMany({
        data: [{
            title: "Johnwick 4",
            synopsis: "Johnwick 4 is cool and nice movie",
            duration: 120,
            imageUrl: "https://www.themoviedb.org/t/p/w1280/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
            trailerUrl: "https://www.youtube.com/embed/cYX2_lDYZpI?enablejsapi=1&autoplay=1&mute=0",
            previewURL: "https://images.thedirect.com/media/article_full/john-wick-4-cast-characters-keanu-reeves.jpg",
        }, {
            title: "Transformer 2",
            synopsis: "Transformer 2 is cool and nice movie, You should watch in 2014",
            duration: 150,
            imageUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pLBb0whOzVDtJvyD4DPeQyQNOqp.jpg",
            trailerUrl: "https://www.youtube.com/embed/fnXzKwUgDhg?enablejsapi=1&autoplay=1&mute=0",
        }, {
            title: "Green book",
            synopsis: "Green book is a movie which you should watch before your life have ended",
            duration: 140,
            imageUrl: "https://www.themoviedb.org/t/p/w1280/7BsvSuDQuoqhWmU2fL7W2GOcZHU.jpg",
            trailerUrl: "https://www.youtube.com/embed/QkZxoko_HC0?enablejsapi=1&autoplay=1&mute=0",
            previewURL: "https://ntvb.tmsimg.com/assets/p15674164_v_h8_aq.jpg?w=1280&h=720",
        }, {
            title: "Avengers Endgame",
            synopsis: "Avengers Endgame is a movie which you should watch before your life have ended",
            duration: 140,
            imageUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
            trailerUrl: "https://www.youtube.com/embed/hA6hldpSTF8?enablejsapi=1&autoplay=1&mute=0",
            previewURL: "https://www.blognone.com/sites/default/files/externals/78e374719da18013293fd176cec240ed.jpg",
        }, {
            title: "La La Land",
            synopsis: "La La Land is a movie which you should watch before your life have ended",
            duration: 140,
            imageUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
            trailerUrl: "https://www.youtube.com/embed/je0aAf2f8XQ?enablejsapi=1&autoplay=1&mute=0",
            previewURL: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f8b2ef92655071.5e505bf7132ab.png",
        }, {
            title: "Fantastic beast and Where to find them",
            synopsis: "fantastic beast is a movie which you should watch before your life have ended",
            duration: 140,
            imageUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/h6NYfVUyM6CDURtZSnBpz647Ldd.jpg",
            trailerUrl: "https://www.youtube.com/embed/ViuDsy7yb8M?enablejsapi=1&autoplay=1&mute=0",

        }, {
            title: "last christmas",
            synopsis: "last christmas is a movie which you should watch before your life have ended",
            duration: 140,
            imageUrl: "https://www.themoviedb.org/t/p/w1280/kDEjffiKgjuGo2DRzsqfjvW0CQh.jpg",
            trailerUrl: "https://www.youtube.com/embed/z9CEIcmWmtA?enablejsapi=1&autoplay=1&mute=0",
        }, {
            title: "jexi",
            synopsis: "jexi is a movie which you should watch before your life have ended",
            duration: 140,
            imageUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pdYhXJPoV0Kvwdih74lejHPTyWL.jpg",
            trailerUrl: "https://www.youtube.com/embed/EtpBbRsNr-M?enablejsapi=1&autoplay=1&mute=0",
            previewURL: "https://metadata-static.plex.tv/4/gracenote/4fb19de2e336e027e445ab9dd82c0ffd.jpg",
        }, {
            title: "Your name",
            synopsis: "your name is a movie which you should watch before your life have ended",
            duration: 140,
            imageUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/q719jXXEzOoYaps6babgKnONONX.jpg",
            trailerUrl: "https://www.youtube.com/embed/xU47nhruN-Q?enablejsapi=1&autoplay=1&mute=0",
        }, {
            title: "Madagascar",
            synopsis: "madagascar is a movie which you should watch before your life have ended",
            duration: 140,
            imageUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/zMpJY5CJKUufG9OTw0In4eAFqPX.jpg",
            trailerUrl: "https://www.youtube.com/embed/adPvbscBK_8?enablejsapi=1&autoplay=1&mute=0",
        },
        ]
    })

    const newCategories = await prisma.category.createMany({
        data: [{
            name: "Action",
        }, {
            name: "Comedy",
        }, {
            name: "Horror",
        }, {
            name: "Romance",
        }, {
            name: "Sci-fi",
        }, {
            name: "Thriller",
        }, {
            name: "Drama",
        }, {
            name: "Adventure",
        }, {
            name: "Fantasy",
        }, {
            name: "Mystery",
        },
        ]
    })

    const MovieCategory = await prisma.movieCategory.createMany({
        data: [{
            movieId: 1,
            categoryId: 1.
        }, {
            movieId: 1,
            categoryId: 2.
        }, {
            movieId: 2,
            categoryId: 1.
        }, {
            movieId: 2,
            categoryId: 3.
        }, {
            movieId: 3,
            categoryId: 4.
        }, {
            movieId: 4,
            categoryId: 5.
        }, {
            movieId: 5,
            categoryId: 1.
        }, {
            movieId: 6,
            categoryId: 6.
        }, {
            movieId: 7,
            categoryId: 9.
        }, {
            movieId: 8,
            categoryId: 5.
        }, {
            movieId: 9,
            categoryId: 7.
        }, {
            movieId: 10,
            categoryId: 8.
        }]
    })

    const newTheatres = await prisma.theatre.createMany({
        data: [{
            name: "1A",
            theatreType: "FOURD"
        }, {
            name: "1B",
            theatreType: "TWOD"
        }, {
            name: "2A",
            theatreType: "FOURD"
        }, {
            name: "2B",
            theatreType: "TWOD"
        }, {
            name: "3A",
            theatreType: "IMAX"
        }, {
            name: "3B",
            theatreType: "TWOD"
        }, {
            name: "4A",
            theatreType: "TWOD"
        }, {
            name: "4B",
            theatreType: "THREED"
        }, {
            name: "5A",
            theatreType: "TWOD"
        }, {
            name: "5B",
            theatreType: "THREED"
        }]
    })

    // ที่หนังของโรงภาพยนต์ 1
    const newSeatsTheatre1 = await prisma.seat.createMany({
        data: seatGenerate(1, 50) as Seat[]
    })

    // ที่หนังของโรงภาพยนต์ 2
    const newSeatsTheatre2 = await prisma.seat.createMany({
        data: seatGenerate(2, 40) as Seat[]
    })

    // รอบของโรงภาพยนต์ 1
    const newMovieSchedule = await prisma.movieSchedule.createMany({
        data: [{
            movieId: 1,
            theatreId: 1,
            startTime: new Date("2021-05-01 10:00:00"),
        }, {
            movieId: 1,
            theatreId: 1,
            startTime: new Date("2021-05-01 13:00:00"),
        }, {
            movieId: 1,
            theatreId: 1,
            startTime: new Date("2021-05-01 16:00:00"),
        }, {
            movieId: 2,
            theatreId: 2,
            startTime: new Date("2021-05-01 10:00:00"),
        }, {
            movieId: 2,
            theatreId: 2,
            startTime: new Date("2021-05-01 13:00:00"),
        }, {
            movieId: 2,
            theatreId: 2,
            startTime: new Date("2021-05-01 16:00:00"),
        }, {
            movieId: 3,
            theatreId: 3,
            startTime: new Date("2021-05-01 10:00:00"),
        }, {
            movieId: 3,
            theatreId: 3,
            startTime: new Date("2021-05-01 13:00:00"),
        }, {
            movieId: 3,
            theatreId: 3,
            startTime: new Date("2021-05-01 16:00:00"),
        }, {
            movieId: 4,
            theatreId: 4,
            startTime: new Date("2021-05-01 10:00:00"),
        },
        ]
    })

    const newReservation = await prisma.reservation.createMany({
        data: [{
            reservationCode: "10ABSFFA@!",
        }, {
            reservationCode: "11ABSFS@!",
        }, {
            reservationCode: "12ABLSW@!",
        }, {
            reservationCode: "13ABCCL1@%",
        }, {
            reservationCode: "14ABCC@!",
        }, {
            reservationCode: "15ABCC@!",
        }, {
            reservationCode: "16ABCC@!",
        }, {
            reservationCode: "17ABCC@!",
        }, {
            reservationCode: "18ABCC@!",
        }, {
            reservationCode: "19ABCC@!",
        }]
    })

    const newTickets = await prisma.ticket.createMany({
        data: [{
            price: (await prisma.seat.findUnique({ where: { id: 12 } }))?.price || 0,
            accountId: 1,
            scheduleId: 1,
            seatId: 12,
            reservationId: 1,
        }, {
            price: (await prisma.seat.findUnique({ where: { id: 13 } }))?.price || 0,
            accountId: 1,
            scheduleId: 1,
            seatId: 13,
            reservationId: 1,
        }, {
            price: (await prisma.seat.findUnique({ where: { id: 12 } }))?.price || 0,
            accountId: 1,
            scheduleId: 2,
            seatId: 12,
            reservationId: 2,
        }, {
            price: (await prisma.seat.findUnique({ where: { id: 13 } }))?.price || 0,
            accountId: 2,
            scheduleId: 3,
            seatId: 13,
            reservationId: 3,
        }, {
            price: (await prisma.seat.findUnique({ where: { id: 14 } }))?.price || 0,
            accountId: 2,
            scheduleId: 3,
            seatId: 14,
            reservationId: 3,
        }, {
            price: (await prisma.seat.findUnique({ where: { id: 15 } }))?.price || 0,
            accountId: 2,
            scheduleId: 3,
            seatId: 15,
            reservationId: 3,
        }, {
            price: (await prisma.seat.findUnique({ where: { id: 12 } }))?.price || 0,
            accountId: 3,
            scheduleId: 4,
            seatId: 12,
            reservationId: 4,
        }, {
            price: (await prisma.seat.findUnique({ where: { id: 13 } }))?.price || 0,
            accountId: 3,
            scheduleId: 4,
            seatId: 13,
            reservationId: 4,
        }, {
            price: (await prisma.seat.findUnique({ where: { id: 14 } }))?.price || 0,
            accountId: 3,
            scheduleId: 4,
            seatId: 14,
            reservationId: 4,
        }, {
            price: (await prisma.seat.findUnique({ where: { id: 15 } }))?.price || 0,
            accountId: 3,
            scheduleId: 4,
            seatId: 15,
            reservationId: 4,
        },
        ]
    })

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })