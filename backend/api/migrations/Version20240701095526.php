<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240701095526 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE admin_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE appointment_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE company_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE employee_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE establishment_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE leave_day_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE rating_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE service_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE work_schedule_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE admin (id INT NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE appointment (id INT NOT NULL, booked_by_id INT DEFAULT NULL, service_id INT DEFAULT NULL, beginning INT NOT NULL, duration INT NOT NULL, status VARCHAR(255) NOT NULL, reservation_date DATE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_FE38F844F4A5BD90 ON appointment (booked_by_id)');
        $this->addSql('CREATE INDEX IDX_FE38F844ED5CA9E6 ON appointment (service_id)');
        $this->addSql('CREATE TABLE company (id INT NOT NULL, name VARCHAR(255) NOT NULL, kbis VARCHAR(255) NOT NULL, foundation_date DATE DEFAULT NULL, country VARCHAR(255) DEFAULT NULL, description TEXT DEFAULT NULL, raised VARCHAR(255) DEFAULT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, image VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE employee (id INT NOT NULL, establishment_id INT DEFAULT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, category VARCHAR(255) NOT NULL, image VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5D9F75A18565851 ON employee (establishment_id)');
        $this->addSql('CREATE TABLE establishment (id INT NOT NULL, company_id INT NOT NULL, name VARCHAR(255) NOT NULL, adress VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, zip_code VARCHAR(255) NOT NULL, country VARCHAR(255) NOT NULL, phone VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_DBEFB1EE979B1AD6 ON establishment (company_id)');
        $this->addSql('CREATE TABLE leave_day (id INT NOT NULL, employee_id INT DEFAULT NULL, day_off TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, reason VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_ECB276078C03F15C ON leave_day (employee_id)');
        $this->addSql('CREATE TABLE rating (id INT NOT NULL, rated_employee_id INT DEFAULT NULL, rating_client_id INT DEFAULT NULL, note INT NOT NULL, comment VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_D8892622D31D891 ON rating (rated_employee_id)');
        $this->addSql('CREATE INDEX IDX_D88926223A6C332B ON rating (rating_client_id)');
        $this->addSql('CREATE TABLE service (id INT NOT NULL, employee_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, duration INT NOT NULL, price INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_E19D9AD28C03F15C ON service (employee_id)');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE work_schedule (id INT NOT NULL, employee_id INT NOT NULL, work_day INT NOT NULL, morning_start INT NOT NULL, morning_end INT NOT NULL, afternoon_start INT NOT NULL, afternoon_end INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_8F8D9BA78C03F15C ON work_schedule (employee_id)');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F844F4A5BD90 FOREIGN KEY (booked_by_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F844ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE employee ADD CONSTRAINT FK_5D9F75A18565851 FOREIGN KEY (establishment_id) REFERENCES establishment (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE establishment ADD CONSTRAINT FK_DBEFB1EE979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE leave_day ADD CONSTRAINT FK_ECB276078C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE rating ADD CONSTRAINT FK_D8892622D31D891 FOREIGN KEY (rated_employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE rating ADD CONSTRAINT FK_D88926223A6C332B FOREIGN KEY (rating_client_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE service ADD CONSTRAINT FK_E19D9AD28C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE work_schedule ADD CONSTRAINT FK_8F8D9BA78C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE admin_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE appointment_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE company_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE employee_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE establishment_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE leave_day_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE rating_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE service_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('DROP SEQUENCE work_schedule_id_seq CASCADE');
        $this->addSql('ALTER TABLE appointment DROP CONSTRAINT FK_FE38F844F4A5BD90');
        $this->addSql('ALTER TABLE appointment DROP CONSTRAINT FK_FE38F844ED5CA9E6');
        $this->addSql('ALTER TABLE employee DROP CONSTRAINT FK_5D9F75A18565851');
        $this->addSql('ALTER TABLE establishment DROP CONSTRAINT FK_DBEFB1EE979B1AD6');
        $this->addSql('ALTER TABLE leave_day DROP CONSTRAINT FK_ECB276078C03F15C');
        $this->addSql('ALTER TABLE rating DROP CONSTRAINT FK_D8892622D31D891');
        $this->addSql('ALTER TABLE rating DROP CONSTRAINT FK_D88926223A6C332B');
        $this->addSql('ALTER TABLE service DROP CONSTRAINT FK_E19D9AD28C03F15C');
        $this->addSql('ALTER TABLE work_schedule DROP CONSTRAINT FK_8F8D9BA78C03F15C');
        $this->addSql('DROP TABLE admin');
        $this->addSql('DROP TABLE appointment');
        $this->addSql('DROP TABLE company');
        $this->addSql('DROP TABLE employee');
        $this->addSql('DROP TABLE establishment');
        $this->addSql('DROP TABLE leave_day');
        $this->addSql('DROP TABLE rating');
        $this->addSql('DROP TABLE service');
        $this->addSql('DROP TABLE "user"');
        $this->addSql('DROP TABLE work_schedule');
    }
}
