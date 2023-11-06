import { describe } from "node:test";
import App from "../utils/app";

import supertest from "supertest";

import * as UserServices from "../services/User.service";
import prisma from "../lib/prisma";

const app = App();


const registerInput = {
	"first_name": "user1",
	"last_name": "user1",
	"email": "zmamznan6"+Math.floor(Math.random() * 10)+"@gmail.com",
	"age": 22,
	"phone":98765432,
	"password": "suleiman123",
	"passwordConfirmation": "suleiman123"
}


const loginInput = {
	"email": "zmamznan66@gmail.com",
	"password": "suleiman123"
}



// test endpoint
describe('User Auth',() =>{

    // beforeAll(async () => {

    // });

    afterEach(async () => {
        prisma.user.deleteMany()
    })


    describe('reguisteration',() =>{
        describe("given the user info are valid",() =>{

            it('should return 201 code status and user info', async() =>{
                const {body,statusCode} = await supertest(app)
                .post('/api/users/register')
                .send(registerInput);

                expect(statusCode).toBe(201);
                expect(body).toMatchObject({
                    id: expect.any(Number),
                    first_name:  expect.any(String),
                    last_name:expect.any(String),
                    email: expect.any(String),
                    confirmEmail: expect.any(Boolean),
                    role: expect.any(String),
                    phone: expect.any(Number),
                    created_at: expect.any(String),
                    updated_at: expect.any(String),
                })
            })
        })

        describe("given the user info are InValid",() =>{
            it('miss data',() =>{
                
            })
        })
    })

    describe('login',() =>{
        describe("given the passwords do not match",() =>{
            
        })
    })

    describe('get user data',() =>{})

    describe('logout',() => {})

    describe('delete user',() =>{})
})

//test services