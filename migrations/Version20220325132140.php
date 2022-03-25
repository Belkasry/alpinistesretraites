<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220325132140 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE step_experience ADD type_etape_id INT DEFAULT NULL, ADD jour INT NOT NULL');
        $this->addSql('ALTER TABLE step_experience ADD CONSTRAINT FK_9FBE74287738551 FOREIGN KEY (type_etape_id) REFERENCES valeur_referentiel (id)');
        $this->addSql('CREATE INDEX IDX_9FBE74287738551 ON step_experience (type_etape_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE step_experience DROP FOREIGN KEY FK_9FBE74287738551');
        $this->addSql('DROP INDEX IDX_9FBE74287738551 ON step_experience');
        $this->addSql('ALTER TABLE step_experience DROP type_etape_id, DROP jour');
    }
}
