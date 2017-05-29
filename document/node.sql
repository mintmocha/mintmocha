-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.0.21-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  9.2.0.4947
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- node 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `node` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `node`;


-- 테이블 node.gps 구조 내보내기
CREATE TABLE IF NOT EXISTS `gps` (
  `idx` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `useridx` int(10) unsigned NOT NULL,
  `lat` varchar(10) DEFAULT '-',
  `lng` varchar(10) DEFAULT '-',
  `alt` varchar(50) DEFAULT '-',
  `status_device` varchar(50) DEFAULT '-',
  `status_gps` varchar(50) DEFAULT '-',
  `gps_mode` varchar(50) DEFAULT '-',
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`),
  KEY `FK_gps_user` (`useridx`),
  CONSTRAINT `FK_gps_user` FOREIGN KEY (`useridx`) REFERENCES `user` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- 테이블 데이터 node.gps:~1 rows (대략적) 내보내기
DELETE FROM `gps`;
/*!40000 ALTER TABLE `gps` DISABLE KEYS */;
INSERT INTO `gps` (`idx`, `useridx`, `lat`, `lng`, `alt`, `status_device`, `status_gps`, `gps_mode`, `timestamp`) VALUES
	(0000000001, 1, '37.534206', '127.089571', NULL, NULL, NULL, NULL, '2017-05-29 16:21:06');
/*!40000 ALTER TABLE `gps` ENABLE KEYS */;


-- 테이블 node.test 구조 내보내기
CREATE TABLE IF NOT EXISTS `test` (
  `idx` int(4) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='node.js 테스트용 테이블';

-- 테이블 데이터 node.test:~2 rows (대략적) 내보내기
DELETE FROM `test`;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` (`idx`, `name`) VALUES
	(0001, 'test1'),
	(0002, 'test23');
/*!40000 ALTER TABLE `test` ENABLE KEYS */;


-- 테이블 node.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `idx` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '''''',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- 테이블 데이터 node.user:~1 rows (대략적) 내보내기
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`idx`, `name`) VALUES
	(0000000001, 'daegi.jeong');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
