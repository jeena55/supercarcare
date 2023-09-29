import express from "express"
// Routes ทั้งหมด
import accountRoute from "./accountRoute"
import authenRoute from "./authenRoute"
import profileRoute from "./profileRoute"
import movieRoute from "./movieRoute"
import movieschedulesRoute from "./movieschedulesRoute"
import ticketRoute from "./ticketRoute"
import categoryRoute from "./categoryRoute"
import seatRoute from "./seatRoute"
import reservationRoute from "./reservationRoute"
import theatreRoute from "./theatreRoute"

const router = express.Router();

router.use("/authen", authenRoute)
router.use("/accounts", accountRoute)
router.use("/profiles", profileRoute)
router.use("/movies", movieRoute)
router.use("/movieschedules", movieschedulesRoute)
router.use("/seats", seatRoute)
router.use("/reservations", reservationRoute)
router.use("/categories", categoryRoute)
router.use("/theatres", theatreRoute)
router.use("/tickets", ticketRoute)


export default router;