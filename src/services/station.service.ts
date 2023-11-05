import { ZodType } from "zod";
import prisma from '../lib/prisma';
import { CreateStationInput } from "../Schemas/station.schema";
import { Prisma } from "@prisma/client";
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

export const getAllStationsService = () => (
    prisma.train_station.findMany()
);

export const getStationService = (
    id: number
) =>{
    const where:Prisma.train_stationWhereUniqueInput = {
        id: id,
    }
    return prisma.train_station.findFirstOrThrow({
        where: where
    });
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


export const getAllSheduleService = (

) => (
    prisma.schedule.findMany()
)

export const getScheduleService = (
    id: number
) =>{
    const where:Prisma.scheduleWhereUniqueInput = {
        id: id,
    }
    return prisma.schedule.findFirstOrThrow({
        where: where
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
    id: number
) =>{
    const where:Prisma.train_journeyWhereUniqueInput = {
        id: id,
    }
    return prisma.train_journey.findFirstOrThrow({
        where: where
    });
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

export const newJourneyStationService =     (
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