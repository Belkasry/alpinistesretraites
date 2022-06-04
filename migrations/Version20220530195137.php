<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220530195137 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE step_experience ADD media_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE step_experience ADD CONSTRAINT FK_9FBE742EA9FDD75 FOREIGN KEY (media_id) REFERENCES media (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_9FBE742EA9FDD75 ON step_experience (media_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE step_experience DROP FOREIGN KEY FK_9FBE742EA9FDD75');
        $this->addSql('DROP INDEX UNIQ_9FBE742EA9FDD75 ON step_experience');
        $this->addSql('ALTER TABLE step_experience DROP media_id');
    }
}
