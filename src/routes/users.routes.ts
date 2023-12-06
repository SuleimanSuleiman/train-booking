import { Router } from "express";
import {
    register,
    login,
    logout,
    deleteUser,
    index,
    edit,
    notExists
} from '../controllers/User.controller';
import ValidateResource from "../middleware/ValidateResource";
import ChickIfAuth from '../middleware/ChickIfAuth';
import { LoginUserSchema, StoreUserSchema, EditUserSchema } from '../Schemas/User.schema';

const router: Router = Router();



/**
 * @openapi
 * /users:
 *   get:
 *     summary: Returns all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: the list of users
 */



/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: updates a user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         decsription: The user was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some errors happend.
 */


router.post('/register', ValidateResource(StoreUserSchema), register);
router.post('/login', ValidateResource(LoginUserSchema), login);
router.put('/edit', ValidateResource(EditUserSchema),edit);
router.get('/index',ChickIfAuth,index);
router.get('/logout',ChickIfAuth,logout);
router.delete('/delete',ChickIfAuth, deleteUser);


export default router;
