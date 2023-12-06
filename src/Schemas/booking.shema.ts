import { TypeOf, date, number, object, string } from "zod";

const storeBookingStatus = {
    body: object({
        name: string({
            required_error: "The name is required",
            invalid_type_error: "The  name must be a string",
            description: "this is the name status"
        })
    })
}

const storeBooking = {
    body: object({
        ticking_no: number({
            description: "ticking_no  ID",
            required_error: "ticking_no is required",
            invalid_type_error: "should be number",
        }),
        seat_no: number({
            description: "seat_no  ID",
            required_error: "seat_no is required",
            invalid_type_error: "should be number",
        }),
        userId: number({
            description: "user ID",
            required_error: "user Id is required",
            invalid_type_error: "should be number",
        }),
        start_train_stationId: number({
            description: `A foreign key to the train station table to
            identify the station that the booking starts
            at (the station where the passenger gets
            onto the train)`,
            required_error: "start_train_station Id is required",
            invalid_type_error: "should be number",
        }),
        end_train_stationId: number({
            description: `A foreign key to the train station table to
            identify the station that the booking
            finishes at (the station where the
            passenger gets off the train)`,
            required_error: "end_train_station Id is required",
            invalid_type_error: "should be number",
        }),
        train_journeyId: number({
            description: `A foreign key to the train journey table, to
            indicate the journey that has been booked
            by the passenger`,
            required_error: "train_journey Id is required",
            invalid_type_error: "should be number",
        }),
        carriage_classId: number({
            description: ` foreign key to the carriage_class table, to
            indicate the class of the ticket that the
            passenger has booked.`,
            required_error: "carriage_class Id is required",
            invalid_type_error: "should be number",
        }),
        booking_statusId: number({
            description: `A foreign key to the booking status table
            to identify the status of this booking`,
            required_error: "train_station Id is required",
            invalid_type_error: "should be number",
        }),
    })
}


export const storeBookingStatusSchema = object({
    ...storeBookingStatus
})

export const storeBookingSchema = object({
    ...storeBooking
})

export type storeBookingStatusInput = TypeOf<typeof storeBookingStatusSchema>
export type storeBookingInput = TypeOf<typeof storeBookingSchema>