<?php

namespace App\DataFixtures;

use App\Entity\Employee;
use App\DataFixtures\EstablishmentFixtures;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class EmployeeFixtures extends Fixture implements DependentFixtureInterface
{
    private $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function getDependencies(): array
    {
        return [
            EstablishmentFixtures::class,
        ];
    }

    public function load(ObjectManager $manager): void
    {
        $faker = \Faker\Factory::create('fr_FR');
        for ($i = 1; $i < 11; $i++) {
            $establishment = $this->getReference('establishment_' . $faker->numberBetween(1, 10));
            $employee = new Employee();
            $employee->setFirstname($faker->firstName);
            $employee->setLastname($faker->lastName);
            $employee->setEmail($faker->email);
            $employee->setCategory($faker->randomElement(['manager', 'employee']));
            $employee->setEstablishment($establishment);
            $employee->setPassword($this->passwordHasher->hashPassword($employee, 'password'));
            $manager->persist($employee);
            $this->addReference('employee_' . $i, $employee);
        }

        $manager->flush();
    }
}
