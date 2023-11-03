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

router.post('/register', ValidateResource(StoreUserSchema), register);
router.post('/login', ValidateResource(LoginUserSchema), login);
router.put('/edit', ValidateResource(EditUserSchema),edit);
router.get('/index',ChickIfAuth,index);
router.get('/logout',ChickIfAuth,logout);
router.delete('/delete',ChickIfAuth, deleteUser);


export default router;