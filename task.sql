-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 03, 2021 at 09:55 AM
-- Server version: 8.0.19
-- PHP Version: 7.3.24-(to be removed in future macOS)

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task`
--

-- --------------------------------------------------------

--
-- Table structure for table `cards`
--

CREATE TABLE `cards` (
  `id` int NOT NULL,
  `card_id` varchar(50) NOT NULL,
  `list_id` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cards`
--

INSERT INTO `cards` (`id`, `card_id`, `list_id`, `title`, `description`) VALUES
(5, '23870f5-efeb-a3f1-087c-60cede841ab2', '81aa4f-84f0-07fd-4a32-2c274fe2254a', 'ss', 'oa'),
(7, '0c7dc1-732e-c7af-3763-aaea7241b356', 'e363a20-64e-704-d05-3754afc8c5d4', 'Nikky/notifications', 'ad'),
(8, '80fa50a-38e6-df27-ceda-04a4d8513d6', '18ba851-d7e-406-f0cd-056adc31f46b', 'm', 'aa'),
(9, 'b7a64fb-cae6-512b-157-0dd3c367f522', 'e363a20-64e-704-d05-3754afc8c5d4', 'added notif on grade sugg', '');

-- --------------------------------------------------------

--
-- Table structure for table `lists`
--

CREATE TABLE `lists` (
  `id` int NOT NULL,
  `list_id` varchar(50) NOT NULL,
  `level` int NOT NULL,
  `title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `lists`
--

INSERT INTO `lists` (`id`, `list_id`, `level`, `title`) VALUES
(2, '81aa4f-84f0-07fd-4a32-2c274fe2254a', 0, 'mm'),
(3, 'e363a20-64e-704-d05-3754afc8c5d4', 1, 'ka'),
(4, '18ba851-d7e-406-f0cd-056adc31f46b', 2, 'a');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `doj` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `mobile`, `doj`) VALUES
(15, 'Test', 'Admin', 'test@admin.com', '81dc9bdb52d04dc20036dbd8313ed055', '1234567890', '2021-10-03 06:51:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lists`
--
ALTER TABLE `lists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cards`
--
ALTER TABLE `cards`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `lists`
--
ALTER TABLE `lists`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
