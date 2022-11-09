use blackjack;
insert into roles (nombre) values ('jugador');
insert into roles (nombre) values ('admin');
insert into usuarios (idRol, usuario, contrasenia) values (1, 'jugadorprueba', 'lionelmessi');
insert into usuarios (idRol, usuario, contrasenia) values (1, 'otrojugador', 'prueba123');
insert into usuarios (idRol, usuario, contrasenia) values (2, 'administrador', 'pruebaadminblackjack');

insert into estadoGanador (descripcion) values ('Empate');
insert into estadoGanador (descripcion) values ('Croupier');
insert into estadoGanador (descripcion) values ('Jugador');

insert into Partidas (idUsuario) values (1);
insert into Partidas (idUsuario) values (1);
insert into Partidas (idUsuario) values (2);

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