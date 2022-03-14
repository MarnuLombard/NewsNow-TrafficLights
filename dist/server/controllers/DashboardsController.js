"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardsController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class DashboardsController {
    static async index(req, res) {
        const dashboards = await prisma.dashboard.findMany({
            include: {
                trafficLights: true,
            },
        });
        res.status(200)
            .send(JSON.stringify(dashboards));
    }
    static async show(req, res) {
        const uuid = req.get('uuid');
        let dashboard;
        if (uuid === 'default') {
            dashboard = await prisma.dashboard.findFirst({
                where: { default: true },
                include: {
                    trafficLights: true,
                },
            });
        }
        else {
            dashboard = await prisma.dashboard.findFirst({
                where: { uuid },
                include: {
                    trafficLights: true,
                },
            });
        }
        res.status(200)
            .send(JSON.stringify(dashboard));
    }
}
exports.DashboardsController = DashboardsController;
