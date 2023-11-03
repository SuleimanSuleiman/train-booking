import { TypeOf, object, string } from "zod";

const stationPayload = {
    body: object({
        name: string({
            required_error: "The Name is required",
            invalid_type_error: "The name must be a string",
            description: "this is the station name such content name and location"
        })
        .toLowerCase(),
    })
    .strict()
}

export const StoreStationSchema = object({
    ...stationPayload
});

export type CreateStationInput =  TypeOf<typeof StoreStationSchema>