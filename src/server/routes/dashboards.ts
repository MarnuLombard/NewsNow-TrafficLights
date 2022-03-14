import {Router} from 'express'
import {DashboardsController} from "@/controllers/DashboardsController";

export const routes: Router = Router()

routes.get('/', DashboardsController.index);
