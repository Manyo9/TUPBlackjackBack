use blackjack;
insert into roles (nombre) values ('jugador');
insert into roles (nombre) values ('admin');
insert into usuarios (idRol, usuario, contrasenia) values (1, 'jugadorprueba', 'lionelmessi');  # 1
insert into usuarios (idRol, usuario, contrasenia) values (1, 'otrojugador', 'prueba123');      # 2
insert into usuarios (idRol, usuario, contrasenia) values (1, 'jugadortres', 'testpass');       # 3
insert into usuarios (idRol, usuario, contrasenia) values (1, 'jugadorcuatro', 'testpass');     # 4
insert into usuarios (idRol, usuario, contrasenia) values (1, 'jugadorcinco', 'testpass');      # 5
insert into usuarios (idRol, usuario, contrasenia) values (1, 'jugadorseis', 'testpass');       # 6
insert into usuarios (idRol, usuario, contrasenia) values (1, 'jugadorsiete', 'testpass');      # 7
insert into usuarios (idRol, usuario, contrasenia) values (1, 'jugadorocho', 'testpass');       # 8
insert into usuarios (idRol, usuario, contrasenia) values (1, 'jugadornueve', 'testpass');      # 9
insert into usuarios (idRol, usuario, contrasenia) values (1, 'jugadordiez', 'testpass');       # 10
insert into usuarios (idRol, usuario, contrasenia) values (2, 'administrador', 'pruebaadminblackjack'); # 11

insert into estadoGanador (descripcion) values ('Empate'); # 1
insert into estadoGanador (descripcion) values ('Croupier'); # 2
insert into estadoGanador (descripcion) values ('Jugador'); # 3

insert into Partidas (idUsuario) values (1); # 1
insert into Partidas (idUsuario) values (1); # 2
insert into Partidas (idUsuario) values (2); # 3
insert into Partidas (idUsuario) values (3); # 4
insert into Partidas (idUsuario) values (4); # 5
insert into Partidas (idUsuario) values (4); # 6
insert into Partidas (idUsuario) values (5); # 7
insert into Partidas (idUsuario) values (6); # 8
insert into Partidas (idUsuario) values (7); # 9
insert into Partidas (idUsuario) values (7); # 10
insert into Partidas (idUsuario) values (8); # 11
insert into Partidas (idUsuario) values (9); # 12
insert into Partidas (idUsuario) values (10); # 13

# Gana usuario por tener blackjack y el otro no, ambos 21
insert into resultados (idPartida, idEstadoGanador, puntajeCroupier, puntajeJugador, fechaFinalizacion) values
(1, 3, 21, 21, DATE_SUB(NOW(), INTERVAL 1 DAY));

# Empate por ambos tener 20
insert into resultados (idPartida, idEstadoGanador, puntajeCroupier, puntajeJugador, fechaFinalizacion) values
(1, 1, 20, 20, DATE_SUB(NOW(), INTERVAL 1 DAY));

# Gana usuario por tener mayor puntaje, con 21
insert into resultados (idPartida, idEstadoGanador, puntajeCroupier, puntajeJugador, fechaFinalizacion) values
(1, 3, 19, 21, DATE_SUB(NOW(), INTERVAL 18 HOUR));

# Gana croupier por tener mayor puntaje
insert into resultados (idPartida, idEstadoGanador, puntajeCroupier, puntajeJugador, fechaFinalizacion) values
(1, 2, 21, 18, DATE_SUB(NOW(), INTERVAL 5 HOUR));

# Gana croupier porque el jugador perdio
insert into resultados (idPartida, idEstadoGanador, puntajeCroupier, puntajeJugador, fechaFinalizacion) values
(2, 2, 21, 25, DATE_SUB(NOW(), INTERVAL 4 HOUR));

# Empate porque ambos perdieron
insert into resultados (idPartida, idEstadoGanador, puntajeCroupier, puntajeJugador, fechaFinalizacion) values
(2, 1, 22, 23, DATE_SUB(NOW(), INTERVAL 4 HOUR));

# Gana croupier porque el jugador perdio
insert into resultados (idPartida, idEstadoGanador, puntajeCroupier, puntajeJugador, fechaFinalizacion) values
(3, 2, 19, 23, DATE_SUB(NOW(), INTERVAL 4 HOUR));

# Gana croupier por mas puntos
insert into resultados (idPartida, idEstadoGanador, puntajeCroupier, puntajeJugador, fechaFinalizacion) values
(3, 2, 21, 20, DATE_SUB(NOW(), INTERVAL 4 HOUR));

insert into resultados (idPartida, idEstadoGanador, puntajeCroupier, puntajeJugador, fechaFinalizacion) values 
(3, 3, 28, 20, DATE_SUB(NOW(), INTERVAL 4 HOUR));

insert into resultados (idPartida, idEstadoGanador, puntajeCroupier, puntajeJugador, fechaFinalizacion) values 
(4, 2, 20, 28, DATE_SUB(NOW(), INTERVAL 3 DAY));

insert into resultados (idPartida, idEstadoGanador, puntajeCroupier, puntajeJugador, fechaFinalizacion) values 
(4, 3, 28, 20, DATE_SUB(NOW(), INTERVAL 2 DAY));

insert into resultados (idPartida, idEstadoGanador, puntajeCroupier, puntajeJugador, fechaFinalizacion) values 
(5, 1, 20, 20, DATE_SUB(NOW(), INTERVAL 4 DAY));

insert into resultados (idPartida, idEstadoGanador, puntajeCroupier, puntajeJugador, fechaFinalizacion) values 
(5, 3, 21, 21, DATE_SUB(NOW(), INTERVAL 2 DAY));

insert into resultados (idPartida, idEstadoGanador, puntajeCroupier, puntajeJugador, fechaFinalizacion) values 
(6, 2, 21, 21, DATE_SUB(NOW(), INTERVAL 1 DAY));

insert into resultados (idPartida, idEstadoGanador, puntajeCroupier, puntajeJugador, fechaFinalizacion) values 
(7, 1, 21, 21, DATE_SUB(NOW(), INTERVAL 10 HOUR));

insert into resultados (idPartida, idEstadoGanador, puntajeCroupier, puntajeJugador, fechaFinalizacion) values 
(8, 1, 18, 18, DATE_SUB(NOW(), INTERVAL 11 HOUR));

insert into resultados (idPartida, idEstadoGanador, puntajeCroupier, puntajeJugador, fechaFinalizacion) values 
(9, 2, 21, 20, DATE_SUB(NOW(), INTERVAL 6 HOUR));

insert into resultados (idPartida, idEstadoGanador, puntajeCroupier, puntajeJugador, fechaFinalizacion) values 
(10, 2, 20, 25, DATE_SUB(NOW(), INTERVAL 5 HOUR));

insert into resultados (idPartida, idEstadoGanador, puntajeCroupier, puntajeJugador, fechaFinalizacion) values 
(11, 3, 20, 21, DATE_SUB(NOW(), INTERVAL 8 HOUR));

insert into resultados (idPartida, idEstadoGanador, puntajeCroupier, puntajeJugador, fechaFinalizacion) values 
(12, 3, 19, 21, DATE_SUB(NOW(), INTERVAL 10 HOUR));

insert into resultados (idPartida, idEstadoGanador, puntajeCroupier, puntajeJugador, fechaFinalizacion) values 
(13, 1, 19, 19, DATE_SUB(NOW(), INTERVAL 5 HOUR));