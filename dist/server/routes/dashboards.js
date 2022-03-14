"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const DashboardsController_1 = require("../controllers/DashboardsController");
exports.routes = (0, express_1.Router)();
exports.routes.get('/', DashboardsController_1.DashboardsController.index);
exports.routes.get('/:uuid', DashboardsController_1.DashboardsController.show);
