"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusController = void 0;
const crypto_1 = require("crypto");
class StatusController {
    static async show(req, res) {
        const coinFlip = Boolean((0, crypto_1.randomInt)(100) % 2);
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
exports.StatusController = StatusController;
