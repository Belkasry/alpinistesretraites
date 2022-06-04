-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 04 juin 2022 à 03:12
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `alpinistes_retraites`
--

-- --------------------------------------------------------

--
-- Structure de la table `destination`
--

CREATE TABLE `destination` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `longitude` decimal(30,15) DEFAULT NULL,
  `latitude` decimal(30,15) DEFAULT NULL,
  `level` int(11) NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `destination`
--

INSERT INTO `destination` (`id`, `parent_id`, `name`, `longitude`, `latitude`, `level`, `description`) VALUES
(1, 1, 'Toubkal', NULL, NULL, 4, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.'),
(2, NULL, 'Imlil', NULL, NULL, 0, ''),
(3, NULL, 'Tidghine', NULL, NULL, 0, ''),
(4, NULL, 'marzouga', NULL, NULL, 0, '');

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20220313203050', '2022-03-13 21:31:26', 616),
('DoctrineMigrations\\Version20220320100236', '2022-03-20 11:05:22', 514),
('DoctrineMigrations\\Version20220325132140', '2022-03-25 14:22:20', 385),
('DoctrineMigrations\\Version20220325133542', '2022-03-25 14:35:51', 57),
('DoctrineMigrations\\Version20220326104127', '2022-03-26 11:42:51', 290),
('DoctrineMigrations\\Version20220326191735', '2022-03-26 20:18:00', 144),
('DoctrineMigrations\\Version20220326192411', '2022-03-26 20:24:22', 51),
('DoctrineMigrations\\Version20220328155615', '2022-03-28 17:56:25', 297),
('DoctrineMigrations\\Version20220515151545', '2022-05-15 17:20:48', 116),
('DoctrineMigrations\\Version20220530193327', '2022-05-30 21:38:27', 119),
('DoctrineMigrations\\Version20220530195137', '2022-05-30 21:51:47', 195);

-- --------------------------------------------------------

--
-- Structure de la table `experience`
--

CREATE TABLE `experience` (
  `id` int(11) NOT NULL,
  `guide_id` int(11) DEFAULT NULL,
  `destination_id` int(11) DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dificulte` smallint(6) DEFAULT NULL,
  `nbr_participant` int(11) DEFAULT NULL,
  `nbr_participant_restant` int(11) DEFAULT NULL,
  `prix` decimal(10,4) NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `etat` tinyint(1) NOT NULL,
  `fixe` tinyint(1) NOT NULL DEFAULT 0,
  `start` datetime DEFAULT NULL,
  `finish` datetime DEFAULT NULL,
  `requirement` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '(DC2Type:json_array)',
  `notice` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '(DC2Type:json_array)',
  `duree` int(11) DEFAULT NULL,
  `include` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '(DC2Type:json)',
  `created_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `experience`
--

INSERT INTO `experience` (`id`, `guide_id`, `destination_id`, `title`, `dificulte`, `nbr_participant`, `nbr_participant_restant`, `prix`, `description`, `etat`, `fixe`, `start`, `finish`, `requirement`, `notice`, `duree`, `include`, `created_at`, `updated_at`) VALUES
(1, 3, 1, 'SSSSSS EXPERIENCE', 4, 3, NULL, '3200.0000', 'CHTIK TIK', 0, 0, '2021-03-12 00:00:00', '2021-03-13 00:00:00', NULL, '[\"Notice 3\",\"Notice4\",\"Notice5\"]', 3, NULL, '2022-05-09 16:22:36', '2022-05-17 01:41:19'),
(2, 4, 1, 'Ouanoukrim', 4, 3, NULL, '1200.0000', '{\"blocks\":[{\"key\":\"fvbsf\",\"text\":\"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum fin \",\"type\":\"ordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}', 1, 0, '2022-03-12 18:00:27', '2022-03-14 18:00:27', '[\"\\u062d\\u0642\\u064a\\u0628\\u0629 \\u0638\\u0647\\u0631 ( 50 \\u0644\\u062a\\u0631),\\u0628\\u0648\\u0646\\u0634\\u0648\",\"\\u062d\\u0642\\u064a\\u0628\\u0629 \\u0638\\u0647\\u0631 \\u062d\\u062c\\u0645 \\u0635\\u063a\\u064a\\u0631 ( 10\\/20 \\u0644\\u062a\\u0631) \\u0644\\u062a\\u0646\\u0642\\u0644,\\u0636\\u0631\\u0648\\u0631\\u064a\\u0629-\\u062d\\u0642\\u064a\\u0628\\u0629 \\u0627\\u0644\\u0646\\u0648\\u0645-\",\"\\u0645\\u0644\\u0627\\u0628\\u0633 \\u0645\\u0631\\u064a\\u062d\\u0629 ( \\u0646\\u0638\\u0627\\u0645 \\u062a\\u0644\\u0627\\u062b\\u0629 \\u0637\\u0628\\u0642\\u0627\\u062a),\\u0646\\u0638\\u0627\\u0631\\u0627\\u062a \\u0634\\u0645\\u0633\\u064a\\u0629.\",\"\\u0633\\u062a\\u0631\\u0629 \\u0645\\u0636\\u0627\\u062f\\u0629 \\u0644\\u0644\\u0628\\u0644\\u0644 \\u0648 \\u062a\\u0645\\u0646\\u0639 \\u0645\\u0631\\u0648\\u0631 \\u0627\\u0644\\u0631\\u064a\\u0627\\u062d.,\\u062a\\u0645\\u0631 \\u060c \\u0641\\u0648\\u0627\\u0643\\u0647 \\u062c\\u0627\\u0641\\u0629\\u2026..\",\"\\u062c\\u0648\\u0627\\u0631\\u0628 \\u062e\\u0627\\u0635\\u0629 \\u0628\\u062c\\u0648\\u0644\\u0627\\u062a \\u0627\\u0644\\u0645\\u0634\\u064a.,\\u0635\\u064a\\u062f\\u0644\\u064a\\u0629 \\u0634\\u062e\\u0635\\u064a\\u0629 ( \\u062f\\u0648\\u0627\\u0621 \\u0623\\u0644\\u0645 \\u0627\\u0644\\u0631\\u0623\\u0633 \\u0648 \\u0627\\u0644\\u0623\\u0633\\u0646\\u0627\\u0646\\u060c \\u0636\\u0645\\u0627\\u062f\\u0627\\u062a\\u2026.)\",\"\\u0642\\u0641\\u0627\\u0632\\u0627\\u062a.,\\u0627\\u0628\\u062a\\u0633\\u0627\\u0645\\u062a\\u0643\\u0645 \\u0648 \\u0631\\u0648\\u062d\\u0643\\u0645 \\u0627\\u0644\\u0645\\u0631\\u062d\\u0629\"]', '[\"\\u0639\\u0644\\u0649 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0627\\u0644\\u0642\\u062f\\u0648\\u0645 15 \\u062f\\u0642\\u064a\\u0642\\u0629 \\u0642\\u0628\\u0644 \\u0645\\u0648\\u0639\\u062f \\u0627\\u0646\\u0637\\u0644\\u0627\\u0642 \\u0627\\u0644\\u0631\\u062d\\u0644\\u0629.\",\"\\u0631\\u062d\\u0644\\u0627\\u062a \\u0627\\u0644\\u0645\\u0634\\u064a \\u062a\\u062a\\u0637\\u0644\\u0628 \\u0645\\u0646 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0642\\u062f\\u0631\\u0629 \\u0628\\u062f\\u0646\\u064a\\u0629 \\u0648 \\u064a\\u0642\\u0636\\u0629 \\u0630\\u0647\\u0646\\u064a\\u0629 \\u062a\\u062e\\u062a\\u0644\\u0641 \\u062d\\u0633\\u0628 \\u0625\\u062e\\u062a\\u0644\\u0627\\u0641 \\u0627\\u0644\\u0645\\u0633\\u0627\\u0631\\u0627\\u062a.\",\"\\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u0648\\u0646 \\u0627\\u0644\\u0630\\u064a\\u0646 \\u064a\\u062d\\u062a\\u0627\\u062c\\u0648\\u0646 \\u0644\\u0639\\u0646\\u0627\\u064a\\u0629 \\u062e\\u0627\\u0635\\u0629 \\u060c \\u064a\\u062a\\u0648\\u062c\\u0628 \\u0639\\u0644\\u064a\\u0647\\u0645 \\u0627\\u0644\\u0642\\u062f\\u0648\\u0645 \\u0631\\u0641\\u0642\\u0629 \\u0623\\u062d\\u062f \\u0623\\u0641\\u0631\\u0627\\u062f \\u0639\\u0627\\u0626\\u0644\\u062a\\u0647\\u0645 \\u0623\\u0648 \\u0623\\u062d\\u062f \\u0623\\u0635\\u062f\\u0642\\u0627\\u0626\\u0647\\u0645\",\"\\u0641\\u064a \\u0628\\u0639\\u0636 \\u0627\\u0644\\u062d\\u0627\\u0644\\u0627\\u062a \\u0627\\u0644\\u0646\\u0627\\u062f\\u0631\\u0629 \\u064a\\u062a\\u0639\\u064a\\u0646 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0645\\u0633\\u0624\\u0648\\u0644 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0631\\u062d\\u0644\\u0629 \\u0625\\u062c\\u0631\\u0627\\u0621 \\u062a\\u0639\\u062f\\u064a\\u0644\\u0627\\u062a \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0628\\u0631\\u0646\\u0627\\u0645\\u062c \\u060c \\u0644\\u0630\\u0644\\u0643 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0623\\u0646 \\u064a\\u0643\\u0648\\u0646\\u0648\\u0627 \\u0645\\u062a\\u0639\\u0627\\u0648\\u0646\\u064a\\u0646 \\u0648 \\u0645\\u062a\\u0641\\u0647\\u0645\\u064a\\u0646 \\u0644\\u0647\\u0630\\u0627 \\u0627\\u0644\\u0623\\u0645\\u0631.\",\"\\u064a\\u0645\\u0643\\u0646 \\u0644\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0627\\u0644\\u0625\\u062a\\u0635\\u0627\\u0644 \\u0644\\u0644\\u0625\\u0633\\u062a\\u0641\\u0633\\u0627\\u0631 \\u0639\\u0644\\u0649 \\u0623\\u064a \\u0627\\u0645\\u0631 \\u064a\\u062e\\u0635 \\u0627\\u0644\\u0631\\u062d\\u0644\\u0629 ( \\u0628\\u0631\\u0646\\u0627\\u0645\\u062c \\u2013 \\u0645\\u0639\\u062f\\u0627\\u062a- \\u0627\\u0644\\u0645\\u0646\\u0637\\u0642\\u0629..) \\u0642\\u0628\\u0644 \\u0625\\u0646\\u0637\\u0644\\u0627\\u0642\\u0647\\u0627\\u060c \\u0648 \\u0633\\u0646\\u0643\\u0648\\u0646 \\u0633\\u0639\\u062f\\u0627\\u0621 \\u0628\\u0644\\u0625\\u062c\\u0627\\u0628\\u0629 \\u0639\\u0644\\u064a\\u0647\\u0627.\"]', 4, '[\"\\u0639\\u0644\\u0649 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0627\\u0644\\u0642\\u062f\\u0648\\u0645 15 \\u062f\\u0642\\u064a\\u0642\\u0629 \\u0642\\u0628\\u0644 \\u0645\\u0648\\u0639\\u062f \\u0627\\u0646\\u0637\\u0644\\u0627\\u0642 \\u0627\\u0644\\u0631\\u062d\\u0644\\u0629.\",\"\\u0631\\u062d\\u0644\\u0627\\u062a \\u0627\\u0644\\u0645\\u0634\\u064a \\u062a\\u062a\\u0637\\u0644\\u0628 \\u0645\\u0646 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0642\\u062f\\u0631\\u0629 \\u0628\\u062f\\u0646\\u064a\\u0629 \\u0648 \\u064a\\u0642\\u0636\\u0629 \\u0630\\u0647\\u0646\\u064a\\u0629 \\u062a\\u062e\\u062a\\u0644\\u0641 \\u062d\\u0633\\u0628 \\u0625\\u062e\\u062a\\u0644\\u0627\\u0641 \\u0627\\u0644\\u0645\\u0633\\u0627\\u0631\\u0627\\u062a.\",\"\\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u0648\\u0646 \\u0627\\u0644\\u0630\\u064a\\u0646 \\u064a\\u062d\\u062a\\u0627\\u062c\\u0648\\u0646 \\u0644\\u0639\\u0646\\u0627\\u064a\\u0629 \\u062e\\u0627\\u0635\\u0629 \\u060c \\u064a\\u062a\\u0648\\u062c\\u0628 \\u0639\\u0644\\u064a\\u0647\\u0645 \\u0627\\u0644\\u0642\\u062f\\u0648\\u0645 \\u0631\\u0641\\u0642\\u0629 \\u0623\\u062d\\u062f \\u0623\\u0641\\u0631\\u0627\\u062f \\u0639\\u0627\\u0626\\u0644\\u062a\\u0647\\u0645 \\u0623\\u0648 \\u0623\\u062d\\u062f \\u0623\\u0635\\u062f\\u0642\\u0627\\u0626\\u0647\\u0645\",\"\\u0641\\u064a \\u0628\\u0639\\u0636 \\u0627\\u0644\\u062d\\u0627\\u0644\\u0627\\u062a \\u0627\\u0644\\u0646\\u0627\\u062f\\u0631\\u0629 \\u064a\\u062a\\u0639\\u064a\\u0646 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0645\\u0633\\u0624\\u0648\\u0644 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0631\\u062d\\u0644\\u0629 \\u0625\\u062c\\u0631\\u0627\\u0621 \\u062a\\u0639\\u062f\\u064a\\u0644\\u0627\\u062a \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0628\\u0631\\u0646\\u0627\\u0645\\u062c \\u060c \\u0644\\u0630\\u0644\\u0643 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0623\\u0646 \\u064a\\u0643\\u0648\\u0646\\u0648\\u0627 \\u0645\\u062a\\u0639\\u0627\\u0648\\u0646\\u064a\\u0646 \\u0648 \\u0645\\u062a\\u0641\\u0647\\u0645\\u064a\\u0646 \\u0644\\u0647\\u0630\\u0627 \\u0627\\u0644\\u0623\\u0645\\u0631.\",\"\\u064a\\u0645\\u0643\\u0646 \\u0644\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0627\\u0644\\u0625\\u062a\\u0635\\u0627\\u0644 \\u0644\\u0644\\u0625\\u0633\\u062a\\u0641\\u0633\\u0627\\u0631 \\u0639\\u0644\\u0649 \\u0623\\u064a \\u0627\\u0645\\u0631 \\u064a\\u062e\\u0635 \\u0627\\u0644\\u0631\\u062d\\u0644\\u0629 ( \\u0628\\u0631\\u0646\\u0627\\u0645\\u062c \\u2013 \\u0645\\u0639\\u062f\\u0627\\u062a- \\u0627\\u0644\\u0645\\u0646\\u0637\\u0642\\u0629..) \\u0642\\u0628\\u0644 \\u0625\\u0646\\u0637\\u0644\\u0627\\u0642\\u0647\\u0627\\u060c \\u0648 \\u0633\\u0646\\u0643\\u0648\\u0646 \\u0633\\u0639\\u062f\\u0627\\u0621 \\u0628\\u0644\\u0625\\u062c\\u0627\\u0628\\u0629 \\u0639\\u0644\\u064a\\u0647\\u0627.\"]', '2022-05-09 16:22:36', '2022-05-20 04:37:24'),
(3, 3, 1, 'MGOUN', 5, 3, NULL, '1200.0000', ' {  \"blocks\":\n                [\n                    {\n                        \"key\": \"7v0t4\",\n                        \"text\": \"ssssssssss\",\n                        \"type\": \"unstyled\",\n                        \"depth\": 0,\n                        \"inlineStyleRanges\": [],\n                        \"entityRanges\": [],\n                        \"data\": {}\n                    }\n                ],\n            \"entityMap\": {}}', 0, 0, '2022-03-12 18:00:27', '2022-03-13 18:00:27', NULL, NULL, 5, NULL, '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(4, 3, 1, 'Ayachi', 3, 3, NULL, '1200.0000', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 0, 0, '2022-03-12 18:00:27', '2022-03-13 18:00:27', NULL, NULL, 5, NULL, '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(5, 3, 1, 'JBEL1\r\n', 3, 3, NULL, '1200.0000', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum ghita', 0, 0, '2022-03-12 18:00:27', '2022-03-13 18:00:27', NULL, NULL, 5, NULL, '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(6, 4, 1, 'JBEL2', 5, 3, NULL, '1200.0000', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 0, 0, '2022-03-12 18:00:27', '2022-03-13 18:00:27', NULL, NULL, 4, NULL, '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(7, 4, 1, 'JBEL3', 5, 3, NULL, '1200.0000', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 0, 0, '2022-03-12 18:00:27', '2022-03-13 18:00:27', NULL, NULL, 4, NULL, '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(8, 4, 1, 'JBEL4', 5, 3, NULL, '1200.0000', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 0, 0, '2022-03-12 18:00:27', '2022-03-13 18:00:27', NULL, NULL, 4, NULL, '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(9, 3, 1, 'JBEL5', 5, 3, NULL, '1200.0000', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 0, 0, '2022-03-12 18:00:27', '2022-03-13 18:00:27', NULL, NULL, 3, NULL, '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(10, NULL, NULL, 'test', 4, NULL, NULL, '100.0000', 'Lorem Ipsum ', 0, 0, '2023-03-12 18:00:27', '2023-03-13 18:00:27', '[]', '[\"test\"]', 4, '[]', '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(11, NULL, 1, 'AKIOUD EXPERIENCE', 4, NULL, NULL, '1200.0000', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum fin', 1, 0, '2021-03-12 00:00:00', '2021-03-13 00:00:00', '[\"\\u062d\\u0642\\u064a\\u0628\\u0629 \\u0638\\u0647\\u0631 ( 50 \\u0644\\u062a\\u0631),\\u0628\\u0648\\u0646\\u0634\\u0648\",\"\\u062d\\u0642\\u064a\\u0628\\u0629 \\u0638\\u0647\\u0631 \\u062d\\u062c\\u0645 \\u0635\\u063a\\u064a\\u0631 ( 10\\/20 \\u0644\\u062a\\u0631) \\u0644\\u062a\\u0646\\u0642\\u0644,\\u0636\\u0631\\u0648\\u0631\\u064a\\u0629-\\u062d\\u0642\\u064a\\u0628\\u0629 \\u0627\\u0644\\u0646\\u0648\\u0645-\",\"\\u0645\\u0644\\u0627\\u0628\\u0633 \\u0645\\u0631\\u064a\\u062d\\u0629 ( \\u0646\\u0638\\u0627\\u0645 \\u062a\\u0644\\u0627\\u062b\\u0629 \\u0637\\u0628\\u0642\\u0627\\u062a),\\u0646\\u0638\\u0627\\u0631\\u0627\\u062a \\u0634\\u0645\\u0633\\u064a\\u0629.\",\"\\u0633\\u062a\\u0631\\u0629 \\u0645\\u0636\\u0627\\u062f\\u0629 \\u0644\\u0644\\u0628\\u0644\\u0644 \\u0648 \\u062a\\u0645\\u0646\\u0639 \\u0645\\u0631\\u0648\\u0631 \\u0627\\u0644\\u0631\\u064a\\u0627\\u062d.,\\u062a\\u0645\\u0631 \\u060c \\u0641\\u0648\\u0627\\u0643\\u0647 \\u062c\\u0627\\u0641\\u0629\\u2026..\",\"\\u062c\\u0648\\u0627\\u0631\\u0628 \\u062e\\u0627\\u0635\\u0629 \\u0628\\u062c\\u0648\\u0644\\u0627\\u062a \\u0627\\u0644\\u0645\\u0634\\u064a.,\\u0635\\u064a\\u062f\\u0644\\u064a\\u0629 \\u0634\\u062e\\u0635\\u064a\\u0629 ( \\u062f\\u0648\\u0627\\u0621 \\u0623\\u0644\\u0645 \\u0627\\u0644\\u0631\\u0623\\u0633 \\u0648 \\u0627\\u0644\\u0623\\u0633\\u0646\\u0627\\u0646\\u060c \\u0636\\u0645\\u0627\\u062f\\u0627\\u062a\\u2026.)\",\"\\u0642\\u0641\\u0627\\u0632\\u0627\\u062a.,\\u0627\\u0628\\u062a\\u0633\\u0627\\u0645\\u062a\\u0643\\u0645 \\u0648 \\u0631\\u0648\\u062d\\u0643\\u0645 \\u0627\\u0644\\u0645\\u0631\\u062d\\u0629\"]', '[\"\\u0639\\u0644\\u0649 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0627\\u0644\\u0642\\u062f\\u0648\\u0645 15 \\u062f\\u0642\\u064a\\u0642\\u0629 \\u0642\\u0628\\u0644 \\u0645\\u0648\\u0639\\u062f \\u0627\\u0646\\u0637\\u0644\\u0627\\u0642 \\u0627\\u0644\\u0631\\u062d\\u0644\\u0629.\",\"\\u0631\\u062d\\u0644\\u0627\\u062a \\u0627\\u0644\\u0645\\u0634\\u064a \\u062a\\u062a\\u0637\\u0644\\u0628 \\u0645\\u0646 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0642\\u062f\\u0631\\u0629 \\u0628\\u062f\\u0646\\u064a\\u0629 \\u0648 \\u064a\\u0642\\u0636\\u0629 \\u0630\\u0647\\u0646\\u064a\\u0629 \\u062a\\u062e\\u062a\\u0644\\u0641 \\u062d\\u0633\\u0628 \\u0625\\u062e\\u062a\\u0644\\u0627\\u0641 \\u0627\\u0644\\u0645\\u0633\\u0627\\u0631\\u0627\\u062a.\",\"\\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u0648\\u0646 \\u0627\\u0644\\u0630\\u064a\\u0646 \\u064a\\u062d\\u062a\\u0627\\u062c\\u0648\\u0646 \\u0644\\u0639\\u0646\\u0627\\u064a\\u0629 \\u062e\\u0627\\u0635\\u0629 \\u060c \\u064a\\u062a\\u0648\\u062c\\u0628 \\u0639\\u0644\\u064a\\u0647\\u0645 \\u0627\\u0644\\u0642\\u062f\\u0648\\u0645 \\u0631\\u0641\\u0642\\u0629 \\u0623\\u062d\\u062f \\u0623\\u0641\\u0631\\u0627\\u062f \\u0639\\u0627\\u0626\\u0644\\u062a\\u0647\\u0645 \\u0623\\u0648 \\u0623\\u062d\\u062f \\u0623\\u0635\\u062f\\u0642\\u0627\\u0626\\u0647\\u0645\",\"\\u0641\\u064a \\u0628\\u0639\\u0636 \\u0627\\u0644\\u062d\\u0627\\u0644\\u0627\\u062a \\u0627\\u0644\\u0646\\u0627\\u062f\\u0631\\u0629 \\u064a\\u062a\\u0639\\u064a\\u0646 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0645\\u0633\\u0624\\u0648\\u0644 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0631\\u062d\\u0644\\u0629 \\u0625\\u062c\\u0631\\u0627\\u0621 \\u062a\\u0639\\u062f\\u064a\\u0644\\u0627\\u062a \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0628\\u0631\\u0646\\u0627\\u0645\\u062c \\u060c \\u0644\\u0630\\u0644\\u0643 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0623\\u0646 \\u064a\\u0643\\u0648\\u0646\\u0648\\u0627 \\u0645\\u062a\\u0639\\u0627\\u0648\\u0646\\u064a\\u0646 \\u0648 \\u0645\\u062a\\u0641\\u0647\\u0645\\u064a\\u0646 \\u0644\\u0647\\u0630\\u0627 \\u0627\\u0644\\u0623\\u0645\\u0631.\",\"\\u064a\\u0645\\u0643\\u0646 \\u0644\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0627\\u0644\\u0625\\u062a\\u0635\\u0627\\u0644 \\u0644\\u0644\\u0625\\u0633\\u062a\\u0641\\u0633\\u0627\\u0631 \\u0639\\u0644\\u0649 \\u0623\\u064a \\u0627\\u0645\\u0631 \\u064a\\u062e\\u0635 \\u0627\\u0644\\u0631\\u062d\\u0644\\u0629 ( \\u0628\\u0631\\u0646\\u0627\\u0645\\u062c \\u2013 \\u0645\\u0639\\u062f\\u0627\\u062a- \\u0627\\u0644\\u0645\\u0646\\u0637\\u0642\\u0629..) \\u0642\\u0628\\u0644 \\u0625\\u0646\\u0637\\u0644\\u0627\\u0642\\u0647\\u0627\\u060c \\u0648 \\u0633\\u0646\\u0643\\u0648\\u0646 \\u0633\\u0639\\u062f\\u0627\\u0621 \\u0628\\u0644\\u0625\\u062c\\u0627\\u0628\\u0629 \\u0639\\u0644\\u064a\\u0647\\u0627.\"]', 2, '[\"\\u0639\\u0644\\u0649 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0627\\u0644\\u0642\\u062f\\u0648\\u0645 15 \\u062f\\u0642\\u064a\\u0642\\u0629 \\u0642\\u0628\\u0644 \\u0645\\u0648\\u0639\\u062f \\u0627\\u0646\\u0637\\u0644\\u0627\\u0642 \\u0627\\u0644\\u0631\\u062d\\u0644\\u0629.\",\"\\u0631\\u062d\\u0644\\u0627\\u062a \\u0627\\u0644\\u0645\\u0634\\u064a \\u062a\\u062a\\u0637\\u0644\\u0628 \\u0645\\u0646 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0642\\u062f\\u0631\\u0629 \\u0628\\u062f\\u0646\\u064a\\u0629 \\u0648 \\u064a\\u0642\\u0636\\u0629 \\u0630\\u0647\\u0646\\u064a\\u0629 \\u062a\\u062e\\u062a\\u0644\\u0641 \\u062d\\u0633\\u0628 \\u0625\\u062e\\u062a\\u0644\\u0627\\u0641 \\u0627\\u0644\\u0645\\u0633\\u0627\\u0631\\u0627\\u062a.\",\"\\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u0648\\u0646 \\u0627\\u0644\\u0630\\u064a\\u0646 \\u064a\\u062d\\u062a\\u0627\\u062c\\u0648\\u0646 \\u0644\\u0639\\u0646\\u0627\\u064a\\u0629 \\u062e\\u0627\\u0635\\u0629 \\u060c \\u064a\\u062a\\u0648\\u062c\\u0628 \\u0639\\u0644\\u064a\\u0647\\u0645 \\u0627\\u0644\\u0642\\u062f\\u0648\\u0645 \\u0631\\u0641\\u0642\\u0629 \\u0623\\u062d\\u062f \\u0623\\u0641\\u0631\\u0627\\u062f \\u0639\\u0627\\u0626\\u0644\\u062a\\u0647\\u0645 \\u0623\\u0648 \\u0623\\u062d\\u062f \\u0623\\u0635\\u062f\\u0642\\u0627\\u0626\\u0647\\u0645\",\"\\u0641\\u064a \\u0628\\u0639\\u0636 \\u0627\\u0644\\u062d\\u0627\\u0644\\u0627\\u062a \\u0627\\u0644\\u0646\\u0627\\u062f\\u0631\\u0629 \\u064a\\u062a\\u0639\\u064a\\u0646 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0645\\u0633\\u0624\\u0648\\u0644 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0631\\u062d\\u0644\\u0629 \\u0625\\u062c\\u0631\\u0627\\u0621 \\u062a\\u0639\\u062f\\u064a\\u0644\\u0627\\u062a \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0628\\u0631\\u0646\\u0627\\u0645\\u062c \\u060c \\u0644\\u0630\\u0644\\u0643 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0623\\u0646 \\u064a\\u0643\\u0648\\u0646\\u0648\\u0627 \\u0645\\u062a\\u0639\\u0627\\u0648\\u0646\\u064a\\u0646 \\u0648 \\u0645\\u062a\\u0641\\u0647\\u0645\\u064a\\u0646 \\u0644\\u0647\\u0630\\u0627 \\u0627\\u0644\\u0623\\u0645\\u0631.\",\"\\u064a\\u0645\\u0643\\u0646 \\u0644\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0627\\u0644\\u0625\\u062a\\u0635\\u0627\\u0644 \\u0644\\u0644\\u0625\\u0633\\u062a\\u0641\\u0633\\u0627\\u0631 \\u0639\\u0644\\u0649 \\u0623\\u064a \\u0627\\u0645\\u0631 \\u064a\\u062e\\u0635 \\u0627\\u0644\\u0631\\u062d\\u0644\\u0629 ( \\u0628\\u0631\\u0646\\u0627\\u0645\\u062c \\u2013 \\u0645\\u0639\\u062f\\u0627\\u062a- \\u0627\\u0644\\u0645\\u0646\\u0637\\u0642\\u0629..) \\u0642\\u0628\\u0644 \\u0625\\u0646\\u0637\\u0644\\u0627\\u0642\\u0647\\u0627\\u060c \\u0648 \\u0633\\u0646\\u0643\\u0648\\u0646 \\u0633\\u0639\\u062f\\u0627\\u0621 \\u0628\\u0644\\u0625\\u062c\\u0627\\u0628\\u0629 \\u0639\\u0644\\u064a\\u0647\\u0627.\"]', '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(12, NULL, NULL, 'test1', 4, NULL, NULL, '100.0000', 'Lorem Ipsum ', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(13, NULL, NULL, 'test1', 4, NULL, NULL, '100.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(14, NULL, NULL, 'test1', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(15, NULL, NULL, 'test1', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(16, NULL, NULL, '', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(17, NULL, NULL, '', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(18, NULL, NULL, '', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(19, NULL, NULL, 'xxxx', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(20, NULL, NULL, 'YEEEEES', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(21, NULL, NULL, 'YEEEEES', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(22, NULL, NULL, 'YEEEEES', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(23, NULL, NULL, 'ss', 3, NULL, NULL, '10.0000', '', 0, 0, '2022-03-01 00:00:00', NULL, '[]', '[]', NULL, '[]', '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(24, NULL, NULL, 'ss', 3, NULL, NULL, '10.0000', '', 0, 0, '2022-03-01 00:00:00', NULL, '[]', '[]', NULL, '[]', '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(25, NULL, 1, 'AKIOUD EXPERIENCE', 4, NULL, NULL, '1200.0000', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum fin', 1, 0, '2021-03-12 00:00:00', '2021-03-13 00:00:00', '[\"\\u062d\\u0642\\u064a\\u0628\\u0629 \\u0638\\u0647\\u0631 ( 50 \\u0644\\u062a\\u0631),\\u0628\\u0648\\u0646\\u0634\\u0648\",\"\\u062d\\u0642\\u064a\\u0628\\u0629 \\u0638\\u0647\\u0631 \\u062d\\u062c\\u0645 \\u0635\\u063a\\u064a\\u0631 ( 10\\/20 \\u0644\\u062a\\u0631) \\u0644\\u062a\\u0646\\u0642\\u0644,\\u0636\\u0631\\u0648\\u0631\\u064a\\u0629-\\u062d\\u0642\\u064a\\u0628\\u0629 \\u0627\\u0644\\u0646\\u0648\\u0645-\",\"\\u0645\\u0644\\u0627\\u0628\\u0633 \\u0645\\u0631\\u064a\\u062d\\u0629 ( \\u0646\\u0638\\u0627\\u0645 \\u062a\\u0644\\u0627\\u062b\\u0629 \\u0637\\u0628\\u0642\\u0627\\u062a),\\u0646\\u0638\\u0627\\u0631\\u0627\\u062a \\u0634\\u0645\\u0633\\u064a\\u0629.\",\"\\u0633\\u062a\\u0631\\u0629 \\u0645\\u0636\\u0627\\u062f\\u0629 \\u0644\\u0644\\u0628\\u0644\\u0644 \\u0648 \\u062a\\u0645\\u0646\\u0639 \\u0645\\u0631\\u0648\\u0631 \\u0627\\u0644\\u0631\\u064a\\u0627\\u062d.,\\u062a\\u0645\\u0631 \\u060c \\u0641\\u0648\\u0627\\u0643\\u0647 \\u062c\\u0627\\u0641\\u0629\\u2026..\",\"\\u062c\\u0648\\u0627\\u0631\\u0628 \\u062e\\u0627\\u0635\\u0629 \\u0628\\u062c\\u0648\\u0644\\u0627\\u062a \\u0627\\u0644\\u0645\\u0634\\u064a.,\\u0635\\u064a\\u062f\\u0644\\u064a\\u0629 \\u0634\\u062e\\u0635\\u064a\\u0629 ( \\u062f\\u0648\\u0627\\u0621 \\u0623\\u0644\\u0645 \\u0627\\u0644\\u0631\\u0623\\u0633 \\u0648 \\u0627\\u0644\\u0623\\u0633\\u0646\\u0627\\u0646\\u060c \\u0636\\u0645\\u0627\\u062f\\u0627\\u062a\\u2026.)\",\"\\u0642\\u0641\\u0627\\u0632\\u0627\\u062a.,\\u0627\\u0628\\u062a\\u0633\\u0627\\u0645\\u062a\\u0643\\u0645 \\u0648 \\u0631\\u0648\\u062d\\u0643\\u0645 \\u0627\\u0644\\u0645\\u0631\\u062d\\u0629\"]', '[\"\\u0639\\u0644\\u0649 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0627\\u0644\\u0642\\u062f\\u0648\\u0645 15 \\u062f\\u0642\\u064a\\u0642\\u0629 \\u0642\\u0628\\u0644 \\u0645\\u0648\\u0639\\u062f \\u0627\\u0646\\u0637\\u0644\\u0627\\u0642 \\u0627\\u0644\\u0631\\u062d\\u0644\\u0629.\",\"\\u0631\\u062d\\u0644\\u0627\\u062a \\u0627\\u0644\\u0645\\u0634\\u064a \\u062a\\u062a\\u0637\\u0644\\u0628 \\u0645\\u0646 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0642\\u062f\\u0631\\u0629 \\u0628\\u062f\\u0646\\u064a\\u0629 \\u0648 \\u064a\\u0642\\u0636\\u0629 \\u0630\\u0647\\u0646\\u064a\\u0629 \\u062a\\u062e\\u062a\\u0644\\u0641 \\u062d\\u0633\\u0628 \\u0625\\u062e\\u062a\\u0644\\u0627\\u0641 \\u0627\\u0644\\u0645\\u0633\\u0627\\u0631\\u0627\\u062a.\",\"\\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u0648\\u0646 \\u0627\\u0644\\u0630\\u064a\\u0646 \\u064a\\u062d\\u062a\\u0627\\u062c\\u0648\\u0646 \\u0644\\u0639\\u0646\\u0627\\u064a\\u0629 \\u062e\\u0627\\u0635\\u0629 \\u060c \\u064a\\u062a\\u0648\\u062c\\u0628 \\u0639\\u0644\\u064a\\u0647\\u0645 \\u0627\\u0644\\u0642\\u062f\\u0648\\u0645 \\u0631\\u0641\\u0642\\u0629 \\u0623\\u062d\\u062f \\u0623\\u0641\\u0631\\u0627\\u062f \\u0639\\u0627\\u0626\\u0644\\u062a\\u0647\\u0645 \\u0623\\u0648 \\u0623\\u062d\\u062f \\u0623\\u0635\\u062f\\u0642\\u0627\\u0626\\u0647\\u0645\",\"\\u0641\\u064a \\u0628\\u0639\\u0636 \\u0627\\u0644\\u062d\\u0627\\u0644\\u0627\\u062a \\u0627\\u0644\\u0646\\u0627\\u062f\\u0631\\u0629 \\u064a\\u062a\\u0639\\u064a\\u0646 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0645\\u0633\\u0624\\u0648\\u0644 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0631\\u062d\\u0644\\u0629 \\u0625\\u062c\\u0631\\u0627\\u0621 \\u062a\\u0639\\u062f\\u064a\\u0644\\u0627\\u062a \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0628\\u0631\\u0646\\u0627\\u0645\\u062c \\u060c \\u0644\\u0630\\u0644\\u0643 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0623\\u0646 \\u064a\\u0643\\u0648\\u0646\\u0648\\u0627 \\u0645\\u062a\\u0639\\u0627\\u0648\\u0646\\u064a\\u0646 \\u0648 \\u0645\\u062a\\u0641\\u0647\\u0645\\u064a\\u0646 \\u0644\\u0647\\u0630\\u0627 \\u0627\\u0644\\u0623\\u0645\\u0631.\",\"\\u064a\\u0645\\u0643\\u0646 \\u0644\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0627\\u0644\\u0625\\u062a\\u0635\\u0627\\u0644 \\u0644\\u0644\\u0625\\u0633\\u062a\\u0641\\u0633\\u0627\\u0631 \\u0639\\u0644\\u0649 \\u0623\\u064a \\u0627\\u0645\\u0631 \\u064a\\u062e\\u0635 \\u0627\\u0644\\u0631\\u062d\\u0644\\u0629 ( \\u0628\\u0631\\u0646\\u0627\\u0645\\u062c \\u2013 \\u0645\\u0639\\u062f\\u0627\\u062a- \\u0627\\u0644\\u0645\\u0646\\u0637\\u0642\\u0629..) \\u0642\\u0628\\u0644 \\u0625\\u0646\\u0637\\u0644\\u0627\\u0642\\u0647\\u0627\\u060c \\u0648 \\u0633\\u0646\\u0643\\u0648\\u0646 \\u0633\\u0639\\u062f\\u0627\\u0621 \\u0628\\u0644\\u0625\\u062c\\u0627\\u0628\\u0629 \\u0639\\u0644\\u064a\\u0647\\u0627.\"]', 2, '[\"\\u0639\\u0644\\u0649 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0627\\u0644\\u0642\\u062f\\u0648\\u0645 15 \\u062f\\u0642\\u064a\\u0642\\u0629 \\u0642\\u0628\\u0644 \\u0645\\u0648\\u0639\\u062f \\u0627\\u0646\\u0637\\u0644\\u0627\\u0642 \\u0627\\u0644\\u0631\\u062d\\u0644\\u0629.\",\"\\u0631\\u062d\\u0644\\u0627\\u062a \\u0627\\u0644\\u0645\\u0634\\u064a \\u062a\\u062a\\u0637\\u0644\\u0628 \\u0645\\u0646 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0642\\u062f\\u0631\\u0629 \\u0628\\u062f\\u0646\\u064a\\u0629 \\u0648 \\u064a\\u0642\\u0636\\u0629 \\u0630\\u0647\\u0646\\u064a\\u0629 \\u062a\\u062e\\u062a\\u0644\\u0641 \\u062d\\u0633\\u0628 \\u0625\\u062e\\u062a\\u0644\\u0627\\u0641 \\u0627\\u0644\\u0645\\u0633\\u0627\\u0631\\u0627\\u062a.\",\"\\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u0648\\u0646 \\u0627\\u0644\\u0630\\u064a\\u0646 \\u064a\\u062d\\u062a\\u0627\\u062c\\u0648\\u0646 \\u0644\\u0639\\u0646\\u0627\\u064a\\u0629 \\u062e\\u0627\\u0635\\u0629 \\u060c \\u064a\\u062a\\u0648\\u062c\\u0628 \\u0639\\u0644\\u064a\\u0647\\u0645 \\u0627\\u0644\\u0642\\u062f\\u0648\\u0645 \\u0631\\u0641\\u0642\\u0629 \\u0623\\u062d\\u062f \\u0623\\u0641\\u0631\\u0627\\u062f \\u0639\\u0627\\u0626\\u0644\\u062a\\u0647\\u0645 \\u0623\\u0648 \\u0623\\u062d\\u062f \\u0623\\u0635\\u062f\\u0642\\u0627\\u0626\\u0647\\u0645\",\"\\u0641\\u064a \\u0628\\u0639\\u0636 \\u0627\\u0644\\u062d\\u0627\\u0644\\u0627\\u062a \\u0627\\u0644\\u0646\\u0627\\u062f\\u0631\\u0629 \\u064a\\u062a\\u0639\\u064a\\u0646 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0645\\u0633\\u0624\\u0648\\u0644 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0631\\u062d\\u0644\\u0629 \\u0625\\u062c\\u0631\\u0627\\u0621 \\u062a\\u0639\\u062f\\u064a\\u0644\\u0627\\u062a \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0628\\u0631\\u0646\\u0627\\u0645\\u062c \\u060c \\u0644\\u0630\\u0644\\u0643 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0623\\u0646 \\u064a\\u0643\\u0648\\u0646\\u0648\\u0627 \\u0645\\u062a\\u0639\\u0627\\u0648\\u0646\\u064a\\u0646 \\u0648 \\u0645\\u062a\\u0641\\u0647\\u0645\\u064a\\u0646 \\u0644\\u0647\\u0630\\u0627 \\u0627\\u0644\\u0623\\u0645\\u0631.\",\"\\u064a\\u0645\\u0643\\u0646 \\u0644\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064a\\u0646 \\u0627\\u0644\\u0625\\u062a\\u0635\\u0627\\u0644 \\u0644\\u0644\\u0625\\u0633\\u062a\\u0641\\u0633\\u0627\\u0631 \\u0639\\u0644\\u0649 \\u0623\\u064a \\u0627\\u0645\\u0631 \\u064a\\u062e\\u0635 \\u0627\\u0644\\u0631\\u062d\\u0644\\u0629 ( \\u0628\\u0631\\u0646\\u0627\\u0645\\u062c \\u2013 \\u0645\\u0639\\u062f\\u0627\\u062a- \\u0627\\u0644\\u0645\\u0646\\u0637\\u0642\\u0629..) \\u0642\\u0628\\u0644 \\u0625\\u0646\\u0637\\u0644\\u0627\\u0642\\u0647\\u0627\\u060c \\u0648 \\u0633\\u0646\\u0643\\u0648\\u0646 \\u0633\\u0639\\u062f\\u0627\\u0621 \\u0628\\u0644\\u0625\\u062c\\u0627\\u0628\\u0629 \\u0639\\u0644\\u064a\\u0647\\u0627.\"]', '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(26, NULL, NULL, 'AKSWAL EXPERIENCE', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(27, NULL, NULL, 'AKSWAL EXPERIENCE', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(28, NULL, NULL, 'sssssssss jjjjjjjjjjjjjjjj', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-09 16:22:36', '2022-05-09 16:22:36'),
(29, NULL, NULL, 'AKSWAL EXPERIENCE', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-15 17:24:11', '2022-05-15 17:24:11'),
(30, NULL, NULL, 'Experience Titre Lorem ipsum', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-15 17:42:33', '2022-05-15 17:42:33'),
(31, NULL, NULL, 'lllllllllllllllllllllllll', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-16 00:03:41', '2022-05-16 00:03:41'),
(34, NULL, NULL, 'test', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-16 01:58:47', '2022-05-16 01:58:47'),
(35, NULL, NULL, 'sssssssss', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-16 02:00:32', '2022-05-16 02:00:32'),
(36, NULL, NULL, 'oooooooooooooo', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-16 02:04:50', '2022-05-16 02:04:50'),
(38, NULL, NULL, 'ssssssssssssssssssssllllllllll', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-16 02:06:48', '2022-05-16 02:06:48'),
(40, NULL, NULL, 'wwwwwwww', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-16 02:12:08', '2022-05-16 02:12:08'),
(42, NULL, NULL, 'aass', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-16 02:15:36', '2022-05-16 02:15:36'),
(43, NULL, NULL, 'm11mm', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-16 02:26:56', '2022-05-16 02:26:56'),
(44, NULL, NULL, '222', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-16 02:27:35', '2022-05-16 02:27:35'),
(45, NULL, NULL, 'qqq', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-16 02:28:32', '2022-05-16 02:28:32'),
(46, NULL, NULL, 'sssssss', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-16 02:32:08', '2022-05-16 02:32:08'),
(47, NULL, NULL, 'llllllll', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-16 02:32:52', '2022-05-16 02:32:52'),
(51, NULL, NULL, 'mdmdmd', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-16 02:34:35', '2022-05-16 02:34:35'),
(52, NULL, NULL, 'mdmdmd', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-16 02:37:31', '2022-05-16 02:37:31'),
(54, NULL, NULL, 'laedadaedaedaed', NULL, NULL, NULL, '0.0000', '', 1, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-16 02:48:18', '2022-05-17 06:47:29'),
(55, NULL, NULL, 'jjjjj', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-16 18:13:44', '2022-05-17 06:52:37'),
(57, NULL, NULL, 'OUALID', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-16 22:14:17', '2022-05-17 06:52:43'),
(58, NULL, NULL, 'test Experience', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-16 22:17:06', '2022-05-17 06:47:34'),
(61, NULL, NULL, 'ssssssssssssssss', NULL, NULL, NULL, '0.0000', '', 1, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-17 07:22:03', '2022-05-17 11:41:45'),
(62, NULL, NULL, 'mssmsm8888888888888888888888888JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ', NULL, NULL, NULL, '0.0000', '', 1, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-17 07:22:45', '2022-05-17 11:41:41'),
(63, NULL, NULL, 'AAAAAAAAAAAAAA\nBBBBBBBBBBBBBBB\nCCCCCCCCCC ', NULL, NULL, NULL, '0.0000', '', 1, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-17 07:24:06', '2022-05-17 11:41:34'),
(64, NULL, NULL, 'Ultime Experience', NULL, NULL, NULL, '0.0000', '', 0, 0, NULL, NULL, '[]', '[]', NULL, '[]', '2022-05-17 12:07:30', '2022-05-17 12:07:30');

-- --------------------------------------------------------

--
-- Structure de la table `experience_valeur_referentiel`
--

CREATE TABLE `experience_valeur_referentiel` (
  `experience_id` int(11) NOT NULL,
  `valeur_referentiel_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `experience_valeur_referentiel`
--

INSERT INTO `experience_valeur_referentiel` (`experience_id`, `valeur_referentiel_id`) VALUES
(1, 2),
(1, 3),
(2, 3),
(2, 5),
(2, 6),
(2, 7),
(2, 13),
(3, 3),
(3, 6),
(4, 7);

-- --------------------------------------------------------

--
-- Structure de la table `guide`
--

CREATE TABLE `guide` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prenom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `age` int(11) NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_profil` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_size` int(11) NOT NULL,
  `updated_at` datetime NOT NULL,
  `links` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '(DC2Type:json_array)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `guide`
--

INSERT INTO `guide` (`id`, `nom`, `prenom`, `age`, `phone`, `description`, `location`, `image_profil`, `image_name`, `image_size`, `updated_at`, `links`) VALUES
(3, 'Ousfour', 'samak', 23, '0662094498', 'Vivamus suscipit tortor eget felis porttitor volutpat. Donec sollicitudin molestie malesuada. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Donec rutrum congue leo eget malesuada. Nulla porttitor accumsan tincidunt. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.', 'Chamharouch', NULL, '', 0, '2022-03-12 17:56:19', NULL),
(4, 'Belkasri', 'oualid', 23, '0662094498', 'So perhaps, you\'ve generated some fancy text, and you\'re content that you can now copy and paste your fancy text in the comments section of funny cat videos, but perhaps you\'re wondering how it\'s even possible to change the font of your text? Is it some sort of hack?', 'Imlil', NULL, '', 0, '2022-03-12 17:56:19', NULL),
(5, 'Ait ahmed', 'oualid', 23, '0662094498', 'So perhaps, you\'ve generated some fancy text, and you\'re content that you can now copy and paste your fancy text in the comments section of funny cat videos, but perhaps you\'re wondering how it\'s even possible to change the font of your text? Is it some sort of hack?', 'Imlil', NULL, '', 0, '2022-03-12 17:56:19', NULL),
(6, 'Belkasri', 'oualid', 23, '0662094498', 'So perhaps, you\'ve generated some fancy text, and you\'re content that you can now copy and paste your fancy text in the comments section of funny cat videos, but perhaps you\'re wondering how it\'s even possible to change the font of your text? Is it some sort of hack?', 'Imlil', NULL, '', 0, '2022-03-12 17:56:19', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `guide_valeur_referentiel`
--

CREATE TABLE `guide_valeur_referentiel` (
  `guide_id` int(11) NOT NULL,
  `valeur_referentiel_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `guide_valeur_referentiel`
--

INSERT INTO `guide_valeur_referentiel` (`guide_id`, `valeur_referentiel_id`) VALUES
(3, 13),
(3, 14),
(3, 15),
(3, 16);

-- --------------------------------------------------------

--
-- Structure de la table `media`
--

CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `guide_id` int(11) NOT NULL,
  `experience_id` int(11) DEFAULT NULL,
  `image_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_size` int(11) NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `media`
--

INSERT INTO `media` (`id`, `guide_id`, `experience_id`, `image_name`, `image_size`, `updated_at`) VALUES
(2, 3, 6, 'exp_(0).jpg', 0, '2022-03-18 06:43:21'),
(3, 3, 5, 'exp_(1).jpg', 0, '2022-03-18 06:43:21'),
(4, 3, 5, 'exp_(2).jpg', 0, '2022-03-18 06:43:21'),
(5, 3, 5, 'exp_(3).jpg', 0, '2022-03-18 06:43:21'),
(6, 3, 5, 'exp_(4).jpg', 0, '2022-03-18 06:43:21'),
(10, 3, 5, 'exp_(9).jpg', 0, '2022-03-18 06:43:21'),
(11, 3, 5, 'exp_(10).jpg', 0, '2022-03-18 06:43:21'),
(12, 3, 5, 'exp_(11).jpg', 0, '2022-03-18 06:43:21'),
(13, 3, NULL, 'photo6044042163102267186.jpg', 63248, '2022-05-21 12:35:55'),
(14, 3, NULL, 'photo6044042163102267186.jpg', 63248, '2022-05-21 22:23:59'),
(15, 3, NULL, 'photo6044042163102267186.jpg', 63248, '2022-05-21 22:55:21'),
(16, 3, NULL, 'WIN_20220227_09_56_47_Pro.jpg', 189530, '2022-05-22 05:24:56'),
(17, 3, 3, 'WIN_20220227_09_56_47_Pro.jpg', 189530, '2022-05-22 05:35:31'),
(28, 3, 5, '628a3ec14188e_photo6044042163102267173.jpg', 189530, '2022-05-22 15:46:41'),
(29, 3, 5, '628a3f547d58b_photo6044042163102267173.jpg', 191221, '2022-05-22 15:49:08'),
(30, 3, 5, '628ac46c821bc_photo6044042163102267173.jpg', 268222, '2022-05-23 01:17:00'),
(31, 3, 5, '628ac5136c7b4_photo6044042163102267173.jpg', 241651, '2022-05-23 01:19:47'),
(32, 3, 5, '628ac61e9ddd4_photo6044042163102267173.jpg', 241651, '2022-05-23 01:24:14'),
(33, 3, 5, '628ac7e9077b6_photo6044042163102267173.jpg', 63248, '2022-05-23 01:31:53'),
(34, 3, 5, '628ac9b6302d3_photo6044042163102267173.jpg', 63248, '2022-05-23 01:39:34'),
(35, 3, 5, '628aca3779ccf_photo6044042163102267173.jpg', 2856228, '2022-05-23 01:41:43'),
(36, 3, 5, '628aca880e677_photo6044042163102267173.jpg', 80137, '2022-05-23 01:43:04'),
(37, 4, 6, '628b651bd25e7_test.png', 2856228, '2022-05-23 12:42:35'),
(38, 4, 6, '628b65743c703_logo.png', 80137, '2022-05-23 12:44:04'),
(39, 4, 6, '628b65fc6d445_photo6044042163102267186.jpg', 63248, '2022-05-23 12:46:20'),
(40, 4, 6, '628b664b5a56d_Screenshot_20210811-173957__01.jpg', 215347, '2022-05-23 12:47:39'),
(41, 4, 6, '628b67b36e560_alpinistesretraites_bg_small_hike.png', 1110081, '2022-05-23 12:53:39'),
(42, 4, 6, '628b6921ae8c4_17926711.jpg', 214251, '2022-05-23 12:59:45'),
(43, 4, 6, '628b6a7c0c807_Rabat casa 20 04.png', 69908, '2022-05-23 13:05:32'),
(44, 4, 6, '628b6af7553ba_alpinistesretraites_bg_small.94757287.png', 990802, '2022-05-23 13:07:35'),
(45, 4, 6, '628b6d0d7bc5c_logo_left.png', 2713, '2022-05-23 13:16:29'),
(46, 4, 6, '628b6d3094dd4_belkasry@gmail.com.png', 596993, '2022-05-23 13:17:04'),
(47, 4, 6, '628b701a7f1a9_33524693.jpg', 341651, '2022-05-23 13:29:30'),
(48, 4, 6, '628b7072a39d3_micheile-dot-com-z68vPSMhutE-unsplash.jpg', 1215678, '2022-05-23 13:30:58'),
(49, 4, 6, '628b71fe5a522_chris-liverani-ViEBSoZH6M4-unsplash.jpg', 1007340, '2022-05-23 13:37:34'),
(50, 4, 6, '628b7200793b9_chris-liverani-ViEBSoZH6M4-unsplash.jpg', 1007340, '2022-05-23 13:37:36'),
(51, 4, 6, '628b73725aa41_WIN_20220227_09_57_05_Pro.jpg', 201998, '2022-05-23 13:43:46'),
(52, 4, 6, '628b7398a0883_WIN_20220227_09_56_47_Pro.jpg', 189530, '2022-05-23 13:44:24'),
(53, 4, 6, '628b74342469a_WIN_20220227_09_56_55_Pro.jpg', 198065, '2022-05-23 13:47:00'),
(54, 4, 6, '628b762c402e6_WIN_20220227_09_56_49_Pro.jpg', 191221, '2022-05-23 13:55:24'),
(55, 4, 6, '628b76414fa41_WIN_20220227_09_56_45_Pro.jpg', 180566, '2022-05-23 13:55:45'),
(56, 4, 6, '628b77f36a2dd_WIN_20220227_09_56_47_Pro.jpg', 189530, '2022-05-23 14:02:59'),
(57, 3, 3, '628b8a6624fb5_1596449786_10224.jfif', 10224, '2022-05-23 15:21:42'),
(58, 3, 3, '628b8a727ae9a_téléchargé.jfif', 3934, '2022-05-23 15:21:54'),
(59, 3, 3, '628b8a7cd3727_1637939530_6002.jpeg', 6002, '2022-05-23 15:22:04'),
(60, 3, 3, '628b8a84ee5d3_images.png', 6724, '2022-05-23 15:22:12'),
(61, 3, 3, '628b8a89e116e_depositphotos_37559665-stock-illustration-3d-shiny-red-number-3.jpg', 51090, '2022-05-23 15:22:17'),
(62, 3, 3, '628b8bfa0defc_images.png', 6724, '2022-05-23 15:28:26'),
(63, 3, 3, '628b8bfb3c641_1596449786_10224.jfif', 10224, '2022-05-23 15:28:27'),
(64, 3, 3, '628b8bfc549fc_depositphotos_37559665-stock-illustration-3d-shiny-red-number-3.jpg', 51090, '2022-05-23 15:28:28'),
(65, 3, 3, '628b8bfd671c3_1637939530_6002.jpeg', 6002, '2022-05-23 15:28:29'),
(66, 3, 3, '628b8bfe785f6_téléchargé.jfif', 3934, '2022-05-23 15:28:30'),
(67, 3, 3, '628b8c2f0ca06_1596449786_10224.jfif', 10224, '2022-05-23 15:29:19'),
(68, 3, 3, '628b8c35efe14_depositphotos_37559665-stock-illustration-3d-shiny-red-number-3.jpg', 51090, '2022-05-23 15:29:25'),
(69, 3, 3, '628b8c3b53015_1637939530_6002.jpeg', 6002, '2022-05-23 15:29:31'),
(70, 3, 3, '628b8c4f1fc8c_WIN_20220227_09_56_45_Pro.jpg', 180566, '2022-05-23 15:29:51'),
(71, 3, 3, '628b8c595152f_WIN_20220227_09_56_49_Pro.jpg', 191221, '2022-05-23 15:30:01'),
(72, 3, 3, '628b8c6047230_WIN_20220227_09_56_59_Pro.jpg', 198627, '2022-05-23 15:30:08'),
(73, 3, 3, '628b8c8d36843_WIN_20220227_09_56_49_Pro.jpg', 191221, '2022-05-23 15:30:53'),
(74, 3, 3, '628b8c9377f6f_WIN_20220227_09_57_23_Pro.jpg', 190981, '2022-05-23 15:30:59'),
(75, 3, 3, '628b8c9811437_WIN_20220227_09_57_05_Pro.jpg', 201998, '2022-05-23 15:31:04'),
(76, 3, 3, '628b8c9bb3814_WIN_20220227_09_56_59_Pro.jpg', 198627, '2022-05-23 15:31:07'),
(77, 3, 3, '628b8c9f79f1e_WIN_20220227_09_56_54_Pro.jpg', 198289, '2022-05-23 15:31:11'),
(78, 3, 3, '628b8ca6d6e3e_WIN_20220227_09_56_55_Pro.jpg', 198065, '2022-05-23 15:31:18'),
(79, 3, 3, '628b8cab50c1d_WIN_20220227_09_56_51_Pro.jpg', 198300, '2022-05-23 15:31:23'),
(80, 3, 3, '628b8cc0121a3_WIN_20220227_09_56_47_Pro.jpg', 189530, '2022-05-23 15:31:44'),
(81, 3, 3, '628b8ccc4e6fa_WIN_20220227_09_56_45_Pro.jpg', 180566, '2022-05-23 15:31:56'),
(82, 3, 3, '628b8cf72a0c3_depositphotos_37559665-stock-illustration-3d-shiny-red-number-3.jpg', 51090, '2022-05-23 15:32:39'),
(83, 3, 3, '628b8d1c7c016_1596449786_10224.jfif', 10224, '2022-05-23 15:33:16'),
(84, 3, 3, '628b8dd01c40f_téléchargé.jfif', 3934, '2022-05-23 15:36:16'),
(85, 3, 3, '628b8dd5ccc1d_depositphotos_37559665-stock-illustration-3d-shiny-red-number-3.jpg', 51090, '2022-05-23 15:36:21'),
(86, 3, 3, '628b8de0530cd_téléchargé.jfif', 3934, '2022-05-23 15:36:32'),
(87, 3, 3, '628b8ecfb3f6f_alpinistesretraites_bg_small_stars.png', 147068, '2022-05-23 15:40:31'),
(88, 3, 3, '628b8ed68f980_20380841.jpg', 156312, '2022-05-23 15:40:38'),
(89, 3, 3, '628b8ee107dc6_23529690.jpg', 275929, '2022-05-23 15:40:49'),
(90, 3, 3, '628b8ef474eac_33524693.jpg', 341651, '2022-05-23 15:41:08'),
(91, 3, 3, '628b8effde041_7521777.jpg', 413474, '2022-05-23 15:41:19'),
(92, 3, 3, '628b90f81eb6e_chris-liverani-ViEBSoZH6M4-unsplash.jpg', 1007340, '2022-05-23 15:49:44'),
(93, 3, 3, '628b90fd6ff32_micheile-dot-com-z68vPSMhutE-unsplash.jpg', 1215678, '2022-05-23 15:49:49'),
(94, 3, 3, '628b9109a9413_photo6044042163102267173 (1).jpg', 241651, '2022-05-23 15:50:01'),
(95, 3, 3, '628b91a43475e_2.png', 238860, '2022-05-23 15:52:36'),
(96, 3, 3, '628b91a9122ac_4.png', 220204, '2022-05-23 15:52:41'),
(97, 3, 3, '628b91b4aa23b_1.png', 286707, '2022-05-23 15:52:52'),
(98, 3, 3, '628b92f326741_10.png', 63859, '2022-05-23 15:58:11'),
(99, 3, 3, '628b92f7651fe_12.png', 238626, '2022-05-23 15:58:15'),
(100, 3, 3, '628b930328a69_13.png', 115848, '2022-05-23 15:58:27'),
(101, 3, 3, '628b936538c85_7.png', 284703, '2022-05-23 16:00:05'),
(102, 3, 3, '628b93c128648_téléchargé.jfif', 3934, '2022-05-23 16:01:37'),
(103, 3, 3, '628b93cdda3fd_10.png', 63859, '2022-05-23 16:01:49'),
(104, 3, 3, '628b93ee14829_11.png', 218129, '2022-05-23 16:02:22'),
(105, 3, 3, '628b93ff555dd_8.png', 215744, '2022-05-23 16:02:39'),
(106, 3, 3, '628b940f817ed_depositphotos_37559665-stock-illustration-3d-shiny-red-number-3.jpg', 51090, '2022-05-23 16:02:55'),
(107, 3, 3, '628b942408372_chris-liverani-ViEBSoZH6M4-unsplash.jpg', 1007340, '2022-05-23 16:03:16'),
(108, 3, 3, '628b94c895684_img-72.jpg', 142299, '2022-05-23 16:06:00'),
(112, 3, 3, '628b97569daf5_9.png', 140948, '2022-05-23 16:16:54'),
(113, 3, 3, '628b976aaa3ba_logo2.png', 4231, '2022-05-23 16:17:14'),
(145, 4, 8, '628c0d47e11b0_10.jpg', 115760, '2022-05-24 00:40:07'),
(152, 4, 8, '628c0d7dd3fd1_photo6044042163102267186.jpg', 63248, '2022-05-24 00:41:01'),
(153, 4, 8, '628c0d8b5ebc1_35.jpg', 42848, '2022-05-24 00:41:15'),
(159, 3, 3, '628c3311d361c_photo6044042163102267173 (1).jpg', 241651, '2022-05-24 03:21:21'),
(160, 4, 2, '629520a7e8956_photo6044042163102267173.jpg', 156312, '2022-05-30 21:53:11'),
(186, 4, 2, '62978ada45fd3_upload.png', 14610, '2022-06-01 17:50:50'),
(187, 4, 2, '62978adb9195c_upload.png', 14610, '2022-06-01 17:50:51'),
(188, 4, 2, '62978adcd91f1_upload.png', 14610, '2022-06-01 17:50:52'),
(189, 4, 2, '62978ade2d254_upload.png', 14610, '2022-06-01 17:50:54'),
(190, 4, 2, '62978adf74dba_upload.png', 14610, '2022-06-01 17:50:55'),
(191, 4, 2, '62978ae0bc52c_upload.png', 14610, '2022-06-01 17:50:56');

-- --------------------------------------------------------

--
-- Structure de la table `referentiel`
--

CREATE TABLE `referentiel` (
  `id` int(11) NOT NULL,
  `libelle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `libelle_ar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `referentiel`
--

INSERT INTO `referentiel` (`id`, `libelle`, `libelle_ar`) VALUES
(1, 'Type Activité', NULL),
(2, 'Type d\'Etape ', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `region`
--

CREATE TABLE `region` (
  `id` int(11) NOT NULL,
  `destination_id` int(11) DEFAULT NULL,
  `region` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `experience_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `mark` double NOT NULL,
  `comment` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guide_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `review`
--

INSERT INTO `review` (`id`, `experience_id`, `user_id`, `mark`, `comment`, `guide_id`) VALUES
(1, 2, 4, 4, 'Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Donec rutrum congue leo eget malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Proin eget tortor risus. Sed porttitor lectus nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor accumsan tincidunt.', NULL),
(2, 2, 5, 6, 'Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.', NULL),
(4, 3, 5, 2, 'Vivamus magnalis at tellus.', NULL),
(5, NULL, 5, 3, 'Comment guide 4 Vivamus magnalis at tellus.', 4),
(6, 1, 4, 2, 'yeeeeeeeeeeeeeeeeeeeeeeeeeea', NULL),
(7, NULL, 4, 0, 'teeeeeeeeeeeeest', 3),
(8, 2, 5, 0, 'Ichlibidich', NULL),
(9, 2, 5, 3, 'mmmmmmmmmmmmmmmmmm', NULL),
(10, 2, 5, 0.5, 'mmmmmmmmmmmmmmmmmmppp', NULL),
(11, 2, 5, 2.5, 'aaaaaaaaaaaaal7alwal7alwa', NULL),
(12, 2, 5, 4.5, 'wa sbe333', NULL),
(13, 2, 5, 4.5, 'waaaaaaaaaaa sab7anelaaaaaaaaaaaah', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `step_experience`
--

CREATE TABLE `step_experience` (
  `id` int(11) NOT NULL,
  `experience_id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `resume` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duree` int(11) DEFAULT NULL,
  `type_etape_id` int(11) DEFAULT NULL,
  `jour` int(11) DEFAULT NULL,
  `debut` time DEFAULT NULL,
  `destination_id` int(11) DEFAULT NULL,
  `media_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `step_experience`
--

INSERT INTO `step_experience` (`id`, `experience_id`, `title`, `resume`, `duree`, `type_etape_id`, `jour`, `debut`, `destination_id`, `media_id`) VALUES
(3, 2, 'لانطلاق من القنيطرة أمام مسجد محمد السادس ( قرب أسواق السلام )', 'Curabitur aliquet quam id dui posuere blandit. Sed porttitor lectus nibh. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur aliquet quam id dui posuere b', 3, 25, 1, '13:18:20', 1, 160),
(4, 2, ' الانطلاق من الرباط (سيتم تحديد نقطة الإلتقاء لاحقا)', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui posue', 8, 22, 1, '13:19:28', 2, 159),
(5, 2, 'الوصول لإمليل وأخد نقل محلي لصعود لدوار مزيك ( دار حسن ).', 'Sed porttitor lectus nibh. Quisque velit nisi, pretium ut lacinia in, elementum id enim.', 0, 26, 2, '17:03:31', NULL, 153),
(6, 2, '08:30 تناول وجبة الفطور', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum congue leo eget malesuada. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec', 7, 28, 2, NULL, NULL, 152),
(7, 2, 'الوصول لإمليل وأخد نقل محلي لصعود لدوار مزيك ( دار حسن ).', 'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Cura', 1, 22, 2, NULL, NULL, 104),
(8, 2, 'ا الاستمتاع بالطبيعة الجبلية الخلابة.', '', 0, 20, 2, NULL, NULL, 105),
(9, 2, ' استراحة في شمهروش', '', 12, 25, 3, NULL, NULL, NULL),
(10, 2, 'االوصول لمأوى توبقال Les Mouflons', '', 0, 22, 3, NULL, NULL, NULL),
(11, 2, 'الوصول للقمة', '', 3, 20, 3, NULL, NULL, NULL),
(12, 1, 'oooooooooooooooooo', 'ppppppppppppppppppppp', 3, NULL, NULL, NULL, NULL, NULL),
(13, 2, 'UHHKKKL', 'TEST', 88, NULL, 1, '19:10:51', 2, NULL),
(14, 2, 'xxxxxxxxxxxxxxxx', 'qcqscqscqscqscqscqscqscqscqs', NULL, NULL, 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `subscription`
--

CREATE TABLE `subscription` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `subscription`
--

INSERT INTO `subscription` (`id`, `user_id`) VALUES
(1, 4),
(2, 5);

-- --------------------------------------------------------

--
-- Structure de la table `subscription_experience`
--

CREATE TABLE `subscription_experience` (
  `subscription_id` int(11) NOT NULL,
  `experience_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `subscription_experience`
--

INSERT INTO `subscription_experience` (`subscription_id`, `experience_id`) VALUES
(1, 4),
(1, 6),
(2, 2),
(2, 3),
(2, 4);

-- --------------------------------------------------------

--
-- Structure de la table `subscription_guide`
--

CREATE TABLE `subscription_guide` (
  `subscription_id` int(11) NOT NULL,
  `guide_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `subscription_guide`
--

INSERT INTO `subscription_guide` (`subscription_id`, `guide_id`) VALUES
(1, 4),
(1, 6),
(2, 3),
(2, 4),
(2, 5),
(2, 6);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `guide_id` int(11) DEFAULT NULL,
  `roles` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:json)',
  `login` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthday` datetime NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `statut` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `guide_id`, `roles`, `login`, `password_hash`, `email`, `birthday`, `token`, `statut`) VALUES
(4, 3, '[\"ROLE_ADMIN\",\"ROLE_GUIDE\"]', 'test', '$2y$13$6a7GsGWNrFFd.fe/B4UFg.CCDttFz1o4kfLq370P04Atxn.kyv/MW', 'test@gmail.com', '2011-01-01 00:00:00', '123a', 1),
(5, 5, '[\"ROLE_ADMIN\",\"ROLE_GUIDE\"]', 'test2', '$2y$13$6a7GsGWNrFFd.fe/B4UFg.CCDttFz1o4kfLq370P04Atxn.kyv/MW', 'test2@gmail.com', '2011-01-01 00:00:00', '123ab', 1);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prenom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `valeur_referentiel`
--

CREATE TABLE `valeur_referentiel` (
  `id` int(11) NOT NULL,
  `id_ref_id` int(11) NOT NULL,
  `activites_id` int(11) DEFAULT NULL,
  `libelle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `libelle_ar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `valeur_referentiel`
--

INSERT INTO `valeur_referentiel` (`id`, `id_ref_id`, `activites_id`, `libelle`, `libelle_ar`, `icon`) VALUES
(1, 1, NULL, 'Montagne', NULL, 'faHouse'),
(2, 1, NULL, 'Escalade', NULL, 'faHouse'),
(3, 1, NULL, 'Alpinisme', NULL, 'faHouse'),
(4, 1, NULL, 'VTT', NULL, 'faHouse'),
(5, 1, NULL, 'Spéléo', NULL, 'faHouse'),
(6, 1, NULL, 'Ski', NULL, 'faHouse'),
(7, 1, NULL, 'Randonnée', NULL, 'faHouse'),
(8, 1, NULL, 'Trekking', NULL, 'faHouse'),
(9, 1, NULL, 'Multi-Activités', NULL, 'faHouse'),
(10, 1, NULL, 'Colo', NULL, 'faHouse'),
(11, 1, NULL, 'Canyoning', NULL, 'faHouse'),
(12, 1, NULL, 'Kayak', NULL, 'faHouse'),
(13, 1, NULL, 'Rafting', NULL, 'faHouse'),
(14, 1, NULL, 'Desert', NULL, 'faHouse'),
(15, 1, NULL, 'Rando Chamelier', NULL, 'faHouse'),
(16, 1, NULL, 'Trek Desert', NULL, 'faHouse'),
(17, 1, NULL, 'Kayak de mer', NULL, 'faHouse'),
(18, 1, NULL, 'Surf', NULL, 'faHouse'),
(19, 1, NULL, 'Plongée', NULL, 'faHouse'),
(20, 2, NULL, 'Dormir', NULL, 'faHouse'),
(21, 2, NULL, 'Manger', NULL, 'faHouse'),
(22, 2, NULL, 'Marche', NULL, 'faHouse'),
(23, 2, NULL, 'Jeu', NULL, 'faHouse'),
(24, 2, NULL, 'Camper', NULL, 'faHouse'),
(25, 2, NULL, 'Petit-Dej', NULL, 'faHouse'),
(26, 2, NULL, 'Dejeuner', NULL, 'faHouse'),
(27, 2, NULL, 'Diner', NULL, 'faHouse'),
(28, 2, NULL, 'Exploration', NULL, 'faHouse');

-- --------------------------------------------------------

--
-- Structure de la table `ville`
--

CREATE TABLE `ville` (
  `id` int(11) NOT NULL,
  `region_id` int(11) DEFAULT NULL,
  `ville` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `destination`
--
ALTER TABLE `destination`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_3EC63EAA727ACA70` (`parent_id`);

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `experience`
--
ALTER TABLE `experience`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_590C103D7ED1D4B` (`guide_id`),
  ADD KEY `IDX_590C103816C6140` (`destination_id`);

--
-- Index pour la table `experience_valeur_referentiel`
--
ALTER TABLE `experience_valeur_referentiel`
  ADD PRIMARY KEY (`experience_id`,`valeur_referentiel_id`),
  ADD KEY `IDX_B256F05146E90E27` (`experience_id`),
  ADD KEY `IDX_B256F0511EC809EB` (`valeur_referentiel_id`);

--
-- Index pour la table `guide`
--
ALTER TABLE `guide`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `guide_valeur_referentiel`
--
ALTER TABLE `guide_valeur_referentiel`
  ADD PRIMARY KEY (`guide_id`,`valeur_referentiel_id`),
  ADD KEY `IDX_A97D8E7BD7ED1D4B` (`guide_id`),
  ADD KEY `IDX_A97D8E7B1EC809EB` (`valeur_referentiel_id`);

--
-- Index pour la table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_6A2CA10CD7ED1D4B` (`guide_id`),
  ADD KEY `IDX_6A2CA10C46E90E27` (`experience_id`);

--
-- Index pour la table `referentiel`
--
ALTER TABLE `referentiel`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `region`
--
ALTER TABLE `region`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_F62F176816C6140` (`destination_id`);

--
-- Index pour la table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_794381C646E90E27` (`experience_id`),
  ADD KEY `IDX_794381C6A76ED395` (`user_id`),
  ADD KEY `IDX_794381C6D7ED1D4B` (`guide_id`);

--
-- Index pour la table `step_experience`
--
ALTER TABLE `step_experience`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_9FBE742EA9FDD75` (`media_id`),
  ADD KEY `IDX_9FBE74246E90E27` (`experience_id`),
  ADD KEY `IDX_9FBE74287738551` (`type_etape_id`),
  ADD KEY `IDX_9FBE742816C6140` (`destination_id`);

--
-- Index pour la table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_A3C664D3A76ED395` (`user_id`);

--
-- Index pour la table `subscription_experience`
--
ALTER TABLE `subscription_experience`
  ADD PRIMARY KEY (`subscription_id`,`experience_id`),
  ADD KEY `IDX_C77581669A1887DC` (`subscription_id`),
  ADD KEY `IDX_C775816646E90E27` (`experience_id`);

--
-- Index pour la table `subscription_guide`
--
ALTER TABLE `subscription_guide`
  ADD PRIMARY KEY (`subscription_id`,`guide_id`),
  ADD KEY `IDX_30A6C6469A1887DC` (`subscription_id`),
  ADD KEY `IDX_30A6C646D7ED1D4B` (`guide_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_8D93D649D7ED1D4B` (`guide_id`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `valeur_referentiel`
--
ALTER TABLE `valeur_referentiel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_9DF69EB5780F444` (`id_ref_id`),
  ADD KEY `IDX_9DF69EB55B8C31B7` (`activites_id`);

--
-- Index pour la table `ville`
--
ALTER TABLE `ville`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_43C3D9C398260155` (`region_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `destination`
--
ALTER TABLE `destination`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `experience`
--
ALTER TABLE `experience`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT pour la table `guide`
--
ALTER TABLE `guide`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=204;

--
-- AUTO_INCREMENT pour la table `referentiel`
--
ALTER TABLE `referentiel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `region`
--
ALTER TABLE `region`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `step_experience`
--
ALTER TABLE `step_experience`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `subscription`
--
ALTER TABLE `subscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `valeur_referentiel`
--
ALTER TABLE `valeur_referentiel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `ville`
--
ALTER TABLE `ville`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `destination`
--
ALTER TABLE `destination`
  ADD CONSTRAINT `FK_3EC63EAA727ACA70` FOREIGN KEY (`parent_id`) REFERENCES `destination` (`id`);

--
-- Contraintes pour la table `experience`
--
ALTER TABLE `experience`
  ADD CONSTRAINT `FK_590C103816C6140` FOREIGN KEY (`destination_id`) REFERENCES `destination` (`id`),
  ADD CONSTRAINT `FK_590C103D7ED1D4B` FOREIGN KEY (`guide_id`) REFERENCES `guide` (`id`);

--
-- Contraintes pour la table `experience_valeur_referentiel`
--
ALTER TABLE `experience_valeur_referentiel`
  ADD CONSTRAINT `FK_B256F0511EC809EB` FOREIGN KEY (`valeur_referentiel_id`) REFERENCES `valeur_referentiel` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_B256F05146E90E27` FOREIGN KEY (`experience_id`) REFERENCES `experience` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `guide_valeur_referentiel`
--
ALTER TABLE `guide_valeur_referentiel`
  ADD CONSTRAINT `FK_A97D8E7B1EC809EB` FOREIGN KEY (`valeur_referentiel_id`) REFERENCES `valeur_referentiel` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_A97D8E7BD7ED1D4B` FOREIGN KEY (`guide_id`) REFERENCES `guide` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `FK_6A2CA10C46E90E27` FOREIGN KEY (`experience_id`) REFERENCES `experience` (`id`),
  ADD CONSTRAINT `FK_6A2CA10CD7ED1D4B` FOREIGN KEY (`guide_id`) REFERENCES `guide` (`id`);

--
-- Contraintes pour la table `region`
--
ALTER TABLE `region`
  ADD CONSTRAINT `FK_F62F176816C6140` FOREIGN KEY (`destination_id`) REFERENCES `destination` (`id`);

--
-- Contraintes pour la table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `FK_794381C646E90E27` FOREIGN KEY (`experience_id`) REFERENCES `experience` (`id`),
  ADD CONSTRAINT `FK_794381C6A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_794381C6D7ED1D4B` FOREIGN KEY (`guide_id`) REFERENCES `guide` (`id`);

--
-- Contraintes pour la table `step_experience`
--
ALTER TABLE `step_experience`
  ADD CONSTRAINT `FK_9FBE74246E90E27` FOREIGN KEY (`experience_id`) REFERENCES `experience` (`id`),
  ADD CONSTRAINT `FK_9FBE742816C6140` FOREIGN KEY (`destination_id`) REFERENCES `destination` (`id`),
  ADD CONSTRAINT `FK_9FBE74287738551` FOREIGN KEY (`type_etape_id`) REFERENCES `valeur_referentiel` (`id`),
  ADD CONSTRAINT `FK_9FBE742EA9FDD75` FOREIGN KEY (`media_id`) REFERENCES `media` (`id`);

--
-- Contraintes pour la table `subscription`
--
ALTER TABLE `subscription`
  ADD CONSTRAINT `FK_A3C664D3A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `subscription_experience`
--
ALTER TABLE `subscription_experience`
  ADD CONSTRAINT `FK_C775816646E90E27` FOREIGN KEY (`experience_id`) REFERENCES `experience` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_C77581669A1887DC` FOREIGN KEY (`subscription_id`) REFERENCES `subscription` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `subscription_guide`
--
ALTER TABLE `subscription_guide`
  ADD CONSTRAINT `FK_30A6C6469A1887DC` FOREIGN KEY (`subscription_id`) REFERENCES `subscription` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_30A6C646D7ED1D4B` FOREIGN KEY (`guide_id`) REFERENCES `guide` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_8D93D649D7ED1D4B` FOREIGN KEY (`guide_id`) REFERENCES `guide` (`id`);

--
-- Contraintes pour la table `valeur_referentiel`
--
ALTER TABLE `valeur_referentiel`
  ADD CONSTRAINT `FK_9DF69EB55B8C31B7` FOREIGN KEY (`activites_id`) REFERENCES `guide` (`id`),
  ADD CONSTRAINT `FK_9DF69EB5780F444` FOREIGN KEY (`id_ref_id`) REFERENCES `referentiel` (`id`);

--
-- Contraintes pour la table `ville`
--
ALTER TABLE `ville`
  ADD CONSTRAINT `FK_43C3D9C398260155` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
