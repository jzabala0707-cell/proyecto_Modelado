\-- \============================================================  
\-- \============================================================  
\--                    ARTETOURS  
\--       SISTEMA DE GESTIÓN TURÍSTICA  
\--             BASE DE DATOS POSTGRESQL  
\-- \============================================================  
\-- \============================================================

\-- \============================================================  
\-- 0\. LIMPIEZA OPCIONAL  
\-- \============================================================  
\-- DESCOMENTA ESTAS LÍNEAS SOLAMENTE SI QUIERES ELIMINAR  
\-- UNA BASE DE DATOS ARTETOURS ANTERIOR.  
\--  
\-- ADVERTENCIA:  
\-- ESTO ELIMINARÁ TODAS LAS TABLAS, DATOS Y TIPOS DEL ESQUEMA.  
\--  
\-- DROP SCHEMA IF EXISTS artetours CASCADE;  
\-- CREATE SCHEMA artetours;  
\-- SET search\_path TO artetours;

\-- \============================================================  
\-- 1\. TIPOS ENUM  
\-- \============================================================

CREATE TYPE estado\_usuario AS ENUM (  
    'ACTIVO',  
    'INACTIVO',  
    'BLOQUEADO'  
);

CREATE TYPE estado\_tour AS ENUM (  
    'BORRADOR',  
    'ACTIVO',  
    'INACTIVO'  
);

CREATE TYPE estado\_salida AS ENUM (  
    'PROGRAMADA',  
    'DISPONIBLE',  
    'COMPLETA',  
    'CANCELADA',  
    'FINALIZADA'  
);

CREATE TYPE estado\_reserva AS ENUM (  
    'PENDIENTE',  
    'CONFIRMADA',  
    'CANCELADA',  
    'COMPLETADA'  
);

CREATE TYPE estado\_venta AS ENUM (  
    'PENDIENTE',  
    'PARCIAL',  
    'PAGADA',  
    'CANCELADA'  
);

CREATE TYPE estado\_factura AS ENUM (  
    'PENDIENTE',  
    'EMITIDA',  
    'ANULADA'  
);

CREATE TYPE tipo\_documento AS ENUM (  
    'CC',  
    'CE',  
    'PASAPORTE',  
    'TI',  
    'PEP',  
    'PPT'  
);

CREATE TYPE genero AS ENUM (  
    'MASCULINO',  
    'FEMENINO',  
    'NO\_BINARIO',  
    'OTRO',  
    'PREFIERE\_NO\_DECIR'  
);

CREATE TYPE tipo\_token AS ENUM (  
    'VERIFICACION\_EMAIL',  
    'RECUPERACION\_PASSWORD'  
);

\-- \============================================================  
\-- 2\. TABLA: USUARIOS  
\-- \============================================================

CREATE TABLE usuarios (  
    id\_usuario BIGINT GENERATED ALWAYS AS IDENTITY,

    nombre VARCHAR(100) NOT NULL,  
    apellido VARCHAR(100) NOT NULL,

    correo VARCHAR(150) NOT NULL,  
    telefono VARCHAR(30),

    password\_hash TEXT NOT NULL,

    estado estado\_usuario NOT NULL DEFAULT 'ACTIVO',

    correo\_verificado BOOLEAN NOT NULL DEFAULT FALSE,

    ultimo\_acceso TIMESTAMPTZ,

    fecha\_creacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT\_TIMESTAMP,

    fecha\_actualizacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT\_TIMESTAMP,

    CONSTRAINT pk\_usuarios  
        PRIMARY KEY (id\_usuario),

    CONSTRAINT uq\_usuarios\_correo  
        UNIQUE (correo),

    CONSTRAINT chk\_usuarios\_correo  
        CHECK (correo \= LOWER(correo))  
);

\-- \============================================================  
\-- 3\. TABLA: ROLES  
\-- \============================================================

CREATE TABLE roles (  
    id\_rol BIGINT GENERATED ALWAYS AS IDENTITY,

    nombre VARCHAR(50) NOT NULL,

    descripcion VARCHAR(255),

    CONSTRAINT pk\_roles  
        PRIMARY KEY (id\_rol),

    CONSTRAINT uq\_roles\_nombre  
        UNIQUE (nombre)  
);

\-- \============================================================  
\-- 4\. TABLA: PERMISOS  
\-- \============================================================

CREATE TABLE permisos (  
    id\_permiso BIGINT GENERATED ALWAYS AS IDENTITY,

    nombre VARCHAR(100) NOT NULL,

    descripcion VARCHAR(255),

    CONSTRAINT pk\_permisos  
        PRIMARY KEY (id\_permiso),

    CONSTRAINT uq\_permisos\_nombre  
        UNIQUE (nombre)  
);

\-- \============================================================  
\-- 5\. TABLA INTERMEDIA: USUARIO\_ROLES  
\-- RELACIÓN N:M  
\-- \============================================================

CREATE TABLE usuario\_roles (  
    id\_usuario BIGINT NOT NULL,

    id\_rol BIGINT NOT NULL,

    CONSTRAINT pk\_usuario\_roles  
        PRIMARY KEY (id\_usuario, id\_rol),

    CONSTRAINT fk\_usuario\_roles\_usuario  
        FOREIGN KEY (id\_usuario)  
        REFERENCES usuarios(id\_usuario)  
        ON DELETE CASCADE,

    CONSTRAINT fk\_usuario\_roles\_rol  
        FOREIGN KEY (id\_rol)  
        REFERENCES roles(id\_rol)  
        ON DELETE CASCADE  
);

\-- \============================================================  
\-- 6\. TABLA INTERMEDIA: ROL\_PERMISOS  
\-- RELACIÓN N:M  
\-- \============================================================

CREATE TABLE rol\_permisos (  
    id\_rol BIGINT NOT NULL,

    id\_permiso BIGINT NOT NULL,

    CONSTRAINT pk\_rol\_permisos  
        PRIMARY KEY (id\_rol, id\_permiso),

    CONSTRAINT fk\_rol\_permisos\_rol  
        FOREIGN KEY (id\_rol)  
        REFERENCES roles(id\_rol)  
        ON DELETE CASCADE,

    CONSTRAINT fk\_rol\_permisos\_permiso  
        FOREIGN KEY (id\_permiso)  
        REFERENCES permisos(id\_permiso)  
        ON DELETE CASCADE  
);

\-- \============================================================  
\-- 7\. TABLA: TURISTAS  
\-- \============================================================

CREATE TABLE turistas (  
    id\_turista BIGINT NOT NULL,

    tipo\_documento tipo\_documento NOT NULL,

    numero\_documento VARCHAR(30) NOT NULL,

    fecha\_nacimiento DATE,

    genero genero,

    nacionalidad VARCHAR(100),

    pais\_residencia VARCHAR(100),

    ciudad\_residencia VARCHAR(100),

    direccion VARCHAR(255),

    contacto\_emergencia\_nombre VARCHAR(150),

    contacto\_emergencia\_telefono VARCHAR(30),

    contacto\_emergencia\_parentesco VARCHAR(50),

    preferencias TEXT,

    observaciones TEXT,

    fecha\_registro TIMESTAMPTZ NOT NULL DEFAULT CURRENT\_TIMESTAMP,

    CONSTRAINT pk\_turistas  
        PRIMARY KEY (id\_turista),

    CONSTRAINT fk\_turistas\_usuario  
        FOREIGN KEY (id\_turista)  
        REFERENCES usuarios(id\_usuario)  
        ON DELETE CASCADE,

    CONSTRAINT uq\_turistas\_documento  
        UNIQUE (tipo\_documento, numero\_documento),

    CONSTRAINT chk\_turistas\_fecha\_nacimiento  
        CHECK (  
            fecha\_nacimiento IS NULL  
            OR fecha\_nacimiento \<= CURRENT\_DATE  
        )  
);

\-- \============================================================  
\-- 8\. TABLA: GUIAS  
\-- \============================================================

CREATE TABLE guias (  
    id\_guia BIGINT NOT NULL,

    tipo\_documento tipo\_documento NOT NULL,

    numero\_documento VARCHAR(30) NOT NULL,

    fecha\_nacimiento DATE,

    genero genero,

    nacionalidad VARCHAR(100),

    pais\_residencia VARCHAR(100),

    ciudad\_residencia VARCHAR(100),

    direccion VARCHAR(255),

    especialidad VARCHAR(150),

    biografia TEXT,

    experiencia\_anios INTEGER,

    certificaciones TEXT,

    foto\_url TEXT,

    disponibilidad BOOLEAN NOT NULL DEFAULT TRUE,

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    fecha\_registro TIMESTAMPTZ NOT NULL DEFAULT CURRENT\_TIMESTAMP,

    CONSTRAINT pk\_guias  
        PRIMARY KEY (id\_guia),

    CONSTRAINT fk\_guias\_usuario  
        FOREIGN KEY (id\_guia)  
        REFERENCES usuarios(id\_usuario)  
        ON DELETE CASCADE,

    CONSTRAINT uq\_guias\_documento  
        UNIQUE (tipo\_documento, numero\_documento),

    CONSTRAINT chk\_guias\_experiencia  
        CHECK (  
            experiencia\_anios IS NULL  
            OR experiencia\_anios \>= 0  
        ),

    CONSTRAINT chk\_guias\_fecha\_nacimiento  
        CHECK (  
            fecha\_nacimiento IS NULL  
            OR fecha\_nacimiento \<= CURRENT\_DATE  
        )  
);

\-- \============================================================  
\-- 9\. TABLA: IDIOMAS  
\-- \============================================================

CREATE TABLE idiomas (  
    id\_idioma BIGINT GENERATED ALWAYS AS IDENTITY,

    nombre VARCHAR(100) NOT NULL,

    CONSTRAINT pk\_idiomas  
        PRIMARY KEY (id\_idioma),

    CONSTRAINT uq\_idiomas\_nombre  
        UNIQUE (nombre)  
);

\-- \============================================================  
\-- 10\. TABLA INTERMEDIA: GUIA\_IDIOMAS  
\-- RELACIÓN N:M  
\-- \============================================================

CREATE TABLE guia\_idiomas (  
    id\_guia BIGINT NOT NULL,

    id\_idioma BIGINT NOT NULL,

    nivel VARCHAR(50),

    CONSTRAINT pk\_guia\_idiomas  
        PRIMARY KEY (id\_guia, id\_idioma),

    CONSTRAINT fk\_guia\_idiomas\_guia  
        FOREIGN KEY (id\_guia)  
        REFERENCES guias(id\_guia)  
        ON DELETE CASCADE,

    CONSTRAINT fk\_guia\_idiomas\_idioma  
        FOREIGN KEY (id\_idioma)  
        REFERENCES idiomas(id\_idioma)  
        ON DELETE CASCADE  
);

\-- \============================================================  
\-- 11\. TABLA: CERTIFICACIONES  
\-- \============================================================

CREATE TABLE certificaciones (  
    id\_certificacion BIGINT GENERATED ALWAYS AS IDENTITY,

    nombre VARCHAR(150) NOT NULL,

    entidad\_emisora VARCHAR(150),

    CONSTRAINT pk\_certificaciones  
        PRIMARY KEY (id\_certificacion),

    CONSTRAINT uq\_certificaciones\_nombre  
        UNIQUE (nombre)  
);

\-- \============================================================  
\-- 12\. TABLA INTERMEDIA: GUIA\_CERTIFICACIONES  
\-- RELACIÓN N:M  
\-- \============================================================

CREATE TABLE guia\_certificaciones (  
    id\_guia BIGINT NOT NULL,

    id\_certificacion BIGINT NOT NULL,

    fecha\_obtencion DATE,

    fecha\_vencimiento DATE,

    numero\_certificado VARCHAR(100),

    CONSTRAINT pk\_guia\_certificaciones  
        PRIMARY KEY (id\_guia, id\_certificacion),

    CONSTRAINT fk\_guia\_certificaciones\_guia  
        FOREIGN KEY (id\_guia)  
        REFERENCES guias(id\_guia)  
        ON DELETE CASCADE,

    CONSTRAINT fk\_guia\_certificaciones\_certificacion  
        FOREIGN KEY (id\_certificacion)  
        REFERENCES certificaciones(id\_certificacion)  
        ON DELETE CASCADE,

    CONSTRAINT chk\_certificacion\_fechas  
        CHECK (  
            fecha\_vencimiento IS NULL  
            OR fecha\_obtencion IS NULL  
            OR fecha\_vencimiento \>= fecha\_obtencion  
        )  
);

\-- \============================================================  
\-- 13\. TABLA: CATEGORIAS\_TOUR  
\-- \============================================================

CREATE TABLE categorias\_tour (  
    id\_categoria BIGINT GENERATED ALWAYS AS IDENTITY,

    nombre VARCHAR(100) NOT NULL,

    descripcion VARCHAR(255),

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    fecha\_creacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT\_TIMESTAMP,

    CONSTRAINT pk\_categorias\_tour  
        PRIMARY KEY (id\_categoria),

    CONSTRAINT uq\_categorias\_tour\_nombre  
        UNIQUE (nombre)  
);

\-- \============================================================  
\-- 14\. TABLA: TOURS  
\-- \============================================================

CREATE TABLE tours (  
    id\_tour BIGINT GENERATED ALWAYS AS IDENTITY,

    id\_categoria BIGINT NOT NULL,

    nombre VARCHAR(150) NOT NULL,

    descripcion TEXT NOT NULL,

    duracion\_horas NUMERIC(5,2) NOT NULL,

    precio\_base NUMERIC(12,2) NOT NULL,

    punto\_encuentro VARCHAR(255) NOT NULL,

    destino VARCHAR(255),

    latitud NUMERIC(9,6),

    longitud NUMERIC(9,6),

    dificultad VARCHAR(50),

    edad\_minima INTEGER,

    edad\_maxima INTEGER,

    capacidad\_maxima INTEGER,

    incluye TEXT,

    no\_incluye TEXT,

    recomendaciones TEXT,

    politica\_cancelacion TEXT,

    estado estado\_tour NOT NULL DEFAULT 'BORRADOR',

    fecha\_creacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT\_TIMESTAMP,

    fecha\_actualizacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT\_TIMESTAMP,

    CONSTRAINT pk\_tours  
        PRIMARY KEY (id\_tour),

    CONSTRAINT fk\_tours\_categoria  
        FOREIGN KEY (id\_categoria)  
        REFERENCES categorias\_tour(id\_categoria)  
        ON DELETE RESTRICT,

    CONSTRAINT chk\_tours\_duracion  
        CHECK (duracion\_horas \> 0),

    CONSTRAINT chk\_tours\_precio  
        CHECK (precio\_base \>= 0),

    CONSTRAINT chk\_tours\_edad\_minima  
        CHECK (  
            edad\_minima IS NULL  
            OR edad\_minima \>= 0  
        ),

    CONSTRAINT chk\_tours\_edad\_maxima  
        CHECK (  
            edad\_maxima IS NULL  
            OR edad\_minima IS NULL  
            OR edad\_maxima \>= edad\_minima  
        ),

    CONSTRAINT chk\_tours\_capacidad  
        CHECK (  
            capacidad\_maxima IS NULL  
            OR capacidad\_maxima \> 0  
        ),

    CONSTRAINT chk\_tours\_latitud  
        CHECK (  
            latitud IS NULL  
            OR latitud BETWEEN \-90 AND 90  
        ),

    CONSTRAINT chk\_tours\_longitud  
        CHECK (  
            longitud IS NULL  
            OR longitud BETWEEN \-180 AND 180  
        )  
);

\-- \============================================================  
\-- 15\. TABLA: TOUR\_REQUISITOS  
\-- \============================================================

CREATE TABLE tour\_requisitos (  
    id\_requisito BIGINT GENERATED ALWAYS AS IDENTITY,

    id\_tour BIGINT NOT NULL,

    descripcion VARCHAR(255) NOT NULL,

    CONSTRAINT pk\_tour\_requisitos  
        PRIMARY KEY (id\_requisito),

    CONSTRAINT fk\_tour\_requisitos\_tour  
        FOREIGN KEY (id\_tour)  
        REFERENCES tours(id\_tour)  
        ON DELETE CASCADE,

    CONSTRAINT uq\_tour\_requisito  
        UNIQUE (id\_tour, descripcion)  
);

\-- \============================================================  
\-- 16\. TABLA: TOUR\_IMAGENES  
\-- \============================================================

CREATE TABLE tour\_imagenes (  
    id\_imagen BIGINT GENERATED ALWAYS AS IDENTITY,

    id\_tour BIGINT NOT NULL,

    url TEXT NOT NULL,

    titulo VARCHAR(150),

    descripcion VARCHAR(255),

    principal BOOLEAN NOT NULL DEFAULT FALSE,

    orden INTEGER NOT NULL DEFAULT 1,

    fecha\_creacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT\_TIMESTAMP,

    CONSTRAINT pk\_tour\_imagenes  
        PRIMARY KEY (id\_imagen),

    CONSTRAINT fk\_tour\_imagenes\_tour  
        FOREIGN KEY (id\_tour)  
        REFERENCES tours(id\_tour)  
        ON DELETE CASCADE,

    CONSTRAINT chk\_tour\_imagenes\_orden  
        CHECK (orden \> 0\)  
);

\-- \============================================================  
\-- 17\. TABLA: SALIDAS\_TOUR  
\-- \============================================================

CREATE TABLE salidas\_tour (  
    id\_salida BIGINT GENERATED ALWAYS AS IDENTITY,

    id\_tour BIGINT NOT NULL,

    id\_guia BIGINT,

    fecha\_salida DATE NOT NULL,

    hora\_salida TIME NOT NULL,

    hora\_finalizacion TIME,

    cupo\_maximo INTEGER NOT NULL,

    cupos\_disponibles INTEGER NOT NULL,

    estado estado\_salida NOT NULL DEFAULT 'PROGRAMADA',

    observaciones TEXT,

    fecha\_creacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT\_TIMESTAMP,

    CONSTRAINT pk\_salidas\_tour  
        PRIMARY KEY (id\_salida),

    CONSTRAINT fk\_salidas\_tour\_tour  
        FOREIGN KEY (id\_tour)  
        REFERENCES tours(id\_tour)  
        ON DELETE RESTRICT,

    CONSTRAINT fk\_salidas\_tour\_guia  
        FOREIGN KEY (id\_guia)  
        REFERENCES guias(id\_guia)  
        ON DELETE SET NULL,

    CONSTRAINT uq\_salida\_tour\_fecha\_hora  
        UNIQUE (  
            id\_tour,  
            fecha\_salida,  
            hora\_salida  
        ),

    CONSTRAINT chk\_salida\_cupo\_maximo  
        CHECK (cupo\_maximo \> 0),

    CONSTRAINT chk\_salida\_cupos\_disponibles  
        CHECK (  
            cupos\_disponibles \>= 0  
            AND cupos\_disponibles \<= cupo\_maximo  
        ),

    CONSTRAINT chk\_salida\_horas  
        CHECK (  
            hora\_finalizacion IS NULL  
            OR hora\_finalizacion \> hora\_salida  
        )  
);

\-- \============================================================  
\-- 18\. TABLA: RESERVAS  
\-- \============================================================

CREATE TABLE reservas (  
    id\_reserva BIGINT GENERATED ALWAYS AS IDENTITY,

    codigo\_reserva VARCHAR(30) NOT NULL,

    id\_turista BIGINT NOT NULL,

    id\_salida BIGINT NOT NULL,

    cantidad\_adultos INTEGER NOT NULL DEFAULT 1,

    cantidad\_ninos INTEGER NOT NULL DEFAULT 0,

    precio\_unitario NUMERIC(12,2) NOT NULL,

    descuento NUMERIC(12,2) NOT NULL DEFAULT 0,

    subtotal NUMERIC(12,2) NOT NULL,

    total NUMERIC(12,2) NOT NULL,

    estado estado\_reserva NOT NULL DEFAULT 'PENDIENTE',

    fecha\_reserva TIMESTAMPTZ NOT NULL DEFAULT CURRENT\_TIMESTAMP,

    fecha\_cancelacion TIMESTAMPTZ,

    motivo\_cancelacion TEXT,

    observaciones TEXT,

    CONSTRAINT pk\_reservas  
        PRIMARY KEY (id\_reserva),

    CONSTRAINT uq\_reservas\_codigo  
        UNIQUE (codigo\_reserva),

    CONSTRAINT fk\_reservas\_turista  
        FOREIGN KEY (id\_turista)  
        REFERENCES turistas(id\_turista)  
        ON DELETE RESTRICT,

    CONSTRAINT fk\_reservas\_salida  
        FOREIGN KEY (id\_salida)  
        REFERENCES salidas\_tour(id\_salida)  
        ON DELETE RESTRICT,

    CONSTRAINT chk\_reservas\_adultos  
        CHECK (cantidad\_adultos \>= 0),

    CONSTRAINT chk\_reservas\_ninos  
        CHECK (cantidad\_ninos \>= 0),

    CONSTRAINT chk\_reservas\_personas  
        CHECK (  
            cantidad\_adultos \+ cantidad\_ninos \> 0  
        ),

    CONSTRAINT chk\_reservas\_precio  
        CHECK (precio\_unitario \>= 0),

    CONSTRAINT chk\_reservas\_descuento  
        CHECK (descuento \>= 0),

    CONSTRAINT chk\_reservas\_subtotal  
        CHECK (subtotal \>= 0),

    CONSTRAINT chk\_reservas\_total  
        CHECK (total \>= 0),

    CONSTRAINT chk\_reservas\_cancelacion  
        CHECK (  
            estado \<\> 'CANCELADA'  
            OR fecha\_cancelacion IS NOT NULL  
        )  
);

\-- \============================================================  
\-- 19\. TABLA: RESERVA\_PARTICIPANTES  
\-- \============================================================

CREATE TABLE reserva\_participantes (  
    id\_participante BIGINT GENERATED ALWAYS AS IDENTITY,

    id\_reserva BIGINT NOT NULL,

    nombres VARCHAR(100) NOT NULL,

    apellidos VARCHAR(100) NOT NULL,

    tipo\_documento tipo\_documento,

    numero\_documento VARCHAR(30),

    fecha\_nacimiento DATE,

    nacionalidad VARCHAR(100),

    es\_titular BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT pk\_reserva\_participantes  
        PRIMARY KEY (id\_participante),

    CONSTRAINT fk\_reserva\_participantes\_reserva  
        FOREIGN KEY (id\_reserva)  
        REFERENCES reservas(id\_reserva)  
        ON DELETE CASCADE,

    CONSTRAINT chk\_participante\_fecha\_nacimiento  
        CHECK (  
            fecha\_nacimiento IS NULL  
            OR fecha\_nacimiento \<= CURRENT\_DATE  
        )  
);

\-- \============================================================  
\-- 20\. TABLA: GRUPOS  
\-- \============================================================

CREATE TABLE grupos (  
    id\_grupo BIGINT GENERATED ALWAYS AS IDENTITY,

    nombre VARCHAR(150) NOT NULL,

    descripcion TEXT,

    estado BOOLEAN NOT NULL DEFAULT TRUE,

    fecha\_creacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT\_TIMESTAMP,

    CONSTRAINT pk\_grupos  
        PRIMARY KEY (id\_grupo)  
);

\-- \============================================================  
\-- 21\. TABLA INTERMEDIA: GRUPO\_TURISTAS  
\-- \============================================================

CREATE TABLE grupo\_turistas (  
    id\_grupo BIGINT NOT NULL,

    id\_turista BIGINT NOT NULL,

    fecha\_asignacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT\_TIMESTAMP,

    CONSTRAINT pk\_grupo\_turistas  
        PRIMARY KEY (id\_grupo, id\_turista),

    CONSTRAINT fk\_grupo\_turistas\_grupo  
        FOREIGN KEY (id\_grupo)  
        REFERENCES grupos(id\_grupo)  
        ON DELETE CASCADE,

    CONSTRAINT fk\_grupo\_turistas\_turista  
        FOREIGN KEY (id\_turista)  
        REFERENCES turistas(id\_turista)  
        ON DELETE CASCADE  
);

\-- \============================================================  
\-- 22\. TABLA INTERMEDIA: GRUPO\_TOURS  
\-- \============================================================

CREATE TABLE grupo\_tours (  
    id\_grupo BIGINT NOT NULL,

    id\_salida BIGINT NOT NULL,

    fecha\_asignacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT\_TIMESTAMP,

    CONSTRAINT pk\_grupo\_tours  
        PRIMARY KEY (id\_grupo, id\_salida),

    CONSTRAINT fk\_grupo\_tours\_grupo  
        FOREIGN KEY (id\_grupo)  
        REFERENCES grupos(id\_grupo)  
        ON DELETE CASCADE,

    CONSTRAINT fk\_grupo\_tours\_salida  
        FOREIGN KEY (id\_salida)  
        REFERENCES salidas\_tour(id\_salida)  
        ON DELETE CASCADE  
);

\-- \============================================================  
\-- 23\. TABLA: METODOS\_PAGO  
\-- \============================================================

CREATE TABLE metodos\_pago (  
    id\_metodo\_pago BIGINT GENERATED ALWAYS AS IDENTITY,

    nombre VARCHAR(50) NOT NULL,

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT pk\_metodos\_pago  
        PRIMARY KEY (id\_metodo\_pago),

    CONSTRAINT uq\_metodos\_pago\_nombre  
        UNIQUE (nombre)  
);

\-- \============================================================  
\-- 24\. TABLA: VENTAS  
\-- \============================================================

CREATE TABLE ventas (  
    id\_venta BIGINT GENERATED ALWAYS AS IDENTITY,

    id\_reserva BIGINT NOT NULL,

    numero\_venta VARCHAR(30) NOT NULL,

    subtotal NUMERIC(12,2) NOT NULL,

    impuestos NUMERIC(12,2) NOT NULL DEFAULT 0,

    descuento NUMERIC(12,2) NOT NULL DEFAULT 0,

    total NUMERIC(12,2) NOT NULL,

    estado estado\_venta NOT NULL DEFAULT 'PENDIENTE',

    fecha\_venta TIMESTAMPTZ NOT NULL DEFAULT CURRENT\_TIMESTAMP,

    CONSTRAINT pk\_ventas  
        PRIMARY KEY (id\_venta),

    CONSTRAINT uq\_ventas\_reserva  
        UNIQUE (id\_reserva),

    CONSTRAINT uq\_ventas\_numero  
        UNIQUE (numero\_venta),

    CONSTRAINT fk\_ventas\_reserva  
        FOREIGN KEY (id\_reserva)  
        REFERENCES reservas(id\_reserva)  
        ON DELETE RESTRICT,

    CONSTRAINT chk\_ventas\_subtotal  
        CHECK (subtotal \>= 0),

    CONSTRAINT chk\_ventas\_impuestos  
        CHECK (impuestos \>= 0),

    CONSTRAINT chk\_ventas\_descuento  
        CHECK (descuento \>= 0),

    CONSTRAINT chk\_ventas\_total  
        CHECK (total \>= 0\)  
);

\-- \============================================================  
\-- 25\. TABLA: ABONOS  
\-- \============================================================

CREATE TABLE abonos (  
    id\_abono BIGINT GENERATED ALWAYS AS IDENTITY,

    id\_venta BIGINT NOT NULL,

    id\_metodo\_pago BIGINT NOT NULL,

    monto NUMERIC(12,2) NOT NULL,

    referencia VARCHAR(100),

    comprobante\_url TEXT,

    fecha\_abono TIMESTAMPTZ NOT NULL DEFAULT CURRENT\_TIMESTAMP,

    observaciones TEXT,

    CONSTRAINT pk\_abonos  
        PRIMARY KEY (id\_abono),

    CONSTRAINT fk\_abonos\_venta  
        FOREIGN KEY (id\_venta)  
        REFERENCES ventas(id\_venta)  
        ON DELETE RESTRICT,

    CONSTRAINT fk\_abonos\_metodo\_pago  
        FOREIGN KEY (id\_metodo\_pago)  
        REFERENCES metodos\_pago(id\_metodo\_pago)  
        ON DELETE RESTRICT,

    CONSTRAINT chk\_abonos\_monto  
        CHECK (monto \> 0\)  
);

\-- \============================================================  
\-- 26\. TABLA: FACTURAS  
\-- \============================================================

CREATE TABLE facturas (  
    id\_factura BIGINT GENERATED ALWAYS AS IDENTITY,

    id\_venta BIGINT NOT NULL,

    numero\_factura VARCHAR(50) NOT NULL,

    nombre\_cliente VARCHAR(200) NOT NULL,

    tipo\_documento tipo\_documento NOT NULL,

    numero\_documento VARCHAR(30) NOT NULL,

    direccion\_cliente VARCHAR(255),

    correo\_cliente VARCHAR(150),

    subtotal NUMERIC(12,2) NOT NULL,

    impuestos NUMERIC(12,2) NOT NULL DEFAULT 0,

    total NUMERIC(12,2) NOT NULL,

    estado estado\_factura NOT NULL DEFAULT 'PENDIENTE',

    fecha\_emision TIMESTAMPTZ,

    observaciones TEXT,

    CONSTRAINT pk\_facturas  
        PRIMARY KEY (id\_factura),

    CONSTRAINT uq\_facturas\_venta  
        UNIQUE (id\_venta),

    CONSTRAINT uq\_facturas\_numero  
        UNIQUE (numero\_factura),

    CONSTRAINT fk\_facturas\_venta  
        FOREIGN KEY (id\_venta)  
        REFERENCES ventas(id\_venta)  
        ON DELETE RESTRICT,

    CONSTRAINT chk\_facturas\_subtotal  
        CHECK (subtotal \>= 0),

    CONSTRAINT chk\_facturas\_impuestos  
        CHECK (impuestos \>= 0),

    CONSTRAINT chk\_facturas\_total  
        CHECK (total \>= 0\)  
);

\-- \============================================================  
\-- 27\. TABLA: RESENAS\_TOUR  
\-- \============================================================

CREATE TABLE resenas\_tour (  
    id\_resena BIGINT GENERATED ALWAYS AS IDENTITY,

    id\_turista BIGINT NOT NULL,

    id\_tour BIGINT NOT NULL,

    id\_reserva BIGINT,

    calificacion INTEGER NOT NULL,

    comentario TEXT,

    fecha\_creacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT\_TIMESTAMP,

    CONSTRAINT pk\_resenas\_tour  
        PRIMARY KEY (id\_resena),

    CONSTRAINT fk\_resenas\_tour\_turista  
        FOREIGN KEY (id\_turista)  
        REFERENCES turistas(id\_turista)  
        ON DELETE CASCADE,

    CONSTRAINT fk\_resenas\_tour\_tour  
        FOREIGN KEY (id\_tour)  
        REFERENCES tours(id\_tour)  
        ON DELETE CASCADE,

    CONSTRAINT fk\_resenas\_tour\_reserva  
        FOREIGN KEY (id\_reserva)  
        REFERENCES reservas(id\_reserva)  
        ON DELETE SET NULL,

    CONSTRAINT chk\_resenas\_tour\_calificacion  
        CHECK (calificacion BETWEEN 1 AND 5),

    CONSTRAINT uq\_resena\_turista\_tour  
        UNIQUE (id\_turista, id\_tour)  
);

\-- \============================================================  
\-- 28\. TABLA: RESENAS\_GUIA  
\-- \============================================================

CREATE TABLE resenas\_guia (  
    id\_resena BIGINT GENERATED ALWAYS AS IDENTITY,

    id\_turista BIGINT NOT NULL,

    id\_guia BIGINT NOT NULL,

    calificacion INTEGER NOT NULL,

    comentario TEXT,

    fecha\_creacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT\_TIMESTAMP,

    CONSTRAINT pk\_resenas\_guia  
        PRIMARY KEY (id\_resena),

    CONSTRAINT fk\_resenas\_guia\_turista  
        FOREIGN KEY (id\_turista)  
        REFERENCES turistas(id\_turista)  
        ON DELETE CASCADE,

    CONSTRAINT fk\_resenas\_guia\_guia  
        FOREIGN KEY (id\_guia)  
        REFERENCES guias(id\_guia)  
        ON DELETE CASCADE,

    CONSTRAINT chk\_resenas\_guia\_calificacion  
        CHECK (calificacion BETWEEN 1 AND 5),

    CONSTRAINT uq\_resena\_turista\_guia  
        UNIQUE (id\_turista, id\_guia)  
);

\-- \============================================================  
\-- 29\. TABLA: GUIAS\_FAVORITOS  
\-- \============================================================

CREATE TABLE guias\_favoritos (  
    id\_turista BIGINT NOT NULL,

    id\_guia BIGINT NOT NULL,

    fecha\_agregado TIMESTAMPTZ NOT NULL DEFAULT CURRENT\_TIMESTAMP,

    CONSTRAINT pk\_guias\_favoritos  
        PRIMARY KEY (id\_turista, id\_guia),

    CONSTRAINT fk\_guias\_favoritos\_turista  
        FOREIGN KEY (id\_turista)  
        REFERENCES turistas(id\_turista)  
        ON DELETE CASCADE,

    CONSTRAINT fk\_guias\_favoritos\_guia  
        FOREIGN KEY (id\_guia)  
        REFERENCES guias(id\_guia)  
        ON DELETE CASCADE  
);

\-- \============================================================  
\-- 30\. TABLA: PUBLICIDAD  
\-- \============================================================

CREATE TABLE publicidad (  
    id\_publicidad BIGINT GENERATED ALWAYS AS IDENTITY,

    titulo VARCHAR(150) NOT NULL,

    descripcion TEXT,

    imagen\_url TEXT,

    enlace TEXT,

    fecha\_inicio DATE NOT NULL,

    fecha\_fin DATE NOT NULL,

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT pk\_publicidad  
        PRIMARY KEY (id\_publicidad),

    CONSTRAINT chk\_publicidad\_fechas  
        CHECK (fecha\_fin \>= fecha\_inicio)  
);

\-- \============================================================  
\-- 31\. TABLA: TOKENS\_USUARIO  
\-- \============================================================

CREATE TABLE tokens\_usuario (  
    id\_token BIGINT GENERATED ALWAYS AS IDENTITY,

    id\_usuario BIGINT NOT NULL,

    tipo tipo\_token NOT NULL,

    token TEXT NOT NULL,

    fecha\_creacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT\_TIMESTAMP,

    fecha\_expiracion TIMESTAMPTZ NOT NULL,

    usado BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT pk\_tokens\_usuario  
        PRIMARY KEY (id\_token),

    CONSTRAINT fk\_tokens\_usuario  
        FOREIGN KEY (id\_usuario)  
        REFERENCES usuarios(id\_usuario)  
        ON DELETE CASCADE,

    CONSTRAINT uq\_tokens\_token  
        UNIQUE (token),

    CONSTRAINT chk\_tokens\_fecha  
        CHECK (fecha\_expiracion \> fecha\_creacion)  
);

\-- \============================================================  
\-- 32\. ÍNDICES  
\-- \============================================================

CREATE INDEX idx\_usuarios\_estado  
ON usuarios(estado);

CREATE INDEX idx\_usuarios\_nombre  
ON usuarios(apellido, nombre);

CREATE INDEX idx\_turistas\_nacionalidad  
ON turistas(nacionalidad);

CREATE INDEX idx\_turistas\_ciudad  
ON turistas(ciudad\_residencia);

CREATE INDEX idx\_guias\_activo  
ON guias(activo);

CREATE INDEX idx\_guias\_disponibilidad  
ON guias(disponibilidad);

CREATE INDEX idx\_tours\_categoria  
ON tours(id\_categoria);

CREATE INDEX idx\_tours\_estado  
ON tours(estado);

CREATE INDEX idx\_tours\_nombre  
ON tours(nombre);

CREATE INDEX idx\_salidas\_tour\_tour  
ON salidas\_tour(id\_tour);

CREATE INDEX idx\_salidas\_tour\_guia  
ON salidas\_tour(id\_guia);

CREATE INDEX idx\_salidas\_tour\_fecha  
ON salidas\_tour(fecha\_salida);

CREATE INDEX idx\_salidas\_tour\_estado  
ON salidas\_tour(estado);

CREATE INDEX idx\_reservas\_turista  
ON reservas(id\_turista);

CREATE INDEX idx\_reservas\_salida  
ON reservas(id\_salida);

CREATE INDEX idx\_reservas\_estado  
ON reservas(estado);

CREATE INDEX idx\_reservas\_fecha  
ON reservas(fecha\_reserva);

CREATE INDEX idx\_participantes\_reserva  
ON reserva\_participantes(id\_reserva);

CREATE INDEX idx\_ventas\_estado  
ON ventas(estado);

CREATE INDEX idx\_abonos\_venta  
ON abonos(id\_venta);

CREATE INDEX idx\_facturas\_estado  
ON facturas(estado);

CREATE INDEX idx\_resenas\_tour\_tour  
ON resenas\_tour(id\_tour);

CREATE INDEX idx\_resenas\_guia\_guia  
ON resenas\_guia(id\_guia);

CREATE INDEX idx\_publicidad\_fechas  
ON publicidad(fecha\_inicio, fecha\_fin);

CREATE INDEX idx\_tokens\_usuario  
ON tokens\_usuario(id\_usuario);

CREATE INDEX idx\_tokens\_expiracion  
ON tokens\_usuario(fecha\_expiracion);

\-- \============================================================  
\-- 33\. TRIGGER PARA ACTUALIZAR FECHA DE MODIFICACIÓN  
\-- \============================================================

CREATE OR REPLACE FUNCTION actualizar\_fecha\_modificacion()  
RETURNS TRIGGER  
LANGUAGE plpgsql  
AS $$  
BEGIN  
    NEW.fecha\_actualizacion \= CURRENT\_TIMESTAMP;

    RETURN NEW;  
END;  
$$;

CREATE TRIGGER trg\_usuarios\_fecha\_actualizacion  
BEFORE UPDATE ON usuarios  
FOR EACH ROW  
EXECUTE FUNCTION actualizar\_fecha\_modificacion();

CREATE TRIGGER trg\_tours\_fecha\_actualizacion  
BEFORE UPDATE ON tours  
FOR EACH ROW  
EXECUTE FUNCTION actualizar\_fecha\_modificacion();

\-- \============================================================  
\-- 34\. FUNCIÓN PARA ACTUALIZAR CUPOS  
\-- \============================================================

CREATE OR REPLACE FUNCTION actualizar\_cupos\_salida()  
RETURNS TRIGGER  
LANGUAGE plpgsql  
AS $$  
DECLARE  
    diferencia INTEGER;  
BEGIN

    IF TG\_OP \= 'INSERT' THEN

        IF NEW.estado IN ('PENDIENTE', 'CONFIRMADA') THEN

            UPDATE salidas\_tour  
            SET cupos\_disponibles \=  
                cupos\_disponibles  
                \-  
                (NEW.cantidad\_adultos \+ NEW.cantidad\_ninos)

            WHERE id\_salida \= NEW.id\_salida  
            AND cupos\_disponibles \>=  
                (NEW.cantidad\_adultos \+ NEW.cantidad\_ninos);

            IF NOT FOUND THEN  
                RAISE EXCEPTION  
                'No hay suficientes cupos disponibles para la salida %',  
                NEW.id\_salida;  
            END IF;

        END IF;

        RETURN NEW;

    END IF;

    IF TG\_OP \= 'UPDATE' THEN

        IF OLD.estado NOT IN ('CANCELADA')  
           AND NEW.estado \= 'CANCELADA' THEN

            UPDATE salidas\_tour  
            SET cupos\_disponibles \=  
                cupos\_disponibles  
                \+  
                (OLD.cantidad\_adultos \+ OLD.cantidad\_ninos)

            WHERE id\_salida \= OLD.id\_salida;

        END IF;

        IF OLD.estado \= 'CANCELADA'  
           AND NEW.estado IN ('PENDIENTE', 'CONFIRMADA') THEN

            UPDATE salidas\_tour  
            SET cupos\_disponibles \=  
                cupos\_disponibles  
                \-  
                (NEW.cantidad\_adultos \+ NEW.cantidad\_ninos)

            WHERE id\_salida \= NEW.id\_salida  
            AND cupos\_disponibles \>=  
                (NEW.cantidad\_adultos \+ NEW.cantidad\_ninos);

            IF NOT FOUND THEN  
                RAISE EXCEPTION  
                'No hay suficientes cupos disponibles para la salida %',  
                NEW.id\_salida;  
            END IF;

        END IF;

        RETURN NEW;

    END IF;

    IF TG\_OP \= 'DELETE' THEN

        IF OLD.estado IN ('PENDIENTE', 'CONFIRMADA') THEN

            UPDATE salidas\_tour  
            SET cupos\_disponibles \=  
                cupos\_disponibles  
                \+  
                (OLD.cantidad\_adultos \+ OLD.cantidad\_ninos)

            WHERE id\_salida \= OLD.id\_salida;

        END IF;

        RETURN OLD;

    END IF;

    RETURN NULL;

END;  
$$;

CREATE TRIGGER trg\_actualizar\_cupos\_reserva  
AFTER INSERT OR UPDATE OR DELETE  
ON reservas  
FOR EACH ROW  
EXECUTE FUNCTION actualizar\_cupos\_salida();

\-- \============================================================  
\-- 35\. FUNCIÓN PARA ACTUALIZAR ESTADO DE SALIDA  
\-- \============================================================

CREATE OR REPLACE FUNCTION actualizar\_estado\_salida()  
RETURNS TRIGGER  
LANGUAGE plpgsql  
AS $$  
BEGIN

    IF NEW.cupos\_disponibles \= 0 THEN

        NEW.estado \= 'COMPLETA';

    ELSIF NEW.cupos\_disponibles \> 0  
          AND NEW.estado \= 'COMPLETA' THEN

        NEW.estado \= 'DISPONIBLE';

    END IF;

    RETURN NEW;

END;  
$$;

CREATE TRIGGER trg\_estado\_salida  
BEFORE UPDATE OF cupos\_disponibles  
ON salidas\_tour  
FOR EACH ROW  
EXECUTE FUNCTION actualizar\_estado\_salida();

\-- \============================================================  
\-- 36\. DATOS INICIALES: ROLES  
\-- \============================================================

INSERT INTO roles (  
    nombre,  
    descripcion  
)  
VALUES  
(  
    'ADMINISTRADOR',  
    'Gestiona completamente el sistema'  
),  
(  
    'GUIA',  
    'Gestiona su información y actividades como guía turístico'  
),  
(  
    'TURISTA',  
    'Consulta tours, realiza reservas y califica experiencias'  
);

\-- \============================================================  
\-- 37\. DATOS INICIALES: PERMISOS  
\-- \============================================================

INSERT INTO permisos (  
    nombre,  
    descripcion  
)  
VALUES  
('GESTIONAR\_USUARIOS', 'Crear, editar y gestionar usuarios'),  
('GESTIONAR\_ROLES', 'Gestionar roles y permisos'),  
('GESTIONAR\_GUIAS', 'Crear y gestionar guías'),  
('GESTIONAR\_TURISTAS', 'Gestionar turistas'),  
('GESTIONAR\_CATEGORIAS', 'Gestionar categorías de tours'),  
('GESTIONAR\_TOURS', 'Crear, editar y eliminar tours'),  
('GESTIONAR\_SALIDAS', 'Gestionar fechas y cupos'),  
('GESTIONAR\_RESERVAS', 'Gestionar reservas'),  
('GESTIONAR\_VENTAS', 'Gestionar ventas'),  
('GESTIONAR\_PAGOS', 'Gestionar abonos y pagos'),  
('GESTIONAR\_FACTURAS', 'Gestionar facturación'),  
('GESTIONAR\_PUBLICIDAD', 'Gestionar publicidad'),  
('VER\_REPORTES', 'Consultar reportes'),  
('CREAR\_RESERVA', 'Crear reservas'),  
('CREAR\_RESENA', 'Crear reseñas'),  
('GESTIONAR\_FAVORITOS', 'Gestionar guías favoritos');

\-- \============================================================  
\-- 38\. ASIGNAR TODOS LOS PERMISOS AL ADMINISTRADOR  
\-- \============================================================

INSERT INTO rol\_permisos (  
    id\_rol,  
    id\_permiso  
)  
SELECT  
    r.id\_rol,  
    p.id\_permiso  
FROM roles r  
CROSS JOIN permisos p  
WHERE r.nombre \= 'ADMINISTRADOR';

\-- \============================================================  
\-- 39\. USUARIOS DE PRUEBA  
\-- \============================================================

INSERT INTO usuarios (  
    nombre,  
    apellido,  
    correo,  
    telefono,  
    password\_hash,  
    estado,  
    correo\_verificado  
)  
VALUES  
(  
    'Carlos',  
    'Administrador',  
    'admin@artetours.com',  
    '3001112233',  
    '$2a$11$HASH\_DE\_PRUEBA\_ADMIN',  
    'ACTIVO',  
    TRUE  
),  
(  
    'Juan',  
    'Pérez',  
    'juan.guia@artetours.com',  
    '3012223344',  
    '$2a$11$HASH\_DE\_PRUEBA\_GUIA',  
    'ACTIVO',  
    TRUE  
),  
(  
    'María',  
    'Gómez',  
    'maria.turista@gmail.com',  
    '3023334455',  
    '$2a$11$HASH\_DE\_PRUEBA\_TURISTA',  
    'ACTIVO',  
    TRUE  
),  
(  
    'Andrés',  
    'Rodríguez',  
    'andres.turista@gmail.com',  
    '3034445566',  
    '$2a$11$HASH\_DE\_PRUEBA\_TURISTA\_2',  
    'ACTIVO',  
    TRUE  
);

\-- \============================================================  
\-- 40\. ASIGNAR ROLES  
\-- \============================================================

INSERT INTO usuario\_roles (  
    id\_usuario,  
    id\_rol  
)  
SELECT  
    u.id\_usuario,  
    r.id\_rol  
FROM usuarios u  
CROSS JOIN roles r  
WHERE  
(  
    u.correo \= 'admin@artetours.com'  
    AND r.nombre \= 'ADMINISTRADOR'  
)  
OR  
(  
    u.correo \= 'juan.guia@artetours.com'  
    AND r.nombre \= 'GUIA'  
)  
OR  
(  
    u.correo IN (  
        'maria.turista@gmail.com',  
        'andres.turista@gmail.com'  
    )  
    AND r.nombre \= 'TURISTA'  
);

\-- \============================================================  
\-- 41\. PERFIL DEL GUÍA  
\-- \============================================================

INSERT INTO guias (  
    id\_guia,  
    tipo\_documento,  
    numero\_documento,  
    fecha\_nacimiento,  
    genero,  
    nacionalidad,  
    pais\_residencia,  
    ciudad\_residencia,  
    direccion,  
    especialidad,  
    biografia,  
    experiencia\_anios,  
    foto\_url  
)  
SELECT  
    id\_usuario,  
    'CC',  
    '1030000001',  
    '1990-04-15',  
    'MASCULINO',  
    'Colombiana',  
    'Colombia',  
    'Medellín',  
    'Carrera 50 \# 10-20',  
    'Turismo cultural e histórico',  
    'Guía especializado en experiencias culturales, históricas y de arte urbano en Medellín.',  
    8,  
    'https://ejemplo.com/artetours/guias/juan-perez.jpg'  
FROM usuarios  
WHERE correo \= 'juan.guia@artetours.com';

\-- \============================================================  
\-- 42\. PERFILES DE TURISTAS  
\-- \============================================================

INSERT INTO turistas (  
    id\_turista,  
    tipo\_documento,  
    numero\_documento,  
    fecha\_nacimiento,  
    genero,  
    nacionalidad,  
    pais\_residencia,  
    ciudad\_residencia,  
    direccion,  
    contacto\_emergencia\_nombre,  
    contacto\_emergencia\_telefono,  
    contacto\_emergencia\_parentesco,  
    preferencias,  
    observaciones  
)  
SELECT  
    id\_usuario,  
    'CC',  
    '1001001001',  
    '1995-08-20',  
    'FEMENINO',  
    'Colombiana',  
    'Colombia',  
    'Medellín',  
    'Carrera 45 \# 20-30',  
    'Laura Gómez',  
    '3005556677',  
    'Hermana',  
    'Cultura, gastronomía, fotografía y arte urbano',  
    'Prefiere tours en horas de la mañana.'  
FROM usuarios  
WHERE correo \= 'maria.turista@gmail.com';

INSERT INTO turistas (  
    id\_turista,  
    tipo\_documento,  
    numero\_documento,  
    fecha\_nacimiento,  
    genero,  
    nacionalidad,  
    pais\_residencia,  
    ciudad\_residencia,  
    direccion,  
    contacto\_emergencia\_nombre,  
    contacto\_emergencia\_telefono,  
    contacto\_emergencia\_parentesco,  
    preferencias  
)  
SELECT  
    id\_usuario,  
    'CC',  
    '1002002002',  
    '1992-02-10',  
    'MASCULINO',  
    'Colombiana',  
    'Colombia',  
    'Bogotá',  
    'Calle 80 \# 20-40',  
    'Carlos Rodríguez',  
    '3017778899',  
    'Padre',  
    'Naturaleza, aventura y senderismo'  
FROM usuarios  
WHERE correo \= 'andres.turista@gmail.com';

\-- \============================================================  
\-- 43\. IDIOMAS  
\-- \============================================================

INSERT INTO idiomas (  
    nombre  
)  
VALUES  
('ESPAÑOL'),  
('INGLÉS'),  
('FRANCÉS'),  
('PORTUGUÉS'),  
('ALEMÁN');

\-- \============================================================  
\-- 44\. IDIOMAS DEL GUÍA  
\-- \============================================================

INSERT INTO guia\_idiomas (  
    id\_guia,  
    id\_idioma,  
    nivel  
)  
SELECT  
    g.id\_guia,  
    i.id\_idioma,  
    'NATIVO'  
FROM guias g  
CROSS JOIN idiomas i  
WHERE  
    g.numero\_documento \= '1030000001'  
    AND i.nombre \= 'ESPAÑOL';

INSERT INTO guia\_idiomas (  
    id\_guia,  
    id\_idioma,  
    nivel  
)  
SELECT  
    g.id\_guia,  
    i.id\_idioma,  
    'AVANZADO'  
FROM guias g  
CROSS JOIN idiomas i  
WHERE  
    g.numero\_documento \= '1030000001'  
    AND i.nombre \= 'INGLÉS';

\-- \============================================================  
\-- 45\. CERTIFICACIONES  
\-- \============================================================

INSERT INTO certificaciones (  
    nombre,  
    entidad\_emisora  
)  
VALUES  
(  
    'Guianza Turística',  
    'SENA'  
),  
(  
    'Primeros Auxilios',  
    'Cruz Roja Colombiana'  
),  
(  
    'Turismo Cultural',  
    'Ministerio de Comercio, Industria y Turismo'  
);

\-- \============================================================  
\-- 46\. CERTIFICACIÓN DEL GUÍA  
\-- \============================================================

INSERT INTO guia\_certificaciones (  
    id\_guia,  
    id\_certificacion,  
    fecha\_obtencion,  
    numero\_certificado  
)  
SELECT  
    g.id\_guia,  
    c.id\_certificacion,  
    '2020-05-10',  
    'CERT-GUIA-001'  
FROM guias g  
CROSS JOIN certificaciones c  
WHERE  
    g.numero\_documento \= '1030000001'  
    AND c.nombre \= 'Guianza Turística';

\-- \============================================================  
\-- 47\. CATEGORÍAS DE TOURS  
\-- \============================================================

INSERT INTO categorias\_tour (  
    nombre,  
    descripcion  
)  
VALUES  
(  
    'Cultura',  
    'Experiencias culturales y expresiones tradicionales'  
),  
(  
    'Historia',  
    'Recorridos por lugares históricos'  
),  
(  
    'Gastronomía',  
    'Experiencias gastronómicas'  
),  
(  
    'Aventura',  
    'Actividades de aventura y naturaleza'  
),  
(  
    'Arte',  
    'Recorridos relacionados con arte y expresiones urbanas'  
);

\-- \============================================================  
\-- 48\. TOURS  
\-- \============================================================

INSERT INTO tours (  
    id\_categoria,  
    nombre,  
    descripcion,  
    duracion\_horas,  
    precio\_base,  
    punto\_encuentro,  
    destino,  
    latitud,  
    longitud,  
    dificultad,  
    edad\_minima,  
    edad\_maxima,  
    capacidad\_maxima,  
    incluye,  
    no\_incluye,  
    recomendaciones,  
    politica\_cancelacion,  
    estado  
)  
SELECT  
    c.id\_categoria,  
    'Tour Comuna 13',  
    'Recorrido cultural por la Comuna 13 de Medellín, conociendo su historia, arte urbano, transformación social y cultura.',  
    3.50,  
    80000,  
    'Estación San Javier',  
    'Comuna 13 \- Medellín',  
    6.2564,  
    \-75.6132,  
    'FÁCIL',  
    8,  
    NULL,  
    20,  
    'Guía turístico, recorrido cultural y acompañamiento.',  
    'Alimentación y gastos personales.',  
    'Usar ropa cómoda, llevar hidratación y protección solar.',  
    'Cancelación gratuita hasta 24 horas antes del tour.',  
    'ACTIVO'  
FROM categorias\_tour c  
WHERE c.nombre \= 'Cultura';

INSERT INTO tours (  
    id\_categoria,  
    nombre,  
    descripcion,  
    duracion\_horas,  
    precio\_base,  
    punto\_encuentro,  
    destino,  
    latitud,  
    longitud,  
    dificultad,  
    edad\_minima,  
    capacidad\_maxima,  
    incluye,  
    no\_incluye,  
    recomendaciones,  
    politica\_cancelacion,  
    estado  
)  
SELECT  
    c.id\_categoria,  
    'Tour Centro Histórico de Medellín',  
    'Recorrido por los principales lugares históricos y culturales del centro de Medellín.',  
    3.00,  
    70000,  
    'Plaza Botero',  
    'Centro de Medellín',  
    6.2518,  
    \-75.5636,  
    'FÁCIL',  
    5,  
    15,  
    'Guía turístico y recorrido histórico.',  
    'Alimentación y compras personales.',  
    'Usar ropa cómoda y llevar hidratación.',  
    'Cancelación gratuita hasta 24 horas antes.',  
    'ACTIVO'  
FROM categorias\_tour c  
WHERE c.nombre \= 'Historia';

INSERT INTO tours (  
    id\_categoria,  
    nombre,  
    descripcion,  
    duracion\_horas,  
    precio\_base,  
    punto\_encuentro,  
    destino,  
    latitud,  
    longitud,  
    dificultad,  
    edad\_minima,  
    capacidad\_maxima,  
    incluye,  
    no\_incluye,  
    recomendaciones,  
    politica\_cancelacion,  
    estado  
)  
SELECT  
    c.id\_categoria,  
    'Experiencia Gastronómica Paisa',  
    'Experiencia para conocer los sabores tradicionales de Antioquia.',  
    4.00,  
    120000,  
    'Parque Lleras',  
    'El Poblado \- Medellín',  
    6.2088,  
    \-75.5677,  
    'FÁCIL',  
    12,  
    12,  
    'Degustaciones incluidas y acompañamiento de guía.',  
    'Bebidas alcohólicas y gastos adicionales.',  
    'Informar previamente sobre alergias alimentarias.',  
    'Cancelación gratuita hasta 48 horas antes.',  
    'ACTIVO'  
FROM categorias\_tour c  
WHERE c.nombre \= 'Gastronomía';

\-- \============================================================  
\-- 49\. REQUISITOS  
\-- \============================================================

INSERT INTO tour\_requisitos (  
    id\_tour,  
    descripcion  
)  
SELECT  
    id\_tour,  
    'Llevar documento de identidad'  
FROM tours  
WHERE nombre \= 'Tour Comuna 13';

INSERT INTO tour\_requisitos (  
    id\_tour,  
    descripcion  
)  
SELECT  
    id\_tour,  
    'Usar ropa y calzado cómodo'  
FROM tours  
WHERE nombre \= 'Tour Comuna 13';

INSERT INTO tour\_requisitos (  
    id\_tour,  
    descripcion  
)  
SELECT  
    id\_tour,  
    'Llevar hidratación'  
FROM tours  
WHERE nombre \= 'Tour Comuna 13';

\-- \============================================================  
\-- 50\. IMÁGENES  
\-- \============================================================

INSERT INTO tour\_imagenes (  
    id\_tour,  
    url,  
    titulo,  
    descripcion,  
    principal,  
    orden  
)  
SELECT  
    id\_tour,  
    'https://ejemplo.com/artetours/comuna13-1.jpg',  
    'Arte urbano de la Comuna 13',  
    'Mural representativo de la Comuna 13.',  
    TRUE,  
    1  
FROM tours  
WHERE nombre \= 'Tour Comuna 13';

INSERT INTO tour\_imagenes (  
    id\_tour,  
    url,  
    titulo,  
    descripcion,  
    principal,  
    orden  
)  
SELECT  
    id\_tour,  
    'https://ejemplo.com/artetours/comuna13-2.jpg',  
    'Recorrido por la Comuna 13',  
    'Imagen de un recorrido turístico.',  
    FALSE,  
    2  
FROM tours  
WHERE nombre \= 'Tour Comuna 13';

\-- \============================================================  
\-- 51\. SALIDAS  
\-- \============================================================

INSERT INTO salidas\_tour (  
    id\_tour,  
    id\_guia,  
    fecha\_salida,  
    hora\_salida,  
    hora\_finalizacion,  
    cupo\_maximo,  
    cupos\_disponibles,  
    estado  
)  
SELECT  
    t.id\_tour,  
    g.id\_guia,  
    CURRENT\_DATE \+ 10,  
    '09:00:00',  
    '12:30:00',  
    20,  
    20,  
    'DISPONIBLE'  
FROM tours t  
CROSS JOIN guias g  
WHERE  
    t.nombre \= 'Tour Comuna 13'  
    AND g.numero\_documento \= '1030000001';

INSERT INTO salidas\_tour (  
    id\_tour,  
    id\_guia,  
    fecha\_salida,  
    hora\_salida,  
    hora\_finalizacion,  
    cupo\_maximo,  
    cupos\_disponibles,  
    estado  
)  
SELECT  
    t.id\_tour,  
    g.id\_guia,  
    CURRENT\_DATE \+ 20,  
    '10:00:00',  
    '13:00:00',  
    15,  
    15,  
    'DISPONIBLE'  
FROM tours t  
CROSS JOIN guias g  
WHERE  
    t.nombre \= 'Tour Centro Histórico de Medellín'  
    AND g.numero\_documento \= '1030000001';

\-- \============================================================  
\-- 52\. MÉTODOS DE PAGO  
\-- \============================================================

INSERT INTO metodos\_pago (  
    nombre  
)  
VALUES  
('EFECTIVO'),  
('TRANSFERENCIA'),  
('TARJETA\_CREDITO'),  
('TARJETA\_DEBITO'),  
('PSE');

\-- \============================================================  
\-- 53\. RESERVA DE PRUEBA  
\-- \============================================================

INSERT INTO reservas (  
    codigo\_reserva,  
    id\_turista,  
    id\_salida,  
    cantidad\_adultos,  
    cantidad\_ninos,  
    precio\_unitario,  
    descuento,  
    subtotal,  
    total,  
    estado,  
    observaciones  
)  
SELECT  
    'RES-000001',  
    t.id\_turista,  
    s.id\_salida,  
    2,  
    0,  
    80000,  
    0,  
    160000,  
    160000,  
    'CONFIRMADA',  
    'Reserva de prueba para dos adultos.'  
FROM turistas t  
CROSS JOIN salidas\_tour s  
WHERE  
    t.numero\_documento \= '1001001001'  
    AND s.id\_salida \= (  
        SELECT MIN(id\_salida)  
        FROM salidas\_tour  
    );

\-- \============================================================  
\-- 54\. PARTICIPANTES DE LA RESERVA  
\-- \============================================================

INSERT INTO reserva\_participantes (  
    id\_reserva,  
    nombres,  
    apellidos,  
    tipo\_documento,  
    numero\_documento,  
    fecha\_nacimiento,  
    nacionalidad,  
    es\_titular  
)  
SELECT  
    r.id\_reserva,  
    'María',  
    'Gómez',  
    'CC',  
    '1001001001',  
    '1995-08-20',  
    'Colombiana',  
    TRUE  
FROM reservas r  
WHERE r.codigo\_reserva \= 'RES-000001';

INSERT INTO reserva\_participantes (  
    id\_reserva,  
    nombres,  
    apellidos,  
    tipo\_documento,  
    numero\_documento,  
    fecha\_nacimiento,  
    nacionalidad,  
    es\_titular  
)  
SELECT  
    r.id\_reserva,  
    'Laura',  
    'Gómez',  
    'CC',  
    '1001001003',  
    '1996-03-15',  
    'Colombiana',  
    FALSE  
FROM reservas r  
WHERE r.codigo\_reserva \= 'RES-000001';

\-- \============================================================  
\-- 55\. VENTA  
\-- \============================================================

INSERT INTO ventas (  
    id\_reserva,  
    numero\_venta,  
    subtotal,  
    impuestos,  
    descuento,  
    total,  
    estado  
)  
SELECT  
    id\_reserva,  
    'VT-000001',  
    160000,  
    0,  
    0,  
    160000,  
    'PARCIAL'  
FROM reservas  
WHERE codigo\_reserva \= 'RES-000001';

\-- \============================================================  
\-- 56\. ABONO  
\-- \============================================================

INSERT INTO abonos (  
    id\_venta,  
    id\_metodo\_pago,  
    monto,  
    referencia,  
    comprobante\_url,  
    observaciones  
)  
SELECT  
    v.id\_venta,  
    m.id\_metodo\_pago,  
    80000,  
    'TRX-DEMO-0001',  
    'https://ejemplo.com/comprobantes/trx-demo-0001.jpg',  
    'Abono inicial de la reserva.'  
FROM ventas v  
CROSS JOIN metodos\_pago m  
WHERE  
    v.numero\_venta \= 'VT-000001'  
    AND m.nombre \= 'TRANSFERENCIA';

\-- \============================================================  
\-- 57\. FACTURA  
\-- \============================================================

INSERT INTO facturas (  
    id\_venta,  
    numero\_factura,  
    nombre\_cliente,  
    tipo\_documento,  
    numero\_documento,  
    direccion\_cliente,  
    correo\_cliente,  
    subtotal,  
    impuestos,  
    total,  
    estado,  
    fecha\_emision  
)  
SELECT  
    v.id\_venta,  
    'FAC-000001',  
    u.nombre || ' ' || u.apellido,  
    t.tipo\_documento,  
    t.numero\_documento,  
    t.direccion,  
    u.correo,  
    v.subtotal,  
    v.impuestos,  
    v.total,  
    'EMITIDA',  
    CURRENT\_TIMESTAMP  
FROM ventas v  
INNER JOIN reservas r  
    ON v.id\_reserva \= r.id\_reserva  
INNER JOIN turistas t  
    ON r.id\_turista \= t.id\_turista  
INNER JOIN usuarios u  
    ON t.id\_turista \= u.id\_usuario  
WHERE v.numero\_venta \= 'VT-000001';

\-- \============================================================  
\-- 58\. RESEÑA DEL TOUR  
\-- \============================================================

INSERT INTO resenas\_tour (  
    id\_turista,  
    id\_tour,  
    id\_reserva,  
    calificacion,  
    comentario  
)  
SELECT  
    r.id\_turista,  
    s.id\_tour,  
    r.id\_reserva,  
    5,  
    'Excelente experiencia. El recorrido fue muy interesante y el guía explicó todo muy bien.'  
FROM reservas r  
INNER JOIN salidas\_tour s  
    ON r.id\_salida \= s.id\_salida  
WHERE r.codigo\_reserva \= 'RES-000001';

\-- \============================================================  
\-- 59\. RESEÑA DEL GUÍA  
\-- \============================================================

INSERT INTO resenas\_guia (  
    id\_turista,  
    id\_guia,  
    calificacion,  
    comentario  
)  
SELECT  
    t.id\_turista,  
    s.id\_guia,  
    5,  
    'Excelente guía, muy amable y conocedor de la historia de Medellín.'  
FROM reservas r  
INNER JOIN turistas t  
    ON r.id\_turista \= t.id\_turista  
INNER JOIN salidas\_tour s  
    ON r.id\_salida \= s.id\_salida  
WHERE r.codigo\_reserva \= 'RES-000001';

\-- \============================================================  
\-- 60\. GUÍA FAVORITO  
\-- \============================================================

INSERT INTO guias\_favoritos (  
    id\_turista,  
    id\_guia  
)  
SELECT  
    t.id\_turista,  
    g.id\_guia  
FROM turistas t  
CROSS JOIN guias g  
WHERE  
    t.numero\_documento \= '1001001001'  
    AND g.numero\_documento \= '1030000001';

\-- \============================================================  
\-- 61\. PUBLICIDAD  
\-- \============================================================

INSERT INTO publicidad (  
    titulo,  
    descripcion,  
    imagen\_url,  
    enlace,  
    fecha\_inicio,  
    fecha\_fin,  
    activo  
)  
VALUES  
(  
    'Descubre Medellín con ArteTours',  
    'Vive experiencias únicas y conoce los lugares más representativos de Medellín.',  
    'https://ejemplo.com/artetours/publicidad-medellin.jpg',  
    'https://artetours.com',  
    CURRENT\_DATE,  
    CURRENT\_DATE \+ 30,  
    TRUE  
);

\-- \============================================================  
\-- 62\. CONSULTAS DE VALIDACIÓN  
\-- \============================================================

\-- \------------------------------------------------------------  
\-- USUARIOS Y ROLES  
\-- \------------------------------------------------------------

SELECT  
    u.id\_usuario,  
    u.nombre,  
    u.apellido,  
    u.correo,  
    r.nombre AS rol  
FROM usuarios u  
INNER JOIN usuario\_roles ur  
    ON u.id\_usuario \= ur.id\_usuario  
INNER JOIN roles r  
    ON ur.id\_rol \= r.id\_rol  
ORDER BY u.id\_usuario;

\-- \------------------------------------------------------------  
\-- INFORMACIÓN COMPLETA DE TURISTAS  
\-- \------------------------------------------------------------

SELECT  
    u.id\_usuario,  
    u.nombre,  
    u.apellido,  
    u.correo,  
    u.telefono,  
    t.tipo\_documento,  
    t.numero\_documento,  
    t.fecha\_nacimiento,  
    t.genero,  
    t.nacionalidad,  
    t.pais\_residencia,  
    t.ciudad\_residencia,  
    t.direccion,  
    t.contacto\_emergencia\_nombre,  
    t.contacto\_emergencia\_telefono,  
    t.contacto\_emergencia\_parentesco,  
    t.preferencias  
FROM usuarios u  
INNER JOIN turistas t  
    ON u.id\_usuario \= t.id\_turista  
ORDER BY u.apellido;

\-- \------------------------------------------------------------  
\-- GUÍAS  
\-- \------------------------------------------------------------

SELECT  
    u.id\_usuario,  
    u.nombre,  
    u.apellido,  
    u.correo,  
    g.especialidad,  
    g.experiencia\_anios,  
    g.disponibilidad,  
    g.activo  
FROM usuarios u  
INNER JOIN guias g  
    ON u.id\_usuario \= g.id\_guia  
ORDER BY u.apellido;

\-- \------------------------------------------------------------  
\-- TOURS  
\-- \------------------------------------------------------------

SELECT  
    t.id\_tour,  
    t.nombre AS tour,  
    c.nombre AS categoria,  
    t.precio\_base,  
    t.duracion\_horas,  
    t.punto\_encuentro,  
    t.destino,  
    t.estado  
FROM tours t  
INNER JOIN categorias\_tour c  
    ON t.id\_categoria \= c.id\_categoria  
ORDER BY t.nombre;

\-- \------------------------------------------------------------  
\-- SALIDAS DISPONIBLES  
\-- \------------------------------------------------------------

SELECT  
    s.id\_salida,  
    t.nombre AS tour,  
    s.fecha\_salida,  
    s.hora\_salida,  
    s.cupo\_maximo,  
    s.cupos\_disponibles,  
    s.estado  
FROM salidas\_tour s  
INNER JOIN tours t  
    ON s.id\_tour \= t.id\_tour  
WHERE s.estado IN (  
    'PROGRAMADA',  
    'DISPONIBLE'  
)  
ORDER BY s.fecha\_salida;

\-- \------------------------------------------------------------  
\-- RESERVAS  
\-- \------------------------------------------------------------

SELECT  
    r.codigo\_reserva,

    u.nombre || ' ' || u.apellido AS turista,

    t.nombre AS tour,

    s.fecha\_salida,

    r.cantidad\_adultos,

    r.cantidad\_ninos,

    r.total,

    r.estado

FROM reservas r

INNER JOIN turistas tu  
    ON r.id\_turista \= tu.id\_turista

INNER JOIN usuarios u  
    ON tu.id\_turista \= u.id\_usuario

INNER JOIN salidas\_tour s  
    ON r.id\_salida \= s.id\_salida

INNER JOIN tours t  
    ON s.id\_tour \= t.id\_tour

ORDER BY r.fecha\_reserva;

\-- \------------------------------------------------------------  
\-- PARTICIPANTES DE RESERVAS  
\-- \------------------------------------------------------------

SELECT  
    r.codigo\_reserva,

    rp.nombres,

    rp.apellidos,

    rp.tipo\_documento,

    rp.numero\_documento,

    rp.es\_titular

FROM reserva\_participantes rp

INNER JOIN reservas r  
    ON rp.id\_reserva \= r.id\_reserva

ORDER BY r.codigo\_reserva;

\-- \------------------------------------------------------------  
\-- VENTAS Y SALDOS  
\-- \------------------------------------------------------------

SELECT

    v.numero\_venta,

    v.total,

    COALESCE(  
        SUM(a.monto),  
        0  
    ) AS total\_abonado,

    v.total  
    \-  
    COALESCE(  
        SUM(a.monto),  
        0  
    ) AS saldo\_pendiente,

    v.estado

FROM ventas v

LEFT JOIN abonos a

    ON v.id\_venta \= a.id\_venta

GROUP BY

    v.id\_venta,

    v.numero\_venta,

    v.total,

    v.estado;

\-- \------------------------------------------------------------  
\-- PROMEDIO DE CALIFICACIONES DE TOURS  
\-- \------------------------------------------------------------

SELECT

    t.nombre AS tour,

    ROUND(  
        AVG(r.calificacion),  
        2  
    ) AS promedio\_calificacion,

    COUNT(  
        r.id\_resena  
    ) AS cantidad\_resenas

FROM tours t

LEFT JOIN resenas\_tour r

    ON t.id\_tour \= r.id\_tour

GROUP BY

    t.id\_tour,

    t.nombre

ORDER BY

    promedio\_calificacion DESC NULLS LAST;

\-- \------------------------------------------------------------  
\-- PROMEDIO DE CALIFICACIONES DE GUÍAS  
\-- \------------------------------------------------------------

SELECT

    u.nombre || ' ' || u.apellido AS guia,

    ROUND(  
        AVG(r.calificacion),  
        2  
    ) AS promedio\_calificacion,

    COUNT(  
        r.id\_resena  
    ) AS cantidad\_resenas

FROM guias g

INNER JOIN usuarios u

    ON g.id\_guia \= u.id\_usuario

LEFT JOIN resenas\_guia r

    ON g.id\_guia \= r.id\_guia

GROUP BY

    g.id\_guia,

    u.nombre,

    u.apellido

ORDER BY

    promedio\_calificacion DESC NULLS LAST;

\-- \------------------------------------------------------------  
\-- CUPOS DE SALIDAS  
\-- \------------------------------------------------------------

SELECT

    s.id\_salida,

    t.nombre AS tour,

    s.fecha\_salida,

    s.cupo\_maximo,

    s.cupos\_disponibles,

    s.cupo\_maximo  
    \-  
    s.cupos\_disponibles AS cupos\_ocupados,

    ROUND(  
        (  
            (  
                s.cupo\_maximo  
                \-  
                s.cupos\_disponibles  
            )::NUMERIC  
            /  
            s.cupo\_maximo  
        ) \* 100,  
        2  
    ) AS porcentaje\_ocupacion

FROM salidas\_tour s

INNER JOIN tours t

    ON s.id\_tour \= t.id\_tour

ORDER BY s.fecha\_salida;

\-- \============================================================  
\-- FIN DEL SCRIPT  
\-- \============================================================  
