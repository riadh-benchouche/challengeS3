<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240620164622 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE company ADD foundation_date INT DEFAULT NULL');
        $this->addSql('ALTER TABLE company ADD countries INT DEFAULT NULL');
        $this->addSql('ALTER TABLE company ALTER kbis SET NOT NULL');
        $this->addSql('ALTER TABLE company RENAME COLUMN activation_token TO raised');
        $this->addSql('ALTER TABLE employee ADD category VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE employee DROP category');
        $this->addSql('ALTER TABLE company DROP foundation_date');
        $this->addSql('ALTER TABLE company DROP countries');
        $this->addSql('ALTER TABLE company ALTER kbis DROP NOT NULL');
        $this->addSql('ALTER TABLE company RENAME COLUMN raised TO activation_token');
    }
}
