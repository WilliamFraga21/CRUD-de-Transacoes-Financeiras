-- MySQL Script generated by MySQL Workbench
-- Sun Nov  3 08:30:51 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema CRUD-de-Transacoes-Financeiras
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema CRUD-de-Transacoes-Financeiras
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `CRUD-de-Transacoes-Financeiras` DEFAULT CHARACTER SET utf8 ;
USE `CRUD-de-Transacoes-Financeiras` ;

-- -----------------------------------------------------
-- Table `CRUD-de-Transacoes-Financeiras`.`tipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CRUD-de-Transacoes-Financeiras`.`tipo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(100) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CRUD-de-Transacoes-Financeiras`.`transacoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CRUD-de-Transacoes-Financeiras`.`transacoes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(255) NOT NULL,
  `valor` FLOAT NOT NULL,
  `data` DATETIME NOT NULL,
  `tipo_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `tipo_id`),
  INDEX `fk_transacoes_Tipo_idx` (`tipo_id` ASC) VISIBLE,
  CONSTRAINT `fk_transacoes_Tipo`
    FOREIGN KEY (`tipo_id`)
    REFERENCES `CRUD-de-Transacoes-Financeiras`.`tipo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;