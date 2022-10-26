Create database blackjack;
use blackjack;

create table Roles(
    id int auto_increment,
    nombre varchar(30),
    primary key (id)
);

create table Cartas(
    id int,
    valorCarta varchar(2),
    valorNumerico tinyint,
    palo tinyint,
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
    idJugador int,
    activo boolean,
    primary key (id),
    foreign key (idJugador) references Usuarios(id)
);

create table Manos(
    id int auto_increment,
    idPartida int,
    idUsuario int,
    orden smallint,
    idCarta int,
    primary key (id),
    foreign key (idPartida) references Partidas(id),
    foreign key (idUsuario) references Usuarios(id),
    foreign key (idUsuario) references Cartas(id)
);

create table Resultados(
    id int auto_increment,
    idPartida int,
    idGanador tinyint,
    blackjackCroupier boolean,
    blackjackJugador boolean,
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

DELIMITER ;