<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240702170410 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE employee_service DROP CONSTRAINT fk_61d1ccdd8c03f15c');
        $this->addSql('ALTER TABLE employee_service DROP CONSTRAINT fk_61d1ccdded5ca9e6');
        $this->addSql('DROP TABLE employee_service');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE TABLE employee_service (employee_id INT NOT NULL, service_id INT NOT NULL, PRIMARY KEY(employee_id, service_id))');
        $this->addSql('CREATE INDEX idx_61d1ccdded5ca9e6 ON employee_service (service_id)');
        $this->addSql('CREATE INDEX idx_61d1ccdd8c03f15c ON employee_service (employee_id)');
        $this->addSql('ALTER TABLE employee_service ADD CONSTRAINT fk_61d1ccdd8c03f15c FOREIGN KEY (employee_id) REFERENCES employee (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE employee_service ADD CONSTRAINT fk_61d1ccdded5ca9e6 FOREIGN KEY (service_id) REFERENCES service (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }
}
