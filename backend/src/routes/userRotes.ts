import { Router } from "express";
import { appCtrl } from "../controllers/appController";

class UserRotes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/getReport', appCtrl.getReport);
        this.router.post('/cliente', appCtrl.createClient);
        this.router.post('/agent', appCtrl.createAgent);
        this.router.post('/vehiculo', appCtrl.createVehicle);
        this.router.post('/consorsio', appCtrl.createConsesionario);
    }
}

const userRoutes = new UserRotes();
export default userRoutes.router;
