import { describe } from "node:test";
import App from "../utils/app";

import supertest from "supertest";

import * as UserServices from "../services/User.service";
import prisma from "../lib/prisma";

const app = App();

describe('user',() =>{
    describe("register")
})