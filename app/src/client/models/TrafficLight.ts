import Prisma from '@prisma/client';

export type TrafficLightState = 'happy'|'sad'|'transitioning';

export type StatefulTrafficLight = Prisma.TrafficLight & {
  state: TrafficLightState;
  makeHappy(): void;
  makeSad(): void;
};

export class TrafficLight implements StatefulTrafficLight {
  state: TrafficLightState = 'happy';
  id: number
  uuid: string
  name: string
  dashboardId: number

  constructor(databaseRecord: Prisma.TrafficLight) {
    this.id = databaseRecord.id;
    this.uuid = databaseRecord.uuid;
    this.name = databaseRecord.name;
    this.dashboardId = databaseRecord.dashboardId;
  }

  makeHappy(): void {
    if (this.state === 'happy') {
      return;
    }

    this.state = 'transitioning';

    setTimeout(() => {
      this.state = 'happy';
    }, 2_000);
  }

  makeSad(): void {
    if (this.state === 'sad') {
      return;
    }

    this.state = 'transitioning';

    setTimeout(() => {
      this.state = 'sad';
    }, 2_000);
  }
}
