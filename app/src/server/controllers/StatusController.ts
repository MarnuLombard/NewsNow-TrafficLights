import { Request, Response } from 'express';
import { randomInt } from 'crypto';

export class StatusController {
  public static async show(req: Request, res: Response) {
    const coinFlip = Boolean(randomInt(100) % 2);

    if (coinFlip) {
      return res
        .status(200)
        .send('{}');
    }

    return res
      .status(418)
      .send('{}');
  }
}
