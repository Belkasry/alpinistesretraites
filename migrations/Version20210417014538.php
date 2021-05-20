<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210417014538 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE experience ADD destination_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE experience ADD CONSTRAINT FK_590C103816C6140 FOREIGN KEY (destination_id) REFERENCES destination (id)');
        $this->addSql('CREATE INDEX IDX_590C103816C6140 ON experience (destination_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE experience DROP FOREIGN KEY FK_590C103816C6140');
        $this->addSql('DROP INDEX IDX_590C103816C6140 ON experience');
        $this->addSql('ALTER TABLE experience DROP destination_id');
    }
}
