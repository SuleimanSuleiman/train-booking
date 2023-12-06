import { TypeOf, number, object, string } from "zod";

const storeCarriageClassPayload = {
    body: object({
        class_name: string({
            required_error: "The class name is required",
            invalid_type_error: "The  class name must be a string",
            description: "this is the s class name"
        })
        .toLowerCase(),
        seating_capacity: number({
                description: "seating capacity ID",
                required_error: "seating capacity id is required",
                invalid_type_error: "should be number",
        })
    })
}


export const storeCarriagePrice = {
    body: object({
        price: number({
            description: "sprice",
            required_error: "price is required",
            invalid_type_error: "should be number",
        }),
        carriage_classId: number({
            description: "carriage_class ID",
            required_error: "carriage_class id is required",
            invalid_type_error: "should be number",
        }),
        scheduleId:number({
            description: "schedule ID",
            required_error: "schedule id is required",
            invalid_type_error: "should be number",
        }),
    })
}

export const storeNewjourneyCarriage = {
    body:object({
        train_journeyId: number({
            description: "train_journey ID",
            required_error: "train_journey is required",
            invalid_type_error: "should be number",
        }),
        carriage_classId:number({
            description: "carriage_class ID",
            required_error: "carriage_class is required",
            invalid_type_error: "should be number",
        }),
        position: number({
            required_error: "The position is required",
            invalid_type_error: "The  position must be a string",
            description: `The position in the train that the carriage
                        sits. This can help with printing on tickets
                        or informing the passenger where their
                        carriage is`
        }),


    })
}

export const storeCarriageClassSchema = object({
    ...storeCarriageClassPayload
})

export const  storeCarriagePriceSchema = object({
    ...storeCarriagePrice
})

export const storeNewjourneyCarriageSchema = object({
    ...storeNewjourneyCarriage
})

export type storeCarriageClassInput = TypeOf<typeof storeCarriageClassSchema>

export type storeCarriagePriceInput = TypeOf<typeof storeCarriagePriceSchema>

export type storeNewjourneyCarriageInput = TypeOf<typeof storeNewjourneyCarriageSchema>