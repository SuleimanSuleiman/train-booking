import { TypeOf, ZodIssueCode, boolean, date, number, object, string } from "zod";

const stationPayload = {
    body: object({
        station_name: string({
            required_error: "The Name is required",
            invalid_type_error: "The name must be a string",
            description: "this is the station name such content name and location"
        })
        .toLowerCase(),
    })
    .strict()
}


function handleQuery(val:string){
    if(val.toLowerCase() == 'true'){
        return new Boolean(true);
    }else if(val.toLowerCase() == 'false'){
        return new Boolean(false);
    }else{
        ZodIssueCode.invalid_type
    }
}

const getAllstations = {
    query: object({
        journey_stations: string()
        .optional(),
        start_bookings: string()
        .optional(),
        end_bookings: string()        
        .optional(),
    }).strict()
}



const getstation = {
    params: object({
        id: string({
            description: "station ID",
            required_error: "station id is required",
            invalid_type_error: "should be string",
        })
    })
    .strict()
}

// schedule
const getSchedule = {
    params: object({
        id: string({
            description: "schedule ID",
            required_error: "schedule id is required",
            invalid_type_error: "should be string",
        })
    })
    .strict()
}

const storeSchedule = {
    body: object({
        name: string({
            required_error: "The Name is required",
            invalid_type_error: "The name must be a string",
            description: "this is the schedule name such content name and location"
        })
    })
}

const StoreTrainJourney = {
    body: object({
        journey_name: string({
            required_error: "The Name is required",
            invalid_type_error: "The name must be a string",
            description: "this is the schedule name such content name and location"
        }),
        scheduleId: string({
            description: "schedule ID",
            required_error: "schedule id is required",
            invalid_type_error: "should be string",
        })
    })
}

export const getTrainJourney = {
    params: object({
        id: string()
    })
    .strict()
}

export const getJourneyStation = {
    params: object({
        id: string()
    })
    .strict()
}

export const StoreJourneyStation = {
    body: object({
        train_stationId: number({
            description: "train station ID",
            required_error: "train station  id is required",
            invalid_type_error: "should be number",
        }),
        train_journeyId: number({
            description: "train journey ID",
            required_error: "train journey  id is required",
            invalid_type_error: "should be number",
        }),
        departure_time: string({            
            description: "departure time ",
            required_error: "departure_time is required",
            invalid_type_error: "should be string",
    })
    })
}

export const searchStation = {
    query: object({
        search: string()
    }).strict()
}


export const StoreStationSchema = object({
    ...stationPayload
});

export const getStationSchema =  object({
    ...getstation
})

export const updateStationSchema = object({
    ...getstation,
    ...stationPayload
})

export const getAllStationsSchema = object({
    ...getAllstations
})

export const searchStationSchema = object({
    ...searchStation
})


// schedule
export const getSheduleSchema = object({
    ...getSchedule
})

export const StoreScheduleSchema = object({
    ...storeSchedule
})

//train journey
export const StoreTrainJourneySchema = object({
    ...StoreTrainJourney
})

export const getTrainJourneySchema = object({
    ...getTrainJourney
})


//journey station
export const getJourneyStationSchema = object({
    ...getJourneyStation
})


export const StoreJourneyStationSchema = object({
    ...StoreJourneyStation
})


export type CreateStationInput =  TypeOf<typeof StoreStationSchema>

export type GetStationInput = TypeOf<typeof getStationSchema>

export type UpdataStationInput = TypeOf<typeof updateStationSchema>

export type searchStationInput = TypeOf<typeof searchStationSchema>

//schedule
export type GetScheduleInput = TypeOf<typeof getSheduleSchema>

export type CreateScheduleInput =  TypeOf<typeof StoreScheduleSchema>

//Train Journey
export type CreateTrainJourneyInput =  TypeOf<typeof StoreTrainJourneySchema>

export type getTrainJourneyInput = TypeOf<typeof getTrainJourneySchema>


//journey station
export type getJourneyStationInput = TypeOf<typeof getJourneyStationSchema>


export type CreateJourneyStationInput =  TypeOf<typeof StoreJourneyStationSchema>


export type getAllStationsInput =  TypeOf<typeof getAllStationsSchema>