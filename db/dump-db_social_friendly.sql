-- /*!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.8-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: dbTodoApp
-- ------------------------------------------------------
-- Server version	10.11.8-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `TC_PRIORITY`
--

DROP TABLE IF EXISTS `TC_PRIORITY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TC_PRIORITY` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) NOT NULL,
  `key` varchar(10) NOT NULL,
  `active` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TC_PRIORITY`
--

LOCK TABLES `TC_PRIORITY` WRITE;
/*!40000 ALTER TABLE `TC_PRIORITY` DISABLE KEYS */;
INSERT INTO `TC_PRIORITY` VALUES
(1,'Altamente prioritaria','AK',''),
(2,'Prioritaria','PK',''),
(3,'Medianamente prioritaria','MK',''),
(4,'No prioritaria','NK','');
/*!40000 ALTER TABLE `TC_PRIORITY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TC_STATUS`
--

DROP TABLE IF EXISTS `TC_STATUS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TC_STATUS` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) DEFAULT NULL,
  `key` varchar(10) NOT NULL,
  `active` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TC_STATUS`
--

LOCK TABLES `TC_STATUS` WRITE;
/*!40000 ALTER TABLE `TC_STATUS` DISABLE KEYS */;
INSERT INTO `TC_STATUS` VALUES
(1,'Completo','COK',''),
(2,'En proceso','PRK',''),
(3,'Pendiente','PDK',''),
(4,'Expirado','EXP','');
/*!40000 ALTER TABLE `TC_STATUS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TR_TASK`
--

DROP TABLE IF EXISTS `TR_TASK`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TR_TASK` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `deadline` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fk_statusId` int(11) NOT NULL,
  `fk_priorityId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TR_TASK_FK` (`fk_statusId`),
  KEY `TR_TASK_FK_1` (`fk_priorityId`),
  CONSTRAINT `TR_TASK_FK` FOREIGN KEY (`fk_statusId`) REFERENCES `TC_STATUS` (`id`),
  CONSTRAINT `TR_TASK_FK_1` FOREIGN KEY (`fk_priorityId`) REFERENCES `TC_PRIORITY` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TR_TASK`
--

LOCK TABLES `TR_TASK` WRITE;
/*!40000 ALTER TABLE `TR_TASK` DISABLE KEYS */;
INSERT INTO `TR_TASK` VALUES
(1,'Hacer tarea','Terminar la tarea para mañana en la tarde','2024-02-03 22:00:00',3,1),
(2,'Hacer cosas','Cosas que tengo pendientes','2024-03-19 06:00:00',1,1),
(3,'Cualquier cosa','Es una prueba','2024-03-15 16:04:20',2,2),
(4,'Hacer cosas','Cosas que tengo pendientes','2024-03-16 05:40:31',1,1),
(5,'Hacer cosas','Cosas que tengo pendientes','2024-03-16 05:40:57',1,1),
(6,'Hacer cosas','Cosas que tengo pendientes','2024-03-16 05:41:06',1,1),
(7,'Hacer cosas','Cosas que tengo pendientes','2024-03-16 05:41:36',1,1),
(8,'Hacer cosas','Cosas que tengo pendientes','2024-03-21 01:10:08',1,1),
(9,'Hacer cosas','Cosas que tengo pendientes','2024-03-21 01:10:53',1,1),
(10,'Hacer cosas','Cosas que tengo pendientes','2024-03-21 02:04:31',1,1),
(19,'Barrer','Barrer casa','2024-04-12 21:26:00',3,2),
(20,'Launch 2','test description','2024-04-11 20:32:00',1,1),
(21,'Launch 2','test description','2024-04-11 20:38:00',1,2),
(22,'logo blog','asad','2024-04-11 20:41:00',1,1),
(23,'Donovan','asdad','2024-04-11 20:44:00',1,2),
(41,'Launch 2','test description','2024-04-12 03:48:00',2,1),
(42,'Launch 2','asdad','2024-04-12 03:55:00',3,2),
(43,'logo blog','LLKOP','2024-04-12 03:55:00',4,2),
(44,'logo blog','asdad','2024-04-12 03:56:00',2,1),
(45,'logo blog','test description','2024-04-12 03:56:00',3,1);
/*!40000 ALTER TABLE `TR_TASK` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TR_USER`
--

DROP TABLE IF EXISTS `TR_USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TR_USER` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `email` varchar(50) NOT NULL,
  `birthday` date NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `active` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `TR_USER_UN` (`username`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TR_USER`
--

LOCK TABLES `TR_USER` WRITE;
/*!40000 ALTER TABLE `TR_USER` DISABLE KEYS */;
INSERT INTO `TR_USER` VALUES
(1,'Dónovan','up210762','$2a$10$EsPpQ6opDIro1ER5OP9AyeIGZhor8o6SDfnt121kAfEaSfovM2qhe','up210762@alumnos.upa.edu.mx','2003-05-19','2024-02-16 16:16:32','2024-01-26 21:10:09',1),
(2,'Pedro','pedro123','$2a$10$wxlPING4EHfvAbAuqT4OOuaBeEYx80j/mrghzuF6ci1LtxNNwspZK','pedro123@alumnos.upa.edu.mx','2003-04-19','2024-02-16 16:16:32','2024-02-16 05:42:26',1),
(5,'Pedro','pedro456','$2a$10$Et70wZt9POSaALA7YDZqJ.TZzmBQj0fMrTazing5GUUiIQLlUKtbi','pedro456@alumnos.upa.edu.mx','2003-04-19','2024-02-16 17:44:16','2024-02-16 17:44:16',0),
(6,'test','test123','$2a$10$v9Qh00NCdlXkyIW7up5iCOmuGCC2/9Sc/7zn4otZTXj.ADT/ai7ye','donovanhdz167@gmail.com','2024-02-17','2024-02-23 00:11:15','2024-02-23 00:11:15',0),
(7,'pedrito daniel Ortega','pedrito.d','$2a$10$vk8m6B8PahE8yrAZKM9jfOqCzEipLknnKrz3OrVuKli6uKqYz4kGO','pedritod@gmail.com','2024-02-16','2024-04-10 17:34:10','2024-02-23 21:10:37',0),
(8,'Catherine Elizabeth Mendoza de Luna','eline','$2a$10$OjCHFjtNp29tjetPWOTwhuL3Ys9EFLEQZdZFkx4Bp55tKbVldot2i','test@test.com','1997-05-27','2024-03-04 20:35:04','2024-03-04 20:35:04',0),
(9,'Dónovan Alonso Hernández Carmona','doaluva','$2a$10$2igneyViC9kj9gYV/QUog.Ku2c6eqWhgCs1EM1FV3zzy09k2DOjQe','donovan.al@test.com','2003-05-19','2024-03-04 20:36:19','2024-03-04 20:36:19',0),
(10,'Dónovan Alonso','donovitali167','$2a$10$w9iTB36XJ3dKyV5SqGaZYu8fAyRQqCB0ENA2tI4UZ6nW2hnAxc8vi','donovanhdz22@gmail.com','2003-05-19','2024-03-13 22:37:48','2024-03-13 22:37:48',0),
(11,'Donovan Hernandez','donovanhdz','$2a$10$yTkbH3oxWYf4dz1wL/tuIO7NJ9QL1YTfNK.Bcy/EiA2MK6HhL0Hme','donovanhdz11@gmail.com','2003-05-19','2024-04-10 21:29:03','2024-04-10 21:13:01',0);
/*!40000 ALTER TABLE `TR_USER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TR_USER_TASK`
--

DROP TABLE IF EXISTS `TR_USER_TASK`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TR_USER_TASK` (
  `idTask` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  PRIMARY KEY (`idTask`,`idUser`),
  KEY `TR_USER_TASK_FK` (`idUser`),
  CONSTRAINT `TR_USER_TASK_FK` FOREIGN KEY (`idUser`) REFERENCES `TR_USER` (`id`),
  CONSTRAINT `TR_USER_TASK_FK_1` FOREIGN KEY (`idTask`) REFERENCES `TR_TASK` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TR_USER_TASK`
--

LOCK TABLES `TR_USER_TASK` WRITE;
/*!40000 ALTER TABLE `TR_USER_TASK` DISABLE KEYS */;
INSERT INTO `TR_USER_TASK` VALUES
(1,2),
(1,9),
(1,10),
(2,1),
(3,2),
(19,11),
(20,11),
(21,11),
(22,11),
(23,11),
(41,7),
(42,7),
(43,7),
(44,7),
(45,7);
/*!40000 ALTER TABLE `TR_USER_TASK` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-07 14:40:58
