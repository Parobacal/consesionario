CREATE DATABASE consesionario;

USE consesionario;

CREATE TABLE IF NOT EXISTS Consesionario(
    idConsesionario INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(50) NOT NULL,
    Direccion VARCHAR(120) NOT NULL,

    PRIMARY KEY (idConsesionario)
);

CREATE TABLE IF NOT EXISTS Sucursal(
    idSucursal INT NOT NULL AUTO_INCREMENT,
    idConsesionario INT NOT NULL,
    Nombre VARCHAR(50) NOT NULL,
    Direccion VARCHAR(120) NOT NULL,

    PRIMARY KEY (idSucursal),
    FOREIGN KEY (idConsesionario) REFERENCES Consesionario(idConsesionario)
);

CREATE TABLE IF NOT EXISTS Agente(
    idAgente INT NOT NULL AUTO_INCREMENT,
    idSucursal INT NOT NULL,
    Nombre VARCHAR(50) NOT NULL,
    Direccion VARCHAR(120) NOT NULL,
    DPI INT UNIQUE NOT NULL,
    Edad INT NOT NULL,
    Genero VARCHAR(1) NOT NULL,

    PRIMARY KEY (idAgente),
    FOREIGN KEY (idSucursal) REFERENCES Sucursal(idSucursal)
);

CREATE TABLE IF NOT EXISTS Vehiculo(
    idVehiculo INT NOT NULL AUTO_INCREMENT,
    idSucursal INT NOT NULL,
    Modelo VARCHAR(50) NOT NULL,
    Tipo VARCHAR(120) NOT NULL,
    Anio INT NOT NULL,
    Color VARCHAR(20) NOT NULL,
    Transmision CHAR(1) NOT NULL,
    Precio DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (idVehiculo),
    FOREIGN KEY (idSucursal) REFERENCES Sucursal(idSucursal)
);


CREATE TABLE IF NOT EXISTS Cliente(
    idCliente INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(50) NOT NULL,
    Direccion VARCHAR(120) NOT NULL,
    DPI INT UNIQUE NOT NULL,
    Edad INT NOT NULL,
    Genero VARCHAR(1) NOT NULL,

    PRIMARY KEY (idConsesionario)
);

CREATE TABLE IF NOT EXISTS Cotizacion(
    idCotizacion INT NOT NULL AUTO_INCREMENT,
    idAgente INT NOT NULL,
    idCliente INT NOT NULL,
    idVehiculo INT NOT NULL,
    Fecha DATE NOT NULL,
    Descripcion VARCHAR(100),

    PRIMARY KEY (Cotizacion),
    FOREIGN KEY (idAgente) REFERENCES Agente(idAgente),
    FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente),
    FOREIGN KEY (idVehiculo) REFERENCES Vehiculo(idVehiculo)
);