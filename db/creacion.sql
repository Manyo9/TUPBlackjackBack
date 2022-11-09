Create database blackjack;
use blackjack;

create table estadoGanador (
	id tinyint auto_increment,
    descripcion varchar(10),
	primary key (id)
);

create table Roles(
    id int auto_increment,
    nombre varchar(30),
    primary key (id)
);

create table Usuarios(
    id int auto_increment,
    idRol int,
    usuario varchar(32),
    contrasenia varchar(60),
    primary key (id),
    foreign key (idRol) references Roles(id)
);

create table Partidas(
	id int auto_increment,
    idUsuario int,
    primary key (id),
    foreign key (idUsuario) references Usuarios(id)
);

create table Resultados(
    id int auto_increment,
    idPartida int,
    idEstadoGanador tinyint,
    puntajeCroupier tinyint,
    puntajeJugador tinyint,
	fechaFinalizacion datetime,
    primary key (id),
    foreign key (idPartida) references Partidas(id)
);

DELIMITER //

CREATE PROCEDURE spIniciarSesion(
    IN usuario VARCHAR(32),
    IN contrasenia VARCHAR(60)
)
BEGIN
    SELECT u.id, r.nombre as rol, u.usuario 
	FROM usuarios u
	join roles r on r.id = u.idRol
	where u.usuario = usuario and u.contrasenia = contrasenia;
END //

CREATE PROCEDURE spObtenerUsuarios(
)
BEGIN
    SELECT u.id, r.nombre as rol, u.usuario 
    FROM usuarios u
    join roles r on r.id = u.idRol;
END //

CREATE PROCEDURE spObtenerUsuarioPorId(
    IN id int
)
BEGIN
    SELECT u.id, r.nombre as rol, u.usuario 
    FROM usuarios u
    join roles r on r.id = u.idRol
    where u.id = id;
END //

CREATE PROCEDURE spSiguienteIdPartida(
)
BEGIN
	select id + 1 as nextId from partidas order by 1 desc limit 1;
END //

CREATE PROCEDURE spIndiceResultados(
	OUT victoriasCroupier int,
    OUT victoriasJugador int,
    OUT empates int
)
BEGIN
	select r.id, r.idPartida, e.descripcion as ganador,
    r.puntajeCroupier, r.puntajeJugador, r.fechaFinalizacion
    from resultados r 
    join estadoGanador e on r.idEstadoGanador = e.id;
END //

DELIMITER ;