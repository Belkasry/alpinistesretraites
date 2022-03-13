<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220313203050 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE subscription (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, UNIQUE INDEX UNIQ_A3C664D3A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE subscription_guide (subscription_id INT NOT NULL, guide_id INT NOT NULL, INDEX IDX_30A6C6469A1887DC (subscription_id), INDEX IDX_30A6C646D7ED1D4B (guide_id), PRIMARY KEY(subscription_id, guide_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE subscription_experience (subscription_id INT NOT NULL, experience_id INT NOT NULL, INDEX IDX_C77581669A1887DC (subscription_id), INDEX IDX_C775816646E90E27 (experience_id), PRIMARY KEY(subscription_id, experience_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE subscription ADD CONSTRAINT FK_A3C664D3A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE subscription_guide ADD CONSTRAINT FK_30A6C6469A1887DC FOREIGN KEY (subscription_id) REFERENCES subscription (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE subscription_guide ADD CONSTRAINT FK_30A6C646D7ED1D4B FOREIGN KEY (guide_id) REFERENCES guide (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE subscription_experience ADD CONSTRAINT FK_C77581669A1887DC FOREIGN KEY (subscription_id) REFERENCES subscription (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE subscription_experience ADD CONSTRAINT FK_C775816646E90E27 FOREIGN KEY (experience_id) REFERENCES experience (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE subscription_guide DROP FOREIGN KEY FK_30A6C6469A1887DC');
        $this->addSql('ALTER TABLE subscription_experience DROP FOREIGN KEY FK_C77581669A1887DC');
        $this->addSql('DROP TABLE subscription');
        $this->addSql('DROP TABLE subscription_guide');
        $this->addSql('DROP TABLE subscription_experience');
    }
}
