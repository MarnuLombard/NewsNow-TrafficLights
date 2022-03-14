import {Router} from 'express'
import {StatusController} from "@/controllers/StatusController";
export const routes: Router = Router()

routes.get('/', StatusController.index);
