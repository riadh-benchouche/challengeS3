<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240624211527 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE leave_day_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE leave_day (id INT NOT NULL, employee_id INT DEFAULT NULL, day_off TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, reason VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_ECB276078C03F15C ON leave_day (employee_id)');
        $this->addSql('ALTER TABLE leave_day ADD CONSTRAINT FK_ECB276078C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE service_employee DROP CONSTRAINT fk_a4e92e9ced5ca9e6');
        $this->addSql('ALTER TABLE service_employee DROP CONSTRAINT fk_a4e92e9c8c03f15c');
        $this->addSql('DROP TABLE service_employee');
        $this->addSql('ALTER TABLE service ADD employee_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE service ADD CONSTRAINT FK_E19D9AD28C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_E19D9AD28C03F15C ON service (employee_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE leave_day_id_seq CASCADE');
        $this->addSql('CREATE TABLE service_employee (service_id INT NOT NULL, employee_id INT NOT NULL, PRIMARY KEY(service_id, employee_id))');
        $this->addSql('CREATE INDEX idx_a4e92e9c8c03f15c ON service_employee (employee_id)');
        $this->addSql('CREATE INDEX idx_a4e92e9ced5ca9e6 ON service_employee (service_id)');
        $this->addSql('ALTER TABLE service_employee ADD CONSTRAINT fk_a4e92e9ced5ca9e6 FOREIGN KEY (service_id) REFERENCES service (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE service_employee ADD CONSTRAINT fk_a4e92e9c8c03f15c FOREIGN KEY (employee_id) REFERENCES employee (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE leave_day DROP CONSTRAINT FK_ECB276078C03F15C');
        $this->addSql('DROP TABLE leave_day');
        $this->addSql('ALTER TABLE service DROP CONSTRAINT FK_E19D9AD28C03F15C');
        $this->addSql('DROP INDEX IDX_E19D9AD28C03F15C');
        $this->addSql('ALTER TABLE service DROP employee_id');
    }
}
