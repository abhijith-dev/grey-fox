import { Router } from 'express';
import { userValidationMiddleware } from '../middlewares';
import userControllers from '../controllers/users';
const router = Router();

router.post('/onboard',...userValidationMiddleware(),userControllers.onboard);


export default router;