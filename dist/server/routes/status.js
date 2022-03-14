"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const StatusController_1 = require("../controllers/StatusController");
exports.routes = (0, express_1.Router)();
exports.routes.get('/', StatusController_1.StatusController.show);
