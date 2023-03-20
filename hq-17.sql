-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 18, 2023 at 11:11 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hq-17`
--

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `patient_id` int(200) NOT NULL,
  `id_card` varchar(13) NOT NULL,
  `fistname` varchar(100) NOT NULL,
  `lastname` varchar(200) NOT NULL,
  `password` varchar(8) NOT NULL,
  `birthday` date NOT NULL,
  `age` int(200) NOT NULL,
  `weight` int(200) NOT NULL,
  `height` int(200) NOT NULL,
  `nationality` varchar(200) NOT NULL,
  `religion` varchar(200) NOT NULL,
  `contact_person` varchar(200) NOT NULL,
  `history_drug_allergy` varchar(200) NOT NULL,
  `phone_number` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`patient_id`, `id_card`, `fistname`, `lastname`, `password`, `birthday`, `age`, `weight`, `height`, `nationality`, `religion`, `contact_person`, `history_drug_allergy`, `phone_number`) VALUES
(1, '1729800000099', 'ณรงค์ฤทธิ์', 'สุปรานนท์', '', '0000-00-00', 22, 65, 178, '178', 'พุทธ', 'ศิวกร', 'ไม่มี', '989999999'),
(2, '1729800000099', 'นันทชัย', 'แสงอรุณ', '', '0000-00-00', 22, 65, 178, '178', 'พุทธ', 'ศิวกร', 'ไม่มี', '989999999'),
(3, '1729800000002', 'นันทชัย', 'แสงอรุณ', '', '0000-00-00', 22, 65, 178, 'ไทย', 'พุทธ', 'ศิวกร', 'ไม่มี', '989999999');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_authorities`
--

CREATE TABLE `tbl_authorities` (
  `authorities_id` int(200) NOT NULL,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `password` varchar(8) NOT NULL,
  `authorities_status` varchar(30) NOT NULL,
  `department_id` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_authorities`
--

INSERT INTO `tbl_authorities` (`authorities_id`, `first_name`, `last_name`, `password`, `authorities_status`, `department_id`) VALUES
(1, 'อถพล', 'สองสี', '11111111', 'พักงาน', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_congenital_disease`
--

CREATE TABLE `tbl_congenital_disease` (
  `cd_id` int(200) NOT NULL,
  `cd_name` varchar(200) NOT NULL,
  `symptom` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_congenital_disease`
--

INSERT INTO `tbl_congenital_disease` (`cd_id`, `cd_name`, `symptom`) VALUES
(1, 'โรคหัวใจ', 'ปวดหัวตัวร้อนเป็นไข้');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_department`
--

CREATE TABLE `tbl_department` (
  `department_id` int(200) NOT NULL,
  `department_name` varchar(60) NOT NULL,
  `department_image` varchar(255) NOT NULL,
  `close_time` varchar(100) NOT NULL,
  `max_queue_number` varchar(100) NOT NULL,
  `floor` varchar(30) NOT NULL,
  `building` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_department`
--

INSERT INTO `tbl_department` (`department_id`, `department_name`, `department_image`, `close_time`, `max_queue_number`, `floor`, `building`) VALUES
(1, 'ทันตกรรม', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fthaksinhospital.com%2Fthaksin%2Fdepartment_detail.php%3Fmenu%3D1%26id%3D2&psig=AOvVaw1gFo2WwZqOoJPLDIq5BJDl&ust=1678686478156000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCLCmtc3Y1f0CFQAAAAAdAAAAABAD', '16.00', '200', '3', '3'),
(2, 'ทันตกรรม', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fthaksinhospital.com%2Fthaksin%2Fdepartment_detail.php%3Fmenu%3D1%26id%3D2&psig=AOvVaw1gFo2WwZqOoJPLDIq5BJDl&ust=1678686478156000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCLCmtc3Y1f0CFQAAAAAdAAAAABAD', '16.00', '200', '3', '3'),
(3, 'แผนกสูติ-นรีเวช', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fthaksinhospital.com%2Fthaksin%2Fdepartment_detail.php%3Fmenu%3D1%26id%3D2&psig=AOvVaw1gFo2WwZqOoJPLDIq5BJDl&ust=1678686478156000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCLCmtc3Y1f0CFQAAAAAdAAAAABAD', '16.00', '200', '3', '3'),
(4, 'ทันตกรรม', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fthaksinhospital.com%2Fthaksin%2Fdepartment_detail.php%3Fmenu%3D1%26id%3D2&psig=AOvVaw1gFo2WwZqOoJPLDIq5BJDl&ust=1678686478156000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCLCmtc3Y1f0CFQAAAAAdAAAAABAD', '16.00', '200', '3', '3');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_doctor`
--

CREATE TABLE `tbl_doctor` (
  `doctor_id` int(20) NOT NULL,
  `doctor_name` varchar(50) NOT NULL,
  `doctor_phonenumber` varchar(10) NOT NULL,
  `department_id` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_doctor`
--

INSERT INTO `tbl_doctor` (`doctor_id`, `doctor_name`, `doctor_phonenumber`, `department_id`) VALUES
(1, 'นันทชัย', '888888888', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_have_patient`
--

CREATE TABLE `tbl_have_patient` (
  `id_card` varchar(13) NOT NULL,
  `cd_id` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_have_patient`
--

INSERT INTO `tbl_have_patient` (`id_card`, `cd_id`) VALUES
('1729800000000', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_hospital`
--

CREATE TABLE `tbl_hospital` (
  `hospital_id` varchar(20) NOT NULL,
  `hospital_name` varchar(50) NOT NULL,
  `hospital_logo` varchar(255) NOT NULL,
  `hospital_phone_number` int(10) NOT NULL,
  `hospital_No` int(10) NOT NULL,
  `hospital_Moo` int(10) NOT NULL,
  `hospital_subdistrict` varchar(50) NOT NULL,
  `hospital_district` varchar(50) NOT NULL,
  `hospital_province` varchar(50) NOT NULL,
  `hospital_zipcode` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_hospital`
--

INSERT INTO `tbl_hospital` (`hospital_id`, `hospital_name`, `hospital_logo`, `hospital_phone_number`, `hospital_No`, `hospital_Moo`, `hospital_subdistrict`, `hospital_district`, `hospital_province`, `hospital_zipcode`) VALUES
('1', 'โรงพยาบาลสมเด็จพระสังฆราช องค์ที่ 17', 'image_link', 200000000, 88, 12, 'Noenpraprang', 'Song Phi Nong', ' Suphan Buri', 72110);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_questionaire`
--

CREATE TABLE `tbl_questionaire` (
  `questionaire_id` int(200) NOT NULL,
  `questionaire_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_questionaire`
--

INSERT INTO `tbl_questionaire` (`questionaire_id`, `questionaire_name`) VALUES
(1, 'ระบบควรปรับปรุงอย่างยิ่ง'),
(2, 'ระบบควรปรับปรุง'),
(3, 'ระบบใช้งานได้สะดวกพอใช้'),
(4, 'ระบบใช้งานได้สะดวกดี'),
(5, 'ระบบใช้งานได้สะดวกดีมาก');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_queue`
--

CREATE TABLE `tbl_queue` (
  `queue_id` int(11) NOT NULL,
  `queue_date` varchar(20) NOT NULL,
  `crated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `department_id` int(200) NOT NULL,
  `id_card` varchar(13) NOT NULL,
  `queue_status_id` int(200) NOT NULL,
  `authorities_id` int(200) NOT NULL,
  `questionaire_id` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_queue`
--

INSERT INTO `tbl_queue` (`queue_id`, `queue_date`, `crated_at`, `department_id`, `id_card`, `queue_status_id`, `authorities_id`, `questionaire_id`) VALUES
(1, '09/03/2565', '2023-03-18 10:05:48', 1, '1729800000000', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_queue_status`
--

CREATE TABLE `tbl_queue_status` (
  `queue_status_id` int(200) NOT NULL,
  `queue_status_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_queue_status`
--

INSERT INTO `tbl_queue_status` (`queue_status_id`, `queue_status_name`) VALUES
(1, 'ยืนยัน'),
(2, 'ปกติ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`patient_id`,`id_card`);

--
-- Indexes for table `tbl_authorities`
--
ALTER TABLE `tbl_authorities`
  ADD PRIMARY KEY (`authorities_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `tbl_congenital_disease`
--
ALTER TABLE `tbl_congenital_disease`
  ADD PRIMARY KEY (`cd_id`);

--
-- Indexes for table `tbl_department`
--
ALTER TABLE `tbl_department`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `tbl_doctor`
--
ALTER TABLE `tbl_doctor`
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `tbl_have_patient`
--
ALTER TABLE `tbl_have_patient`
  ADD PRIMARY KEY (`id_card`),
  ADD KEY `cd_id` (`cd_id`);

--
-- Indexes for table `tbl_questionaire`
--
ALTER TABLE `tbl_questionaire`
  ADD PRIMARY KEY (`questionaire_id`);

--
-- Indexes for table `tbl_queue`
--
ALTER TABLE `tbl_queue`
  ADD PRIMARY KEY (`queue_id`),
  ADD KEY `authorities_id` (`authorities_id`),
  ADD KEY `queue_status_id` (`queue_status_id`),
  ADD KEY `questionaire_id` (`questionaire_id`);

--
-- Indexes for table `tbl_queue_status`
--
ALTER TABLE `tbl_queue_status`
  ADD PRIMARY KEY (`queue_status_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `patient_id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_authorities`
--
ALTER TABLE `tbl_authorities`
  MODIFY `authorities_id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_congenital_disease`
--
ALTER TABLE `tbl_congenital_disease`
  MODIFY `cd_id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_department`
--
ALTER TABLE `tbl_department`
  MODIFY `department_id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_questionaire`
--
ALTER TABLE `tbl_questionaire`
  MODIFY `questionaire_id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_queue`
--
ALTER TABLE `tbl_queue`
  MODIFY `queue_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_queue_status`
--
ALTER TABLE `tbl_queue_status`
  MODIFY `queue_status_id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_authorities`
--
ALTER TABLE `tbl_authorities`
  ADD CONSTRAINT `tbl_authorities_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `tbl_department` (`department_id`);

--
-- Constraints for table `tbl_doctor`
--
ALTER TABLE `tbl_doctor`
  ADD CONSTRAINT `tbl_doctor_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `tbl_department` (`department_id`);

--
-- Constraints for table `tbl_have_patient`
--
ALTER TABLE `tbl_have_patient`
  ADD CONSTRAINT `tbl_have_patient_ibfk_1` FOREIGN KEY (`cd_id`) REFERENCES `tbl_congenital_disease` (`cd_id`);

--
-- Constraints for table `tbl_queue`
--
ALTER TABLE `tbl_queue`
  ADD CONSTRAINT `tbl_queue_ibfk_1` FOREIGN KEY (`authorities_id`) REFERENCES `tbl_authorities` (`authorities_id`),
  ADD CONSTRAINT `tbl_queue_ibfk_2` FOREIGN KEY (`queue_status_id`) REFERENCES `tbl_queue_status` (`queue_status_id`),
  ADD CONSTRAINT `tbl_queue_ibfk_3` FOREIGN KEY (`questionaire_id`) REFERENCES `tbl_questionaire` (`questionaire_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
