<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220326191735 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE step_experience ADD destination_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE step_experience ADD CONSTRAINT FK_9FBE742816C6140 FOREIGN KEY (destination_id) REFERENCES destination (id)');
        $this->addSql('CREATE INDEX IDX_9FBE742816C6140 ON step_experience (destination_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE step_experience DROP FOREIGN KEY FK_9FBE742816C6140');
        $this->addSql('DROP INDEX IDX_9FBE742816C6140 ON step_experience');
        $this->addSql('ALTER TABLE step_experience DROP destination_id');
    }
}
