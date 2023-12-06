import express,{Router} from "express";
import ValidateResource from "../middleware/ValidateResource";
import { storeBookingSchema, storeBookingStatusSchema } from "../Schemas/booking.shema";
import { getAllStatusBooking, storeBooking, storeNewStatusBooking } from "../controllers/booking.controller";



const router:Router = express.Router();

router.post('/store',ValidateResource(storeBookingSchema),storeBooking);

router.post('/booking-status/store',ValidateResource(storeBookingStatusSchema),storeNewStatusBooking);
router.get('/all-booking-status',getAllStatusBooking);

export default router;