<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240625084211 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE leave_day ADD employee_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE leave_day ADD CONSTRAINT FK_ECB276078C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_ECB276078C03F15C ON leave_day (employee_id)');
        $this->addSql('ALTER TABLE work_schedule ADD employee_id INT NOT NULL');
        $this->addSql('ALTER TABLE work_schedule ADD CONSTRAINT FK_8F8D9BA78C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_8F8D9BA78C03F15C ON work_schedule (employee_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE leave_day DROP CONSTRAINT FK_ECB276078C03F15C');
        $this->addSql('DROP INDEX IDX_ECB276078C03F15C');
        $this->addSql('ALTER TABLE leave_day DROP employee_id');
        $this->addSql('ALTER TABLE work_schedule DROP CONSTRAINT FK_8F8D9BA78C03F15C');
        $this->addSql('DROP INDEX IDX_8F8D9BA78C03F15C');
        $this->addSql('ALTER TABLE work_schedule DROP employee_id');
    }
}
