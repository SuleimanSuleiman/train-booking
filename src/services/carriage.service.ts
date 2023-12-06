import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";

export const newCarriageClassService = (
    payload: Prisma.carriage_classCreateInput
) => (
    prisma.carriage_class.create({
        data: payload
    })
)

export const getAllCarriageClassService = () => prisma.carriage_class.findMany();


export const newCarriagePriceService = (
    payload: Prisma.carrige_priceCreateInput
) => (
    prisma.carrige_price.create({
        data: payload
    })
)

export const getAllCarriagePriceService = () => prisma.carrige_price.findMany();

export const NewjourneyCarriageService = (
    payload: any
) => {
    const data: Prisma.journay_carriageCreateInput = {
        carriage_class: {
            connect: {
                id: parseInt(payload.carriage_classId)
            }
        },
        train_journey: {
            connect: {
                id: parseInt(payload.train_journeyId),
            },
        },
        position: parseInt(payload.position)
    }

    return prisma.journay_carriage.create({
        data: data
    })
}

export const getAllJourneyCarriageServie = () => prisma.journay_carriage.findMany();