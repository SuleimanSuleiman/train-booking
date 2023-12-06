/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first
 *         - last
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a user
 *         first:
 *           type: string
 *           description: first name
 *         last:
 *           type: string
 *           descripton: last name
 *       example:
 *         id: 1
 *         first: John 
 *         last: Doe
 * 
 * @swagger
 *  tags:
 *    name: Users
 *    description: list of users
 */
import swaggerJsDoc from "swagger-jsdoc";
const swaggerSpecs = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Users API",
      version: "1.0.0",
      description: "A simple Express Library API"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "My API Documentation",
      },
    ],
  },
  apis: ["./swagger.ts"] // process @swagger in ./swagger.js and ./users.js
});
module.exports = swaggerSpecs;