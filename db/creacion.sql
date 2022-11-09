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
)
BEGIN
	select count(e.descripcion) as cantidadVictorias, e.descripcion as ganador
    from resultados r 
    join estadoGanador e on r.idEstadoGanador = e.id
    group by ganador;
END //

CREATE PROCEDURE spCantidadVictoriasUsuario(
)
BEGIN
	select count(p.idUsuario) as victorias, p.idUsuario, u.usuario
    from resultados r
    join partidas p on p.id = r.idPartida
    join usuarios u on p.idUsuario = u.id
    where idEstadoGanador = 3
    group by idUsuario;
END //

CREATE PROCEDURE spCantidadJuegosJugadores(
	OUT cantidadPartidas int,
    OUT cantidadJugadores int
)
BEGIN
	select count(distinct r.idPartida), count(distinct p.idUsuario)
    from resultados r
    join partidas p on r.idPartida = p.id
    into cantidadPartidas, cantidadJugadores;
END //

CREATE PROCEDURE spPromedioVentiuno(
	OUT promVentiunoCroupier float,
    OUT promVentiunoJugadores float
)
BEGIN
	DECLARE cant21C int;
    DECLARE cant21J int;
    DECLARE total int;
    select count(puntajeCroupier) from resultados where puntajeCroupier = 21 into cant21C;
    select count(puntajeJugador) from resultados where puntajeJugador = 21 into cant21J;
    select count(*) from resultados into total;
    IF (total > 0) THEN
		BEGIN
			SET promVentiunoCroupier := ROUND(cant21C/total, 3);
            SET promVentiunoJugadores := ROUND(cant21J/total, 3);
		END;
    ELSE
		BEGIN
			SET promVentiunoCroupier := 0;
			SET promVentiunoJugadores := 0;
		END;
	END IF;
END //

DELIMITER ;