import { Request, Response } from "express";
import pool from "../db";

class AppController{

    public async getReport(req:Request, res:Response){
        var query = `SELECT * FROM Cotizacion ORDER BY Fecha`;

        pool.query(query, function(err, results:any){
            res.json(results);
        });    
    }

    public async createClient(req:Request, res:Response){
        var query = "INSERT INTO Cliente (Nombre, Correo, Direccion, DPI, Edad, Genero) VALUES (?, ?, ?, ?, ?, ?)";

        var body = req.body
        console.log(body)

        try{
            pool.getConnection(function(err, conn){
                conn.query(query, [body.nombre, body.correo, body.direccion, body.dpi, body.edad, body.genero], function(err2, results:any, field){
                    console.log(results);
                    res.json(results[0]);
                });
            });
        }catch (err){
            console.error(err)
        }
    }

    public async createVehicle(req:Request, res:Response){
        var query = "INSERT INTO Vehiculo (idSucursal, Modelo, Tipo, Anio, Color, Transmision, Precio) VALUES (?, ?, ?, ?, ?, ?, ?)";

        var body = req.body
        console.log(body)

        try{
            pool.getConnection(function(err, conn){
                conn.query(query, [body.idsucursal, body.modelo, body.tipo, body.anio, body.color, body.transmision, body.precio], function(err2, results:any, field){
                    console.log(results);
                    res.json(results[0]);
                });
            });
        }catch (err){
            console.error(err)
        }
    }

    public async createAgent(req:Request, res:Response){
        var query = "INSERT INTO Agente (idSucursal, Nombre, Correo, Direccion, DPI, Edad, Genero) VALUES (?, ?, ?, ?, ?, ?, ?)";

        var body = req.body
        console.log(body)

        try{
            pool.getConnection(function(err, conn){
                conn.query(query, [body.idsucursal, body.nombre, body.correo, body.direccion, body.dpi, body.edad, body.genero], function(err2, results:any, field){
                    console.log(results);
                    res.json(results[0]);
                });
            });
        }catch (err){
            console.error(err)
        }
    }

    public async createConsesionario(req:Request, res:Response){
        var query = "INSERT INTO Consesionario (Nombre, Direccion) VALUES (?, ?)";

        var body = req.body
        console.log(body)

        try{
            pool.getConnection(function(err, conn){
                conn.query(query, [body.nombre, body.direccion], function(err2, results:any, field){
                    console.log(results);
                    res.json(results[0]);
                });
            });
        }catch (err){
            console.error(err)
        }
    }

    public async cotization(req:Request, res:Response){
        var fec = new Date()


        var fecha = ("0" + fec.getDate()).slice(-2) + "/" + ("0" + (fec.getMonth() + 1)).slice(-2) + "/" + fec.getFullYear() + " " + fec.getHours() + ":" + fec.getMinutes() + ":" + fec.getSeconds();
        var query = "INSERT INTO Cotizacion (idAgente, idCliente, idVehiculo, Fecha, Descripcion) VALUES (?,?,?,?,?)";

        var body = req.body
        console.log(body);

        try{
            pool.getConnection(function(err, conn){
                conn.query(query, [body.idagente, body.idcliente, body.idvehiculo, fecha, body.descripcion], function(err2, results:any, field){
                    console.log(results);
                    var temp = {codigo: "OK", mensaje:"Cotizacion realizada"};
                    res.json(temp);
                });
            });
        }catch (err){
            console.error(err)
        }
    }
}

export const appCtrl = new AppController();