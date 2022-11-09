Create database blackjack;
use blackjack;

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

create table Resultados(
    id int auto_increment,
    idPartida int,
	idUsuario int,
    idGanador tinyint,
    puntajCroupier boolean,
    ventiUnoJugador boolean,
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


DELIMITER ;