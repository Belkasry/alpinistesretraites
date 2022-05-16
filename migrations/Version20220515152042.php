<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220515152042 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE experience ADD created_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE prix prix NUMERIC(10, 4) NOT NULL, CHANGE fixe fixe TINYINT(1) DEFAULT \'0\' NOT NULL');
        $this->addSql('ALTER TABLE step_experience CHANGE jour jour INT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE experience DROP created_at, DROP updated_at, CHANGE prix prix NUMERIC(10, 0) NOT NULL, CHANGE fixe fixe TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE step_experience CHANGE jour jour INT DEFAULT 1');
    }
}
