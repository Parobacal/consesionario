"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCtrl = void 0;
const db_1 = __importDefault(require("../db"));
class UserController {
    async getUser(req, res) {
        var query = 'SELECT * FROM USUARIO WHERE no_cuenta = ?';
        var id = req.params.id;
        console.log(id);
        db_1.default.query(query, [id], function (err, results) {
            res.json(results[0]);
        });
    }
    async login(req, res) {
        var query = 'SELECT * FROM USUARIO WHERE no_cuenta = ? AND contrasena = ?';
        var body = req.body;
        console.log(body);
        db_1.default.query(query, [body.no_cuenta, body.contrasena], function (err, results) {
            let temp = {};
            if (results.length == 0) {
                temp = { codigo: "ERROR", mensaje: "ERROR: El usuario o la contrasena son incorrectos" };
            }
            else {
                temp = { codigo: "OK", contenido: results[0] };
            }
            res.json(temp);
        });
    }
    async createUser(req, res) {
        var query = "CALL CreateUsuario(?, ?, ?, ?, ?, ?, @Salida)";
        var body = req.body;
        console.log(body);
        try {
            db_1.default.getConnection(function (err, conn) {
                conn.query(query, [body.correo, body.contrasena, body.nombre, body.apellido, body.DPI, body.saldo], function (err2, results, field) {
                    console.log(results);
                });
                conn.query('SELECT @Salida as cuenta', function (err2, results, field) {
                    console.log(results);
                    res.json(results[0]);
                });
            });
        }
        catch (err) {
            console.error(err);
        }
    }
    async transferencia(req, res) {
        var coso = new Date();
        var fecha = ("0" + coso.getDate()).slice(-2) + "/" + ("0" + (coso.getMonth() + 1)).slice(-2) + "/" + coso.getFullYear() + " " + coso.getHours() + ":" + coso.getMinutes() + ":" + coso.getSeconds();
        var query = "CALL transferencia(?,?,?, (STR_TO_DATE(?, '%d/%m/%Y %H:%i:%s')) , @Salida)";
        var body = req.body;
        console.log(body);
        try {
            db_1.default.getConnection(function (err, conn) {
                conn.query(query, [body.cuenta_a, body.cuenta_b, body.monto, fecha], function (err2, results, field) {
                    console.log(results);
                });
                conn.query('SELECT @Salida as resultado', function (err2, results, field) {
                    let temp = {};
                    if (results[0].resultado == "0") {
                        temp = { codigo: "OK", mensaje: "La transferencia se ha realizado exitosamente" };
                    }
                    else if (results[0].resultado == "1") {
                        temp = { codigo: "ERROR", mensaje: "ERROR 1: El numero de cuenta no existe" };
                    }
                    else if (results[0].resultado == "2") {
                        temp = { codigo: "ERROR", mensaje: "ERROR 2: Monto a transferir sobrepasa el saldo de su cuenta" };
                    }
                    else if (results[0].resultado == null) {
                        temp = { codigo: "ERROR", mensaje: "ERROR 3: No se pueden realizar tranfrencia mayores a Q10,000.00" };
                    }
                    res.json(temp);
                });
            });
        }
        catch (err) {
            console.error(err);
        }
    }
    async getHistorial(req, res) {
        var query = `(SELECT t.no_Transferencia, t.no_cuenta as cuenta_a, t.fecha, d.no_cuenta as cuenta_b, d.monto
                    FROM TRANSFERENCIA t, DET_TRANSFERENCIA d
                    WHERE t.no_Transferencia = d.no_Transferencia AND t.no_cuenta = ?
                    )union(
                    SELECT t.no_Transferencia, t.no_cuenta as cuenta_a, t.fecha, d.no_cuenta as cuenta_b, d.monto
                    FROM TRANSFERENCIA t, DET_TRANSFERENCIA d
                    WHERE t.no_Transferencia = d.no_Transferencia AND d.no_cuenta = ?)`;
        var id = req.params.id;
        console.log(id);
        db_1.default.query(query, [id, id], function (err, results) {
            res.json(results);
        });
    }
}
exports.userCtrl = new UserController();
