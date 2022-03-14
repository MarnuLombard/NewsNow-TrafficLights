import { Request, Response } from 'express';
import Prisma, { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DashboardsController {
  public static async index(req: Request, res: Response) {
    const dashboards: Prisma.Dashboard[] = await prisma.dashboard.findMany({
      include: {
        trafficLights: true,
      },
    });

    res.status(200)
      .send(JSON.stringify(dashboards));
  }

  public static async show(req: Request, res: Response) {
    const uuid = req.get('uuid');
    let dashboard;

    if (uuid === 'default') {
      dashboard = await prisma.dashboard.findFirst({
        where: { default: true },
        include: {
          trafficLights: true,
        },
      });
    } else {
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
