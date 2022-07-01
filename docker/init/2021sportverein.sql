-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 26. Okt 2021 um 20:14
-- Server-Version: 10.1.21-MariaDB
-- PHP-Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `2021sportverein`
--
CREATE DATABASE IF NOT EXISTS `2021sportverein` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `2021sportverein`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `login`
--

CREATE TABLE `login_data` (
  `id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `login`
--

INSERT INTO `login_data` (`id`, `username`, `password`) VALUES
(1, 'admin', 'masterpassword');


-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `grundbeitrag`
--

CREATE TABLE `grundbeitrag` (
  `gb_id` int(11) NOT NULL,
  `personengruppe` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `beitrag` decimal(7,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `grundbeitrag`
--

INSERT INTO `grundbeitrag` (`gb_id`, `personengruppe`, `beitrag`) VALUES
(1, 'Erwachsene', '75.00'),
(2, 'Schüler/Studenten', '40.00'),
(3, 'Senioren/Rentner', '30.00'),
(4, 'Auszubildende', '45.00'),
(5, 'Ehrenmitglieder', '10.00'),
(6, 'Personen mit Handicap', '5.00');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `mannschaft`
--

CREATE TABLE `mannschaft` (
  `ma_id` int(11) NOT NULL,
  `sa_id` int(11) NOT NULL,
  `teamname` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `mannschaft`
--

INSERT INTO `mannschaft` (`ma_id`, `sa_id`, `teamname`) VALUES
(1, 1, '1 FC Bayreuth'),
(2, 1, '2 FC Bayreuth'),
(3, 2, '1 HC Bayreuth'),
(4, 3, 'Wettkämpfer');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `mitglied`
--

CREATE TABLE `mitglied` (
  `mi_id` int(11) NOT NULL,
  `vorname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `nachname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `plz` varchar(6) COLLATE utf8_unicode_ci NOT NULL,
  `ort` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `geschlecht` char(1) COLLATE utf8_unicode_ci NOT NULL,
  `or_id` int(11) NOT NULL,
  `gb_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `mitglied`
--

INSERT INTO `mitglied` (`mi_id`, `vorname`, `nachname`, `plz`, `ort`, `geschlecht`, `or_id`, `gb_id`) VALUES
(1, 'Gabi', 'Ziegler', '95326', 'Kulmbach', 'w', 3, 1),
(2, 'Max', 'Mustermann', '95465', 'Speichersdorf', 'm', 6, 1),
(3, 'Kuru Kuru', 'Kururin', '95326', 'Kulmbach', 'm', 3, 5),
(4, 'Rocco Antonio', 'Tano', '95466', 'Weidenberg', 'm', 5, 4),
(5, 'Charles', 'Bronson', '95326', 'Kulmbach', 'm', 3, 5),
(6, 'Helmut', 'Mutler', '95444', 'Bayreuth', 'm', 1, 2),
(7, 'Boris', 'Jelzin', '95448', 'Bayreuth', 'm', 2, 3),
(8, 'Axel', 'Haar', '95466', 'Weidenberg', 'm', 5, 1),
(9, 'Raja', 'Koduri', '95447', 'Bayreuth-Meyernberg', 'w', 13, 1),
(10, 'Lisa', 'Su', '95466', 'Weidenberg', 'w', 5, 1),
(11, 'Hafthor', 'Björnsson', '95465', 'Speichersdorf', 'm', 6, 5),
(12, 'Arnold', 'Schwarzenegger', '95433', 'Bindlach', 'm', 7, 1),
(13, 'Gaten', 'Matarazzo', '95433', 'Bindlach', 'm', 7, 2),
(14, 'Millie Bobby', 'Brown', '95466', 'Weidenberg', 'w', 5, 2),
(15, 'Finn', 'Wolfhard', '95521', 'Trebgast', 'm', 12, 2),
(16, 'Jason', 'Momoa', '95433', 'Bindlach', 'm', 7, 1),
(17, 'David', 'Harbour', '95432', 'Bad Berneck', 'm', 10, 1),
(18, 'Donald', 'Trump', '95477', 'Ramsenthal', 'm', 8, 4),
(19, 'Max', 'Mustermann', '95444', 'Bayreuth', 'm', 1, 1),
(20, 'Maria', 'Mustermann', '95444', 'Bayreuth', 'w', 1, 1),
(21, 'Horst', 'Seufzer', '95326', 'Kulmbach', 'm', 3, 1),
(22, 'Xaver', 'Unterberger', '95659', 'Arzberg', 'm', 4, 2),
(23, 'Alfons', 'Müller', '95466', 'Weidenberg', 'm', 5, 3),
(24, 'Arnold', 'Schwarzenegger', '95326', 'Kulmbach', 'm', 3, 1),
(25, 'Sheldon', 'Cooper', '95466', 'Weidenberg', 'm', 5, 1),
(26, 'Dwayne', 'Johnson', '95433', 'Bindlach', 'm', 7, 1),
(27, 'Max', 'Marks', '95659', 'Arzberg', 'm', 4, 2),
(28, 'Berry', 'Castle', '95477', 'Ramsenthal', 'm', 8, 5),
(29, 'Hans', 'Krause', '95444', 'Bayreuth', 'm', 1, 1),
(30, 'Niels', 'Ruf', '95448', 'Bayreuth', 'm', 2, 1),
(31, 'Robert', 'Pathe', '95326', 'Kulmbach', 'm', 3, 1),
(32, 'Siegfried', 'Shortarm', '95659', 'Arzberg', 'm', 4, 6),
(33, 'Bernhard', 'Blind', '95466', 'Weidenberg', 'm', 5, 6),
(34, 'Axel', 'Haar', '95466', 'Weidenberg', 'm', 5, 1),
(35, 'Harry', 'Potter', '95448', 'Bayreuth', 'm', 2, 1),
(36, 'Luisa', 'Bauer', '95466', 'Weidenberg', 'w', 5, 1),
(37, 'Walter', 'White', '95477', 'Ramsenthal', 'm', 8, 1),
(38, 'Homer', 'Simpson', '95326', 'Kulmbach', 'm', 3, 5),
(39, 'Tim', 'Burton', '95659', 'Arzberg', 'm', 4, 3),
(40, 'Rick', 'Sanchez', '95326', 'Kulmbach', 'm', 3, 1),
(41, 'Morty', 'Smith', '95465', 'Speichersdorf', 'm', 6, 2),
(42, 'Bruce', 'Wayne', '95448', 'Bayreuth', 'm', 2, 1),
(43, 'Peter', 'Parker', '95444', 'Bayreuth', 'm', 1, 1),
(44, 'Donald', 'Trump', '95466', 'Weidenberg', 'm', 5, 6),
(45, 'Max', 'Muster', '95326', 'Kulmbach', 'm', 3, 5),
(46, 'Michael', 'Schmidt', '95466', 'Weidenberg', 'm', 5, 4),
(47, 'Charles', 'Mutler', '95326', 'Kulmbach', 'm', 3, 5),
(48, 'Helmut', 'Müller', '95444', 'Bayreuth', 'm', 1, 2),
(49, 'Boris', 'Schmitt', '95448', 'Bayreuth', 'm', 2, 3),
(50, 'Jan', 'Winter', '95326', 'Kulmbach', 'm', 3, 1),
(51, 'Janusz', 'Knapik', '95326', 'Kulmbach', 'm', 3, 1),
(52, 'Marco', 'Plenert', '95326', 'Kulmbach', 'm', 3, 1),
(53, 'Martin', 'Donnerbauer', '95433', 'Bindlach', 'm', 7, 5),
(54, 'Jens', 'Niemann', '95326', 'Kulmbach', 'm', 3, 6),
(55, 'Sabine', 'Niemann', '95326', 'Kulmbach', 'w', 3, 6),
(56, 'Axel', 'Haar', '95466', 'Weidenberg', 'm', 5, 1),
(57, 'Rainer', 'Hohn', '95659', 'Arzberg', 'm', 4, 1),
(58, 'Willie', 'Kleiner', '95466', 'Weidenberg', 'w', 5, 1),
(59, 'Maria', 'Kron', '95326', 'Kulmbach', 'w', 3, 3),
(60, 'Franz', 'Ohse', '95448', 'Bayreuth', 'm', 2, 2),
(61, 'Max', 'Mustermann', '95326', 'Kulmbach', 'm', 3, 1),
(62, 'Dominik', 'Froetschel', '95465', 'Speichersdorf', 'm', 6, 1),
(63, 'Thimothie', 'Pererverer', '95326', 'Kulmbach', 'w', 3, 1),
(64, 'Felix', 'Holz', '95659', 'Arzberg', 'm', 4, 2),
(65, 'Patrick', 'Puschl', '95326', 'Kulmbach', 'm', 3, 4),
(66, 'Franz-Josef', 'Strauß', '95444', 'Bayreuth', 'm', 1, 1),
(67, 'Steven', 'Seagul', '95444', 'Bayreuth', 'm', 1, 1),
(68, 'Chuck', 'Norrstis', '95444', 'Bayreuth', 'm', 1, 1),
(69, 'Wolfgang', 'Petry', '95448', 'Bayreuth', 'm', 2, 3),
(70, 'Horst', 'Seehofer', '95448', 'Bayreuth', 'm', 2, 6),
(71, 'Andreas', 'Köppke', '95444', 'Bayreuth', 'm', 1, 1),
(72, 'Ralf', 'Pfülz', '95444', 'Bayreuth', 'm', 1, 1),
(73, 'Donald', 'Trump', '95444', 'Bayreuth', 'm', 1, 1),
(74, 'Heidi', 'Klsum', '95448', 'Bayreuth', 'w', 2, 3),
(75, 'Angela', 'Merkel', '95448', 'Bayreuth', 'w', 2, 6),
(76, 'Max', 'Meier', '95326', 'Kulmbach', 'm', 3, 1),
(77, 'Felix', 'Molz', '95326', 'Kulmbach', 'm', 3, 1),
(78, 'Timo', 'Peneratra', '95326', 'Kulmbach', 'm', 3, 1),
(79, 'Tonald', 'Drump', '95326', 'Kulmbach', 'm', 3, 4),
(80, 'Frank', 'Winter', '95444', 'Bayreuth', 'm', 1, 3),
(81, 'Peter', 'Lustig', '95326', 'Kulmbach', 'm', 3, 1),
(82, 'Steven', 'Seagal', '95326', 'Kulmbach', 'm', 3, 1),
(83, 'Timo', 'Omit', '95326', 'Kulmbach', 'm', 3, 1),
(84, 'Bdolf', 'Müller', '95326', 'Kulmbach', 'm', 3, 1),
(85, 'Karl', 'Gustav', '95326', 'Kulmbach', 'm', 3, 1),
(86, 'Scherdel', 'Zoigl', '95444', 'Bayreuth', 'm', 1, 1),
(87, 'Donald', 'Trump', '95444', 'Bayreuth', 'm', 1, 1),
(88, 'Meinel', 'Pils', '95326', 'Kulmbach', 'm', 3, 1),
(89, 'Max', 'Mad', '95448', 'Bayreuth', 'm', 2, 3),
(90, 'Moritz', 'Merkel', '95448', 'Bayreuth', 'm', 2, 6),
(91, 'Horst', 'Seehofer', '95433', 'Bindlach', 'm', 7, 1),
(92, 'Max', 'Muster', '95388', 'Lanzendorf', 'm', 9, 1),
(93, 'Martin', 'Schulz', '95448', 'Bayreuth', 'm', 2, 1),
(94, 'Alexander', 'Eberhardt', '95326', 'Kulmbach', 'm', 3, 4),
(95, 'Queen', 'Elizabeth', '95502', 'Himmelkron', 'w', 11, 5),
(96, 'Yannick', 'Wild', '95444', 'Bayreuth', 'm', 1, 1),
(97, 'Thomas', 'Hofmann', '95444', 'Bayreuth', 'm', 1, 2),
(98, 'Markus', 'Hofmann', '95326', 'Kulmbach', 'm', 3, 3),
(99, 'Till', 'Meier', '95659', 'Arzberg', 'm', 4, 4),
(100, 'Jan', 'Mueller', '95659', 'Arzberg', 'm', 4, 4),
(101, 'Haino', 'Kurzarm', '95444', 'Bayreuth', 'm', 1, 1),
(102, 'Max', 'Amk', '95448', 'Bayreuth', 'm', 2, 1),
(103, 'Heino', 'Longarm', '95326', 'Kulmbach', 'm', 3, 1),
(104, 'Biggus', 'Diggus', '95659', 'Arzberg', 'm', 4, 6),
(105, 'Denize', 'Mongous', '95466', 'Weidenberg', 'w', 5, 6),
(106, 'Dat', 'Boi', '95444', 'Bayreuth', 'm', 1, 1),
(107, 'Rainer', 'Wnkler', '95448', 'Bayreuth', 'm', 2, 1),
(108, 'Thomas', 'Geyer', '95326', 'Kulmbach', 'm', 3, 1),
(109, 'Dreifinger', 'Joe', '95659', 'Arzberg', 'm', 4, 6),
(110, 'Mittwoch', 'Kerle', '95466', 'Weidenberg', 'm', 5, 6),
(111, 'Antonia', 'Faggot', '95444', 'Bayreuth', 'w', 1, 1),
(112, 'Santa', 'Claus', '95444', 'Bayreuth', 'w', 1, 1),
(113, 'Spider', 'Man', '95444', 'Bayreuth', 'm', 1, 1),
(114, 'Peter', 'Enis', '95448', 'Bayreuth', 'm', 2, 2),
(115, 'Local', 'Horst', '95326', 'Kulmbach', 'm', 3, 3),
(116, 'Volker', 'Racho', '95326', 'Kulmbach', 'm', 3, 1),
(117, 'Harry', 'Potter', '95448', 'Bayreuth', 'm', 2, 2),
(118, 'Peter', 'Maffai', '95444', 'Bayreuth', 'm', 1, 3),
(119, 'Boaty', 'McBoatface', '95659', 'Arzberg', 'm', 4, 4),
(120, 'Mazzo', 'Fazzo', '95444', 'Bayreuth', 'm', 1, 1),
(121, 'Matso', 'Fatso', '95448', 'Bayreuth', 'm', 2, 1),
(122, 'Mats', 'Richter', '95326', 'Kulmbach', 'm', 3, 1),
(123, 'Mad', 'Mats', '95659', 'Arzberg', 'm', 4, 6),
(124, 'Raging', 'Matsoboi', '95466', 'Weidenberg', 'm', 5, 6);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `mitglied_sportart`
--

CREATE TABLE `mitglied_sportart` (
  `mi_id` int(11) NOT NULL,
  `sa_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `mitglied_sportart`
--

INSERT INTO `mitglied_sportart` (`mi_id`, `sa_id`) VALUES
(1, 3),
(1, 5),
(1, 8),
(7, 2),
(8, 2),
(11, 4),
(12, 3),
(13, 3),
(14, 3),
(15, 3),
(16, 3),
(17, 3),
(18, 3),
(20, 1),
(21, 1),
(22, 1),
(23, 1),
(24, 1),
(25, 1),
(26, 1),
(27, 1),
(28, 1),
(29, 1),
(30, 1),
(31, 1),
(32, 1),
(33, 1),
(34, 1),
(35, 1),
(36, 1),
(37, 1),
(38, 1),
(39, 1),
(40, 1),
(41, 1),
(42, 1),
(43, 1),
(44, 1),
(45, 1),
(46, 1),
(47, 1),
(48, 1),
(49, 1),
(50, 1),
(51, 1),
(52, 1),
(53, 1),
(54, 1),
(55, 1),
(56, 1),
(57, 1),
(58, 1),
(59, 1),
(60, 1),
(61, 1),
(70, 4),
(71, 4),
(72, 4),
(73, 4),
(74, 1),
(74, 4),
(75, 4),
(76, 5),
(77, 5),
(78, 5),
(79, 5),
(80, 5),
(81, 5),
(82, 6),
(83, 6),
(84, 6),
(85, 6),
(86, 6),
(87, 1),
(87, 6),
(88, 7),
(89, 7),
(90, 7),
(91, 7),
(92, 7),
(93, 7),
(94, 1),
(111, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `spieler`
--

CREATE TABLE `spieler` (
  `ma_id` int(11) NOT NULL,
  `mi_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `spieler`
--

INSERT INTO `spieler` (`ma_id`, `mi_id`) VALUES
(1, 20),
(1, 21),
(1, 22),
(1, 23),
(1, 24),
(1, 25),
(1, 26),
(1, 27),
(1, 28),
(1, 29),
(1, 30),
(1, 31),
(1, 32),
(1, 33),
(1, 34),
(1, 35),
(1, 36),
(1, 37),
(1, 50),
(2, 38),
(2, 39),
(2, 40),
(2, 41),
(2, 42),
(2, 43),
(2, 44),
(2, 45),
(2, 46),
(2, 47),
(2, 48),
(2, 49),
(2, 51),
(2, 52),
(2, 53),
(2, 54),
(2, 55),
(2, 56),
(2, 57),
(2, 58),
(2, 59),
(2, 60),
(2, 61),
(4, 13),
(4, 14),
(4, 15),
(4, 16),
(4, 17),
(4, 18);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sportart`
--

CREATE TABLE `sportart` (
  `sa_id` int(11) NOT NULL,
  `abteilung` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `beitrag` decimal(7,2) NOT NULL,
  `mi_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `sportart`
--

INSERT INTO `sportart` (`sa_id`, `abteilung`, `beitrag`, `mi_id`) VALUES
(1, 'Fußball', '35.00', 20),
(2, 'Handball', '25.00', 7),
(3, 'Boxen', '15.00', 17),
(4, 'Kraft Dreikampf', '30.00', 11),
(5, 'Tennis', '100.00', 1),
(6, 'Yoga', '10.00', 84),
(7, 'Taekwondo', '25.00', 90),
(8, 'Aerobic', '10.00', 1),
(9, 'Dummy', '1.00', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `trainer`
--

CREATE TABLE `trainer` (
  `ma_id` int(11) NOT NULL,
  `mi_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `trainer`
--

INSERT INTO `trainer` (`ma_id`, `mi_id`) VALUES
(1, 94),
(1, 111),
(2, 74),
(2, 87),
(3, 7),
(3, 8),
(4, 1),
(4, 12);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `grundbeitrag`
--
ALTER TABLE `grundbeitrag`
  ADD PRIMARY KEY (`gb_id`);

--
-- Indizes für die Tabelle `mannschaft`
--
ALTER TABLE `mannschaft`
  ADD PRIMARY KEY (`ma_id`),
  ADD KEY `sa_id` (`sa_id`);

--
-- Indizes für die Tabelle `mitglied`
--
ALTER TABLE `mitglied`
  ADD PRIMARY KEY (`mi_id`),
  ADD KEY `gb_id` (`gb_id`);

--
-- Indizes für die Tabelle `mitglied_sportart`
--
ALTER TABLE `mitglied_sportart`
  ADD PRIMARY KEY (`mi_id`,`sa_id`),
  ADD KEY `mi_id` (`mi_id`),
  ADD KEY `sa_id` (`sa_id`);

--
-- Indizes für die Tabelle `spieler`
--
ALTER TABLE `spieler`
  ADD PRIMARY KEY (`ma_id`,`mi_id`),
  ADD KEY `ma_id` (`ma_id`),
  ADD KEY `mi_id` (`mi_id`);

--
-- Indizes für die Tabelle `sportart`
--
ALTER TABLE `sportart`
  ADD PRIMARY KEY (`sa_id`),
  ADD KEY `mi_id` (`mi_id`);

--
-- Indizes für die Tabelle `trainer`
--
ALTER TABLE `trainer`
  ADD PRIMARY KEY (`ma_id`,`mi_id`),
  ADD KEY `ma_id` (`ma_id`),
  ADD KEY `mi_id` (`mi_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `grundbeitrag`
--
ALTER TABLE `grundbeitrag`
  MODIFY `gb_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT für Tabelle `mannschaft`
--
ALTER TABLE `mannschaft`
  MODIFY `ma_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `mitglied`
--
ALTER TABLE `mitglied`
  MODIFY `mi_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;
--
-- AUTO_INCREMENT für Tabelle `sportart`
--
ALTER TABLE `sportart`
  MODIFY `sa_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `mannschaft`
--
ALTER TABLE `mannschaft`
  ADD CONSTRAINT `sa_id` FOREIGN KEY (`sa_id`) REFERENCES `sportart` (`sa_id`);

--
-- Constraints der Tabelle `mitglied`
--
ALTER TABLE `mitglied`
  ADD CONSTRAINT `gb_id` FOREIGN KEY (`gb_id`) REFERENCES `grundbeitrag` (`gb_id`);

--
-- Constraints der Tabelle `mitglied_sportart`
--
ALTER TABLE `mitglied_sportart`
  ADD CONSTRAINT `mi_id` FOREIGN KEY (`mi_id`) REFERENCES `mitglied` (`mi_id`),
  ADD CONSTRAINT `mitglied_sportart_ibfk_1` FOREIGN KEY (`sa_id`) REFERENCES `sportart` (`sa_id`);

--
-- Constraints der Tabelle `spieler`
--
ALTER TABLE `spieler`
  ADD CONSTRAINT `spieler_ibfk_1` FOREIGN KEY (`ma_id`) REFERENCES `mannschaft` (`ma_id`),
  ADD CONSTRAINT `spieler_ibfk_2` FOREIGN KEY (`mi_id`) REFERENCES `mitglied` (`mi_id`);

--
-- Constraints der Tabelle `sportart`
--
ALTER TABLE `sportart`
  ADD CONSTRAINT `sportart_ibfk_1` FOREIGN KEY (`mi_id`) REFERENCES `mitglied` (`mi_id`);

--
-- Constraints der Tabelle `trainer`
--
ALTER TABLE `trainer`
  ADD CONSTRAINT `trainer_ibfk_1` FOREIGN KEY (`ma_id`) REFERENCES `mannschaft` (`ma_id`),
  ADD CONSTRAINT `trainer_ibfk_2` FOREIGN KEY (`mi_id`) REFERENCES `mitglied` (`mi_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
