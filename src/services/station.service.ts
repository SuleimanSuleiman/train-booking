import { ZodType } from "zod";
import prisma from '../lib/prisma';
import { CreateStationInput } from "../Schemas/station.schema";
import { Prisma, train_journey, train_station } from "@prisma/client";
import morgan from 'morgan';



export const newStationService = (
    payload: Prisma.train_stationCreateInput
) => (
    prisma.train_station.create({
        data:{
            station_name: payload.station_name,
        }
    })
)


export const buildIncludeQuery = (
  customInclude: Record<string, boolean | object> = {}
): Prisma.train_stationFindManyArgs => {
    return {
        include: {
            ...customInclude,
        },
    };
};

export const buildSelectQuery = (
  customInclude: Record<string, boolean | object> = {}
) => {
    return {
        select: {
            ...customInclude,
        },
    };
};


export const buildQueryForAllStations = (
    customInclude: Record<string, boolean | object|string> = {}
  ): Prisma.train_stationFindManyArgs => {
    return {
        select: {
            id: customInclude.id == true || false,
            station_name: customInclude.station_name == true || false,
            _count:{
                select:{
                    end_bookings: customInclude.end_bookings === "true" || false,
                    journey_stations: customInclude.journey_stations === "true" || false,
                    start_bookings: customInclude.start_bookings === "true" || false,
                }
            }
        }
    };
  };

export const getAllStationsService = (
    options: Prisma.train_stationFindManyArgs = {},
    take: number = 20
) => {
    const query: Prisma.train_stationFindManyArgs = {
        ...options,
    };

    return prisma.train_station.findMany({
        ...query,
        // take: take
    })
};



export const getStationService = (
    id: number,
    query: Prisma.train_stationFindManyArgs = {},
) =>{
    const where:Prisma.train_stationWhereUniqueInput = {
        id: id,
    }
    return prisma.train_station.findFirstOrThrow({
        where: where,
        ...query
    })
}

export const updateStationService = (
    id:number,
    payload: Prisma.train_stationUpdateInput
) => {
    const where:Prisma.train_stationWhereUniqueInput = {
        id: id
    }

    const data:Prisma.train_stationUpdateInput = {
        ...payload,
    }

    return prisma.train_station.update({
        where: where,
        data: data
    })
}

export const getSearchStationsService = (
    query: string
) => {
    return prisma.$queryRawUnsafe<train_station[]>(
        `SELECT id,station_name FROM train_stations WHERE station_name LIKE ? `,
            `%${query}%`,
        );
}


export const getAllSheduleService = (

) => (
    prisma.schedule.findMany()
)

export const getScheduleService = (
    id: number,
    query: Prisma.scheduleFindManyArgs = {}
) =>{
    const where:Prisma.scheduleWhereUniqueInput = {
        id: id,
    }
    return prisma.schedule.findFirstOrThrow({
        where: where,
        ...query,
    });
}

export  const newScheduleService = (
    payload: Prisma.scheduleCreateInput
) => (
    prisma.schedule.create({
        data:{
            name: payload.name,
        }
    })
)

export const newTrainJourneyService =  (
    payload:any
) =>( 
     prisma.train_journey.create({
        data:{
            journey_name: payload.journey_name,
            schedule:{
                connect: {
                    id: parseInt(payload.scheduleId),
                  },
            }
        }
    })
)

export const getAllTrainJournies =() => (
    prisma.train_journey.findMany()
)

export const getTrainJourneyService = (
    id: number,
    query: Prisma.train_journeyFindManyArgs
) =>{
    const where:Prisma.train_journeyWhereUniqueInput = {
        id: id,
    }
    return prisma.train_journey.findFirstOrThrow({
        where: where,
        ...query,
    });
}

export const getSearchTrainJourneyService = (
    query: string
) => {
    return prisma.$queryRawUnsafe<train_journey[]>(
        `SELECT 
        id,journey_name,order_stop,scheduleId 
        FROM train_journey 
        WHERE journey_name LIKE ? `,
            `%${query}%`,
        );
}

export const getAllJourneyStationService = () => prisma.journey_station.findMany();

export const getJourneyStationService = (    
    id: number
    ) =>{
        const where:Prisma.journey_stationWhereUniqueInput = {
            id: id,
        }
        return prisma.journey_station.findFirstOrThrow({
            where: where
        });
}

export const newJourneyStationService = (
    payload:any
) =>{
    const data:Prisma.journey_stationCreateInput = {
        train_station:{
            connect: {
                id: parseInt(payload.train_stationId)
            }
        } ,
        train_journey:{
            connect: {
                id: parseInt(payload.train_journeyId),
            },
        },
        departure_time: new Date(payload.departure_time),
    }
    return prisma.journey_station.create({
        data:data
    });
}

export const getAllStationsCoverByJourneyService = (
    JourneyId: number
) => {
    return prisma.train_journey.findFirstOrThrow({
        where:{
            id:JourneyId
        },
        select:{
            id:true,
            journey_name: true,
            order_stop: true,
            schedule:{
                select:{
                    id:true,
                    name: true,
                }
            },
            journey_stations: {
                select:{
                    id:true,
                    departure_time:true,
                    train_station:{
                        select: {
                            id:true,
                            station_name:true,

                        }
                    }
                }
            }
        }
    })
}