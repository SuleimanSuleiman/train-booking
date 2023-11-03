import { Prisma } from "@prisma/client";
import prisma from '../lib/prisma';

export const createUserService = (
    payload: Prisma.UserCreateInput
)=> {
    return prisma.user.create({data:payload});
}

export const EditUserService = (
    userId:number,
    payload:Prisma.UserUpdateInput
) => {
    return prisma.user.update({
        where: {
            id: userId
        },
        data: {
            first_name: payload.first_name,
            last_name: payload.last_name,
            age: payload.age,
            phone: payload.phone
        }
    })
}


export const deleteUserService = (
     userId:number,
) => {
    return prisma.user.delete({
        where: {
            id: userId
        }
    })
}

export const GetAllDataForUser = (
     userId:number,
) => {
    return prisma.user.findUniqueOrThrow({
        where: {
            id:userId
        },
        include: {
            houses: true
        }
    })
}