<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240625083939 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE leave_day DROP CONSTRAINT fk_ecb276078c03f15c');
        $this->addSql('DROP INDEX idx_ecb276078c03f15c');
        $this->addSql('ALTER TABLE leave_day DROP employee_id');
        $this->addSql('ALTER TABLE work_schedule DROP CONSTRAINT fk_8f8d9ba78c03f15c');
        $this->addSql('DROP INDEX idx_8f8d9ba78c03f15c');
        $this->addSql('ALTER TABLE work_schedule DROP employee_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE work_schedule ADD employee_id INT NOT NULL');
        $this->addSql('ALTER TABLE work_schedule ADD CONSTRAINT fk_8f8d9ba78c03f15c FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_8f8d9ba78c03f15c ON work_schedule (employee_id)');
        $this->addSql('ALTER TABLE leave_day ADD employee_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE leave_day ADD CONSTRAINT fk_ecb276078c03f15c FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_ecb276078c03f15c ON leave_day (employee_id)');
    }
}
