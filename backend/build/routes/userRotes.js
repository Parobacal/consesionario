"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appController_1 = require("../controllers/appController");
class UserRotes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/login', appController_1.appCtrl.login);
        this.router.get('/getUser/:id', appController_1.appCtrl.getUser);
        this.router.get('/gettest', appController_1.appCtrl.gettest);
        this.router.post('/cliente', appController_1.appCtrl.createClient);
        this.router.post('/transferencia', appController_1.appCtrl.transferencia);
        this.router.get('/historial/:id', appController_1.appCtrl.getHistorial);
    }
}
const userRoutes = new UserRotes();
exports.default = userRoutes.router;
