# ************************************************************
# Sequel Pro SQL dump
# Version 4541
# Database: wxjy
# Generation Time: 2019-08-13 09:40:10 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table access
# ------------------------------------------------------------

DROP TABLE IF EXISTS `access`;

CREATE TABLE `access` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `token` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT 'access_token',
  `expires` int(11) NOT NULL COMMENT '过期时间，单位(s)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- LOCK TABLES `access` WRITE;
-- /*!40000 ALTER TABLE `access` DISABLE KEYS */;

-- INSERT INTO `access` (`id`, `token`, `expires`)
-- VALUES
-- 	(4,'8_cuEOR6I9zyYSMRje-tji4g6JFKFwKdOWHv3mF9ZjDvRaIJLU_0Nda_2abRNM9lo86IITgt8L1Sg5Wy7rsyZ15HFVeuKvYOXlO7NddeE5FzV1hQuR-r1KQil4sitpjJs_rezA3-US6rEovpB2VGOcAGAMXF',7200);

-- /*!40000 ALTER TABLE `access` ENABLE KEYS */;
-- UNLOCK TABLES;


# Dump of table c
# ------------------------------------------------------------

DROP TABLE IF EXISTS `c`;

CREATE TABLE `c` (
  `id` int(16) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `category` varchar(48) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '类别',
  `title` varchar(48) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '题目',
  `content` mediumtext COLLATE utf8mb4_unicode_ci COMMENT '内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `c` WRITE;
/*!40000 ALTER TABLE `c` DISABLE KEYS */;

INSERT INTO `c` (`id`, `category`, `title`, `content`)
VALUES
  (1,'基础语法','print','# print的用法\n### 写法\nprint("hello, world!")\n'),
  (2,'基础语法','scanf','# scanf的用法\n### 写法\nscanf(\&param, "hello, world!")\n');

/*!40000 ALTER TABLE `c` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table comment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `cmid` int(16) unsigned NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `uid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户openid',
  `uname` varchar(48) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名称',
  `uavatar` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户头像',
  `ctablename` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '评论表名',
  `crecordid` int(16) NOT NULL COMMENT '评论记录ID',
  `ccontent` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '评论内容',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`cmid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table orders
# ------------------------------------------------------------

-- DROP TABLE IF EXISTS `orders`;

-- CREATE TABLE `orders` (
--   `oid` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '订单ID',
--   `uid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户openid',
--   `oprice` int(11) DEFAULT '0' COMMENT '书籍价格',
--   `otime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '订单创建时间',
--   `bkid` int(16) NOT NULL COMMENT '书籍ID',
--   PRIMARY KEY (`oid`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(64) unsigned NOT NULL AUTO_INCREMENT,
  `uid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户openid',
  `uname` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '用户微信名',
  `ugender` int(1) DEFAULT NULL COMMENT '用户性别',
  `uavatar` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户头像',
  `uaddress` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户地址',
  `skey` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户登录态标识',
  `sessionkey` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '微信登录态标识',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '账号注册时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '用户最近登录时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
