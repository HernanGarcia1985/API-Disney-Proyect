-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Personaje'
-- 
-- ---

DROP TABLE IF EXISTS `Personaje`;
		
CREATE TABLE `Personaje` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Imagen` VARCHAR NULL DEFAULT NULL,
  `Nombre` VARCHAR NOT NULL,
  `Edad` INTEGER NULL DEFAULT NULL,
  `Peso` INTEGER NULL DEFAULT NULL,
  `Historia` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Pelicula'
-- 
-- ---

DROP TABLE IF EXISTS `Pelicula`;
		
CREATE TABLE `Pelicula` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Imagen` VARCHAR NULL DEFAULT NULL,
  `Titulo` VARCHAR NULL DEFAULT NULL,
  `Fecha-Creacion` DATE NULL DEFAULT NULL,
  `Calificacion` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Genero'
-- 
-- ---

DROP TABLE IF EXISTS `Genero`;
		
CREATE TABLE `Genero` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Nombre` VARCHAR NULL DEFAULT NULL,
  `Imagen` VARCHAR NULL DEFAULT NULL,
  `Pelicula_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Personaje-Pelicula'
-- 
-- ---

DROP TABLE IF EXISTS `Personaje-Pelicula`;
		
CREATE TABLE `Personaje-Pelicula` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Personaje_id` INTEGER NULL DEFAULT NULL,
  `Pelicula_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Genero` ADD FOREIGN KEY (Pelicula_id) REFERENCES `Pelicula` (`id`);
ALTER TABLE `Personaje-Pelicula` ADD FOREIGN KEY (Personaje_id) REFERENCES `Personaje` (`id`);
ALTER TABLE `Personaje-Pelicula` ADD FOREIGN KEY (Pelicula_id) REFERENCES `Pelicula` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Personaje` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Pelicula` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Genero` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Personaje-Pelicula` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Personaje` (`id`,`Imagen`,`Nombre`,`Edad`,`Peso`,`Historia`) VALUES
-- ('','','','','','');
-- INSERT INTO `Pelicula` (`id`,`Imagen`,`Titulo`,`Fecha-Creacion`,`Calificacion`) VALUES
-- ('','','','','');
-- INSERT INTO `Genero` (`id`,`Nombre`,`Imagen`,`Pelicula_id`) VALUES
-- ('','','','');
-- INSERT INTO `Personaje-Pelicula` (`id`,`Personaje_id`,`Pelicula_id`) VALUES
-- ('','','');