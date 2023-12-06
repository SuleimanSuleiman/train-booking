import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";

export const storeNewStatusBookingService = (
    payload: Prisma.booking_statusCreateInput
) => (
    prisma.booking_status.create({
        data: payload
    })
)

export const getAllStatusBookingService = () => prisma.booking_status.findMany()

export const storeNewBookingService = (
    payload: any
    ) => {

        const data:Prisma.bookingCreateInput = {
            seat_no: payload.seat_no,
            ticking_no: payload.ticking_no,
            amount_paid: "122121",

            booking_status:{
                connect: {
                    id: payload.booking_statusId
                },
            },
            carriage_class:{
                connect:{
                    id: payload.carriage_classId
                }
            },
            start_train_station: {
                connect:{
                    id: payload.start_train_stationId
                }
            },
            end_train_station: {
                connect:{
                    id: payload.end_train_stationId
                }
            },
            train_journey:{
                connect:{
                    id: payload.train_journeyId
                }
            },
            User:{
                connect:{
                    id: payload.userId
                }
            },
            
        }

        return prisma.booking.create({
            data: data
        })
    
}