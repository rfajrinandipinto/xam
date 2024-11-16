-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 08, 2024 at 06:59 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xamdev`
--

-- --------------------------------------------------------

--
-- Table structure for table `exam`
--

CREATE TABLE `exam` (
  `examid` int(11) NOT NULL,
  `examname` varchar(45) NOT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` timestamp NULL DEFAULT current_timestamp(),
  `editedby` int(11) DEFAULT NULL,
  `editeddate` timestamp NULL DEFAULT current_timestamp(),
  `notes` text DEFAULT NULL,
  `active` bit(1) NOT NULL DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exam`
--

INSERT INTO `exam` (`examid`, `examname`, `createdby`, `createddate`, `editedby`, `editeddate`, `notes`, `active`) VALUES
(1, 'SPGQ', NULL, '2024-09-06 15:28:09', NULL, '2024-09-06 15:28:09', NULL, b'1');

-- --------------------------------------------------------

--
-- Table structure for table `examfinalgrade`
--

CREATE TABLE `examfinalgrade` (
  `examfinalgradeid` int(11) NOT NULL,
  `examseriesid` int(11) NOT NULL,
  `examfinalgradeseq` int(11) DEFAULT NULL,
  `finalpercent` decimal(10,2) DEFAULT NULL,
  `overallgrade` varchar(2) DEFAULT NULL,
  `overallgradepoint` decimal(10,1) DEFAULT NULL,
  `overallrank` varchar(15) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` timestamp NULL DEFAULT current_timestamp(),
  `editedby` int(11) DEFAULT NULL,
  `editeddate` timestamp NULL DEFAULT current_timestamp(),
  `active` bit(1) DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `examresults`
--

CREATE TABLE `examresults` (
  `examresultsid` int(11) NOT NULL,
  `examseriesid` int(11) DEFAULT NULL,
  `examsubjid` int(11) DEFAULT NULL,
  `studentid` int(11) DEFAULT NULL,
  `marks` decimal(10,0) DEFAULT 0,
  `subjgpa` decimal(4,2) DEFAULT 0.00,
  `subjgrade` varchar(2) DEFAULT NULL,
  `subjresults` varchar(15) DEFAULT NULL,
  `whyzero` varchar(50) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` timestamp NULL DEFAULT current_timestamp(),
  `editedby` int(11) DEFAULT NULL,
  `editeddate` timestamp NULL DEFAULT current_timestamp(),
  `active` bit(1) DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `examresults`
--

INSERT INTO `examresults` (`examresultsid`, `examseriesid`, `examsubjid`, `studentid`, `marks`, `subjgpa`, `subjgrade`, `subjresults`, `whyzero`, `createdby`, `createddate`, `editedby`, `editeddate`, `active`) VALUES
(1, 1, 1, 1, 55, 2.30, 'C+', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(2, 1, 2, 1, 76, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(3, 1, 3, 1, 55, 2.30, 'C+', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(4, 1, 4, 1, 39, 0.80, 'F', 'GAGAL', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(5, 1, 5, 1, 51, 2.00, 'C', 'MEMUASKAN', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(6, 1, 6, 1, 70, 3.30, 'B+', 'SANGAT BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(7, 1, 7, 1, 53, 2.00, 'C', 'MEMUASKAN', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(8, 1, 8, 1, 66, 3.00, 'B', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(9, 1, 9, 1, 62, 2.60, 'B-', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(10, 1, 10, 1, 75, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(11, 1, 1, 2, 74, 3.30, 'B+', 'SANGAT BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(12, 1, 2, 2, 53, 2.00, 'C', 'MEMUASKAN', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(13, 1, 3, 2, 80, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(14, 1, 4, 2, 79, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(15, 1, 5, 2, 50, 2.00, 'C', 'MEMUASKAN', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(16, 1, 6, 2, 86, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(17, 1, 7, 2, 95, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(18, 1, 8, 2, 80, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(19, 1, 9, 2, 87, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(20, 1, 10, 2, 87, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(21, 1, 1, 3, 74, 3.30, 'B+', 'SANGAT BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(22, 1, 2, 3, 80, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(23, 1, 3, 3, 89, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(24, 1, 4, 3, 56, 2.30, 'C+', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(25, 1, 5, 3, 73, 3.30, 'B+', 'SANGAT BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(26, 1, 6, 3, 94, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(27, 1, 7, 3, 55, 2.30, 'C+', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(28, 1, 8, 3, 57, 2.30, 'C+', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(29, 1, 9, 3, 59, 2.30, 'C+', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(30, 1, 10, 3, 77, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(31, 1, 1, 4, 62, 2.60, 'B-', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(32, 1, 2, 4, 84, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(33, 1, 3, 4, 59, 2.30, 'C+', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(34, 1, 4, 4, 59, 2.30, 'C+', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(35, 1, 5, 4, 56, 2.30, 'C+', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(36, 1, 6, 4, 80, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(37, 1, 7, 4, 61, 2.60, 'B-', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(38, 1, 8, 4, 55, 2.30, 'C+', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(39, 1, 9, 4, 74, 3.30, 'B+', 'SANGAT BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(40, 1, 10, 4, 83, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(41, 1, 1, 5, 83, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(42, 1, 2, 5, 92, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(43, 1, 3, 5, 98, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(44, 1, 4, 5, 85, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(45, 1, 5, 5, 52, 2.00, 'C', 'MEMUASKAN', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(46, 1, 6, 5, 96, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(47, 1, 7, 5, 96, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(48, 1, 8, 5, 90, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(49, 1, 9, 5, 91, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(50, 1, 10, 5, 90, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(51, 1, 1, 6, 69, 3.00, 'B', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(52, 1, 2, 6, 79, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(53, 1, 3, 6, 81, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(54, 1, 4, 6, 65, 3.00, 'B', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(55, 1, 5, 6, 75, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(56, 1, 6, 6, 74, 3.30, 'B+', 'SANGAT BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(57, 1, 7, 6, 63, 2.60, 'B-', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(58, 1, 8, 6, 83, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(59, 1, 9, 6, 92, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(60, 1, 10, 6, 80, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(61, 1, 1, 7, 85, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(62, 1, 2, 7, 94, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(63, 1, 3, 7, 99, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(64, 1, 4, 7, 81, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(65, 1, 5, 7, 50, 2.00, 'C', 'MEMUASKAN', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(66, 1, 6, 7, 90, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(67, 1, 7, 7, 95, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(68, 1, 8, 7, 73, 3.30, 'B+', 'SANGAT BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(69, 1, 9, 7, 56, 2.30, 'C+', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(70, 1, 10, 7, 82, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(71, 2, 11, 1, 51, 2.40, 'C+', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(72, 2, 12, 1, 78, 3.80, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(73, 2, 13, 1, 58, 2.40, 'C+', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(74, 2, 14, 1, 36, 0.90, 'F', 'GAGAL', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(75, 2, 15, 1, 51, 2.00, 'C', 'MEMUASKAN', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(76, 2, 16, 1, 70, 3.30, 'B+', 'SANGAT BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(77, 2, 17, 1, 53, 2.00, 'C', 'MEMUASKAN', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(78, 2, 18, 1, 66, 3.00, 'B', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(79, 2, 19, 1, 62, 2.60, 'B-', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(80, 2, 20, 1, 75, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(81, 2, 11, 2, 74, 3.30, 'B+', 'SANGAT BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(82, 2, 12, 2, 53, 2.00, 'C', 'MEMUASKAN', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(83, 2, 13, 2, 80, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(84, 2, 14, 2, 79, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(85, 2, 15, 2, 50, 2.00, 'C', 'MEMUASKAN', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(86, 2, 16, 2, 86, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(87, 2, 17, 2, 95, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(88, 2, 18, 2, 80, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(89, 2, 19, 2, 87, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(90, 2, 20, 2, 87, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(91, 2, 11, 3, 74, 3.30, 'B+', 'SANGAT BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(92, 2, 12, 3, 80, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(93, 2, 13, 3, 89, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(94, 2, 14, 3, 56, 2.30, 'C+', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(95, 2, 15, 3, 73, 3.30, 'B+', 'SANGAT BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(96, 2, 16, 3, 94, 4.00, 'A', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(97, 2, 17, 3, 55, 2.30, 'C+', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(98, 2, 18, 3, 57, 2.30, 'C+', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(99, 2, 19, 3, 59, 2.30, 'C+', 'BAIK', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(100, 2, 20, 3, 77, 3.60, 'A-', 'CEMERLANG', NULL, NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1');

-- --------------------------------------------------------

--
-- Table structure for table `examseries`
--

CREATE TABLE `examseries` (
  `examseriesid` int(11) NOT NULL,
  `examid` int(11) NOT NULL,
  `examseriesdescription` varchar(45) DEFAULT NULL,
  `examseriesstartdate` date DEFAULT NULL,
  `examseriesenddate` date DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` timestamp NULL DEFAULT current_timestamp(),
  `editedby` int(11) DEFAULT NULL,
  `editeddate` timestamp NULL DEFAULT current_timestamp(),
  `active` bit(1) DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `examseries`
--

INSERT INTO `examseries` (`examseriesid`, `examid`, `examseriesdescription`, `examseriesstartdate`, `examseriesenddate`, `createdby`, `createddate`, `editedby`, `editeddate`, `active`) VALUES
(1, 1, 'SPGQ 6', NULL, NULL, NULL, '2024-09-06 15:28:09', NULL, '2024-09-06 15:28:09', b'1'),
(2, 2, 'SPGQ 7', NULL, NULL, NULL, '2024-10-20 15:28:09', NULL, '2024-10-20 15:28:09', b'1'),
(3, 3, 'SPGQ 8', NULL, NULL, NULL, '2024-10-21 15:28:09', NULL, '2024-10-21 15:28:09', b'1');

-- --------------------------------------------------------

--
-- Table structure for table `examsubj`
--

CREATE TABLE `examsubj` (
  `examsubjid` int(11) NOT NULL,
  `examseriesid` int(11) NOT NULL,
  `subjcode` varchar(10) NOT NULL,
  `subjdesc` varchar(45) NOT NULL,
  `subjearncredit` int(11) DEFAULT NULL,
  `createdby` int(11) NOT NULL,
  `createddate` timestamp NULL DEFAULT current_timestamp(),
  `editedby` int(11) DEFAULT NULL,
  `editeddate` timestamp NULL DEFAULT current_timestamp(),
  `active` bit(1) NOT NULL DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `examsubj`
--

INSERT INTO `examsubj` (`examsubjid`, `examseriesid`, `subjcode`, `subjdesc`, `subjearncredit`, `createdby`, `createddate`, `editedby`, `editeddate`, `active`) VALUES
(1, 1, 'AHQ101', 'Adap Hamilul Quran', 24, 1, '2024-09-06 15:42:43', NULL, '2024-09-06 15:42:43', b'1'),
(2, 1, 'AR201', 'Asas Bahasa Arab', 24, 1, '2024-09-06 15:42:43', NULL, '2024-09-06 15:42:43', b'1'),
(3, 1, 'AR202', 'Asas Bahasa Arab', 24, 1, '2024-09-06 15:42:43', NULL, '2024-09-06 15:42:43', b'1'),
(4, 1, 'FQ101', 'Fiqah Ibadah', 24, 1, '2024-09-06 15:42:43', NULL, '2024-09-06 15:42:43', b'1'),
(5, 1, 'KP101', 'Metodologi Pgjrn & Pbljrn Al-Quran', 16, 1, '2024-09-06 15:42:43', NULL, '2024-09-06 15:42:43', b'1'),
(6, 1, 'PQ101', 'Pengenalan Ulum Al-Quran', 24, 1, '2024-09-06 15:42:43', NULL, '2024-09-06 15:42:43', b'1'),
(7, 1, 'TF101', 'Asas Tafsir Al-Quran', 24, 1, '2024-09-06 15:42:43', NULL, '2024-09-06 15:42:43', b'1'),
(8, 1, 'TJ101', 'Asas Ilmu Tajwid Al-Quran', 30, 1, '2024-09-06 15:42:43', NULL, '2024-09-06 15:42:43', b'1'),
(9, 1, 'TT101', 'Hafazan Surah Al-Ala - Surah An-Nas', 30, 1, '2024-09-06 15:42:44', NULL, '2024-09-06 15:42:44', b'1'),
(10, 1, 'TT102', 'Juz 1-5', 30, 1, '2024-09-06 15:42:44', NULL, '2024-09-06 15:42:44', b'1'),
(11, 2, 'MT101', 'Mathematic Business', 24, 1, '2024-09-06 15:42:43', NULL, '2024-09-06 15:42:43', b'1'),
(12, 2, 'JP103', 'Bahasa Jepang', 24, 1, '2024-09-06 15:42:43', NULL, '2024-09-06 15:42:43', b'1'),
(13, 2, 'ALG10', 'Algoritma', 24, 1, '2024-09-06 15:42:43', NULL, '2024-09-06 15:42:43', b'1'),
(14, 2, 'MJ304', 'Manajemen Strategi', 24, 1, '2024-09-06 15:42:43', NULL, '2024-09-06 15:42:43', b'1'),
(15, 2, 'EN301', 'Bahasa Inggris III', 16, 1, '2024-09-06 15:42:43', NULL, '2024-09-06 15:42:43', b'1'),
(16, 2, 'PQ101', 'Pengenalan Ulum Al-Quran', 24, 1, '2024-09-06 15:42:43', NULL, '2024-09-06 15:42:43', b'1'),
(17, 2, 'AN101', 'Akuntansi', 24, 1, '2024-09-06 15:42:43', NULL, '2024-09-06 15:42:43', b'1'),
(18, 2, 'ST101', 'Struktur Data', 30, 1, '2024-09-06 15:42:43', NULL, '2024-09-06 15:42:43', b'1'),
(19, 2, 'MD101', 'Multimedia', 30, 1, '2024-09-06 15:42:44', NULL, '2024-09-06 15:42:44', b'1'),
(20, 2, 'SS102', 'Statistika', 30, 1, '2024-09-06 15:42:44', NULL, '2024-09-06 15:42:44', b'1');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `resetPasswordToken` varchar(64) NOT NULL,
  `resetPasswordExpires` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) NOT NULL,
  `expires` int(10) UNSIGNED NOT NULL,
  `data` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `studentid` int(11) NOT NULL,
  `studentname` varchar(45) NOT NULL,
  `studentidno` varchar(10) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` timestamp NULL DEFAULT current_timestamp(),
  `editedby` int(11) DEFAULT NULL,
  `editeddate` timestamp NULL DEFAULT current_timestamp(),
  `active` bit(1) DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`studentid`, `studentname`, `studentidno`, `createdby`, `createddate`, `editedby`, `editeddate`, `active`) VALUES
(1, 'Lucy Mayreels', '147Z', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(2, 'Ahmad Anwar Bin Ali', '321F', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(3, 'Isaniyah Binte Sidin', '239C', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(4, 'Kasmawati Binte Mattu', '927Z', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(5, 'Mailidar Bte Pangai', '233H', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(6, 'Maimunah Binte Awang', '446H', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(7, 'Norlina Binti Suyat', '916F', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(8, 'Nur Afilzah Bte Noor Amidin', '544A', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(9, 'Nur Hanis Binte Mohamed Yusoff', '563F', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(10, 'Norida Binte Osman', '609F', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(11, 'Nur Sobirah Binte Abdul Subahan', '370I', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(12, 'Rosni Binte Mohamed Noor', '692Z', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(13, 'Saodah Bte Hasbolla', '343F', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(14, 'Dasimah Bte Sathai', '746F', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(15, 'Mura Sazai', '747F', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(16, 'Hamzah Bin Siskandar', '288A', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(17, 'Junsafina Binte Selamat', '993A', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(18, 'Latipah Bte Agil', '982Z', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(19, 'Muhammad Khairul Fahmy Bin Khairuddin', '635C', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(20, 'Nurul Huda Binte Mohd Aris', '987G', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(21, 'Nur Fadhilah Binte Daud', '548B', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(22, 'Rashidah Binti Sulaiman', '034I', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(23, 'Rozita Binte Yusof', '343F', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(24, 'Radziah Bte Nordin', '747G', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(25, 'Jasniyati  Binte Jaffar', '672C', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(26, 'Mohamed Tamrin Bin Mohamed Tamin', '998Z', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1'),
(27, 'Maryani Binte Saruwin', '138Z', NULL, '2024-11-01 03:53:26', NULL, '2024-11-01 03:53:26', b'1');

-- --------------------------------------------------------

--
-- Table structure for table `subjgrade`
--

CREATE TABLE `subjgrade` (
  `subjgradeid` int(11) NOT NULL,
  `examseriesid` varchar(45) DEFAULT NULL,
  `examsubjid` int(11) DEFAULT NULL,
  `subjgradeseq` int(11) DEFAULT NULL,
  `subjmin` decimal(10,1) DEFAULT NULL,
  `subjmax` decimal(10,1) DEFAULT NULL,
  `subjgrade` varchar(2) DEFAULT NULL,
  `subjgpa` decimal(10,1) DEFAULT NULL,
  `subjresult` varchar(15) DEFAULT NULL,
  `active` bit(1) DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `emailaddress` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `studentid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `name`, `emailaddress`, `password`, `studentid`) VALUES
(1, 'Lucy Mayreels', 'lucymayreels@gmail.com', '$2a$10$k3.0ue4r1uOQ0CjUqWMhReOIPV24HwlXHoMcRXgIHpvQdEJbUA.he', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `exam`
--
ALTER TABLE `exam`
  ADD PRIMARY KEY (`examid`),
  ADD UNIQUE KEY `examid_UNIQUE` (`examid`);

--
-- Indexes for table `examfinalgrade`
--
ALTER TABLE `examfinalgrade`
  ADD PRIMARY KEY (`examfinalgradeid`);

--
-- Indexes for table `examresults`
--
ALTER TABLE `examresults`
  ADD PRIMARY KEY (`examresultsid`),
  ADD KEY `idx_examresults_examseriesid` (`examseriesid`),
  ADD KEY `idx_examresults_examsubjid` (`examsubjid`),
  ADD KEY `idx_examresults_studentid` (`studentid`);

--
-- Indexes for table `examseries`
--
ALTER TABLE `examseries`
  ADD PRIMARY KEY (`examseriesid`);

--
-- Indexes for table `examsubj`
--
ALTER TABLE `examsubj`
  ADD PRIMARY KEY (`examsubjid`),
  ADD UNIQUE KEY `examsubjid_UNIQUE` (`examsubjid`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `password_resets_userId_key` (`userId`),
  ADD KEY `idx_resetPasswordToken` (`resetPasswordToken`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`studentid`);

--
-- Indexes for table `subjgrade`
--
ALTER TABLE `subjgrade`
  ADD PRIMARY KEY (`subjgradeid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `emailaddress_UNIQUE` (`emailaddress`),
  ADD KEY `idx_users_studentid` (`studentid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exam`
--
ALTER TABLE `exam`
  MODIFY `examid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `examfinalgrade`
--
ALTER TABLE `examfinalgrade`
  MODIFY `examfinalgradeid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `examresults`
--
ALTER TABLE `examresults`
  MODIFY `examresultsid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `examseries`
--
ALTER TABLE `examseries`
  MODIFY `examseriesid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `examsubj`
--
ALTER TABLE `examsubj`
  MODIFY `examsubjid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `studentid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `subjgrade`
--
ALTER TABLE `subjgrade`
  MODIFY `subjgradeid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `examresults`
--
ALTER TABLE `examresults`
  ADD CONSTRAINT `fk_examresults_examseries` FOREIGN KEY (`examseriesid`) REFERENCES `examseries` (`examseriesid`),
  ADD CONSTRAINT `fk_examresults_examsubj` FOREIGN KEY (`examsubjid`) REFERENCES `examsubj` (`examsubjid`),
  ADD CONSTRAINT `fk_examresults_students` FOREIGN KEY (`studentid`) REFERENCES `students` (`studentid`);

--
-- Constraints for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD CONSTRAINT `password_resets_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_students` FOREIGN KEY (`studentid`) REFERENCES `students` (`studentid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
