-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 15, 2021 at 06:29 PM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `users`
--

-- --------------------------------------------------------

--
-- Table structure for table `Kontrahent`
--

CREATE TABLE `Kontrahent` (
  `KontrahentID` int(11) NOT NULL,
  `Nazwa` varchar(255) NOT NULL,
  `Imie` varchar(255) NOT NULL,
  `Nazwisko` varchar(255) NOT NULL,
  `Telefon` varchar(255) NOT NULL,
  `Adresa` varchar(255) NOT NULL,
  `Miasto` varchar(255) NOT NULL,
  `Powiat` varchar(255) NOT NULL,
  `KodPocztowy` int(11) NOT NULL,
  `Kraj` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Kontrahent`
--

INSERT INTO `Kontrahent` (`KontrahentID`, `Nazwa`, `Imie`, `Nazwisko`, `Telefon`, `Adresa`, `Miasto`, `Powiat`, `KodPocztowy`, `Kraj`) VALUES
(1, 'Mark', 'Mark', 'Jordan', '8-312-342-35-32', 'ul.Okulickiego, 32', 'Warszawa', 'Warszawski', 35123, 'Polska'),
(2, 'Adrian', 'Adrian', 'Kwiatowski', '8-232-232-82-35', 'ul.Polawskiego, 5', 'Lańcut', 'Lańcut', 37122, 'Polska'),
(3, 'Jan', 'Jan', 'Kowalski', '8-800-555-35-35', 'ul.Jakiegoskiego, 2', 'Rzeszów', 'Rzeszowski', 35444, 'Polska'),
(4, 'Lukasz', 'Lukasz', 'Mazowiecki', '8-900-555-23-35', 'ul.Sikorskiego, 14', 'Gdańsk', 'Gdański', 37041, 'Polska'),
(5, 'Jan', 'Jan', 'Adamski', '8-877-885-31-21', 'ul.Rynek, 90', 'Gdynia', 'Gdyński', 35186, 'Polska'),
(6, 'Microsoft', 'Andrii', 'Yakovyna', '1234567890', 'Kherson', 'Kherson', 'Kherson', 75600, 'Ukraine'),
(7, 'asf', 'ds', 'fasfsa', 'sfa', 'saf', 'safsfa', 'fas', 12345, 'fsasfa');

-- --------------------------------------------------------

--
-- Table structure for table `Produkt`
--

CREATE TABLE `Produkt` (
  `ProduktID` int(11) NOT NULL,
  `Producent` varchar(255) NOT NULL,
  `Nazwa` varchar(255) NOT NULL,
  `Rozmiar` int(11) NOT NULL,
  `CenaNetto` decimal(6,2) NOT NULL,
  `DostepnaIlosc` int(11) NOT NULL,
  `KrajPochodzenia` varchar(255) NOT NULL,
  `Opis` varchar(255) NOT NULL,
  `StawkaVAT` decimal(4,2) NOT NULL,
  `KwotaVAT` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Produkt`
--

INSERT INTO `Produkt` (`ProduktID`, `Producent`, `Nazwa`, `Rozmiar`, `CenaNetto`, `DostepnaIlosc`, `KrajPochodzenia`, `Opis`, `StawkaVAT`, `KwotaVAT`) VALUES
(1, 'Pringles', 'Chips', 1, '5.00', 3680, 'Portugalia', 'Bekonowy smak', '13.60', '0.71'),
(2, 'Sven', 'Mouse', 1, '9.80', 9023, 'Portugalia', '3500 dpi', '19.23', '1.88'),
(3, 'Apple', 'MacBook', 3, '1500.00', 127, 'China', '2020 rok', '23.00', '345.00'),
(4, 'Samsung', 'Galaxy S8', 1, '375.24', 96, 'USA', '12mp Camera', '23.00', '86.31'),
(5, 'Microsoft', 'Windows', 1, '18.65', 10000, 'USA', 'Home Version', '18.00', '3.00'),
(6, 'Patagonia', 'Kurtka', 2, '1150.00', 56, 'USA', 'Zimowa kurtka', '14.50', '166.50'),
(7, 'Dunder Mifflin', 'Paper', 3, '53.00', 2056, 'USA', 'Scranton Paper', '17.58', '9.43'),
(8, 'Travis Scott', 'Astroworld Record', 1, '10.00', 100000, 'USA', 'Deluxe Edition', '21.00', '2.10'),
(9, 'Leonardo Da Vinci', 'Mona Lisa', 3, '3680.00', 1, 'Berlin', 'One of a kind', '5.00', '184.00'),
(10, 'Christopher Nolan', 'Tenet', 1, '19.50', 200451, 'USA', 'Confusing time', '9.00', '1.76');

-- --------------------------------------------------------

--
-- Table structure for table `Produkt_Zamowienie`
--

CREATE TABLE `Produkt_Zamowienie` (
  `PositionID` int(11) NOT NULL,
  `ProduktID` int(11) NOT NULL,
  `OrderID` int(11) NOT NULL,
  `Ilosc` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Produkt_Zamowienie`
--

INSERT INTO `Produkt_Zamowienie` (`PositionID`, `ProduktID`, `OrderID`, `Ilosc`) VALUES
(2, 3, 2, 2),
(2, 4, 3, 5),
(2, 3, 3, 6),
(2, 9, 3, 1),
(6, 5, 4, 1),
(6, 9, 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Zamowienie`
--

CREATE TABLE `Zamowienie` (
  `OrderID` int(11) NOT NULL,
  `KontrahentID` int(11) NOT NULL,
  `DataZamowienia` varchar(255) NOT NULL,
  `DataWyslania` varchar(255) NOT NULL,
  `Status` varchar(255) NOT NULL,
  `Komentarze` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Zamowienie`
--

INSERT INTO `Zamowienie` (`OrderID`, `KontrahentID`, `DataZamowienia`, `DataWyslania`, `Status`, `Komentarze`) VALUES
(2, 7, 'Mon Feb 15 2021 15:25:43 GMT+0200 (GMT+02:00)', 'Mon Feb 15 2021 15:25:43 GMT+0200 (GMT+02:00)', 'Oplacona', ' '),
(3, 3, 'Mon Feb 15 2021 16:05:16 GMT+0200 (GMT+02:00)', 'Mon Feb 15 2021 16:05:16 GMT+0200 (GMT+02:00)', 'Oplacona', ' '),
(4, 4, 'Mon Feb 15 2021 19:54:07 GMT+0200 (GMT+02:00)', 'Mon Feb 15 2021 19:54:07 GMT+0200 (GMT+02:00)', 'Oplacona', ' ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Kontrahent`
--
ALTER TABLE `Kontrahent`
  ADD PRIMARY KEY (`KontrahentID`);

--
-- Indexes for table `Produkt`
--
ALTER TABLE `Produkt`
  ADD PRIMARY KEY (`ProduktID`);

--
-- Indexes for table `Zamowienie`
--
ALTER TABLE `Zamowienie`
  ADD PRIMARY KEY (`OrderID`);
