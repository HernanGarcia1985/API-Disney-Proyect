-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql-hernan.alwaysdata.net
-- Tiempo de generación: 19-02-2022 a las 04:50:56
-- Versión del servidor: 10.6.5-MariaDB
-- Versión de PHP: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hernan_api_disney_test`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Genero`
--

CREATE TABLE `Genero` (
  `id` int(11) NOT NULL,
  `Imagen` varchar(100) DEFAULT NULL,
  `Nombre` varchar(100) DEFAULT NULL,
  `Pelicula_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Pelicula`
--

CREATE TABLE `Pelicula` (
  `id` int(11) NOT NULL,
  `Imagen` varchar(100) DEFAULT NULL,
  `Titulo` varchar(100) NOT NULL,
  `Fecha-Creacion` date DEFAULT NULL,
  `Calificacion` tinyint(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Personaje`
--

CREATE TABLE `Personaje` (
  `id` int(11) NOT NULL,
  `Imagen` varchar(100) DEFAULT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Edad` smallint(6) DEFAULT NULL,
  `Peso` smallint(6) DEFAULT NULL,
  `Historia` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Personaje_Pelicula`
--

CREATE TABLE `Personaje_Pelicula` (
  `id` int(11) NOT NULL,
  `Personaje_id` int(11) NOT NULL,
  `Pelicula_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuario`
--

CREATE TABLE `Usuario` (
  `id` int(11) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Genero`
--
ALTER TABLE `Genero`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Pelicula_id` (`Pelicula_id`);

--
-- Indices de la tabla `Pelicula`
--
ALTER TABLE `Pelicula`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Personaje`
--
ALTER TABLE `Personaje`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Personaje_Pelicula`
--
ALTER TABLE `Personaje_Pelicula`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Personaje_id` (`Personaje_id`),
  ADD KEY `Pelicula_id` (`Pelicula_id`);

--
-- Indices de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`id`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Genero`
--
ALTER TABLE `Genero`
  ADD CONSTRAINT `Genero_ibfk_1` FOREIGN KEY (`Pelicula_id`) REFERENCES `Pelicula` (`id`);

--
-- Filtros para la tabla `Personaje_Pelicula`
--
ALTER TABLE `Personaje_Pelicula`
  ADD CONSTRAINT `Personaje_Pelicula_ibfk_1` FOREIGN KEY (`Personaje_id`) REFERENCES `Personaje` (`id`),
  ADD CONSTRAINT `Personaje_Pelicula_ibfk_2` FOREIGN KEY (`Pelicula_id`) REFERENCES `Pelicula` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
