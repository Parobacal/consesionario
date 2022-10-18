import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

import userRotes from './routes/userRotes';


class Server{
    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.set('mysql_server', process.env.MYSQL_SERVER);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(): void {
        this.app.use(userRotes)
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();