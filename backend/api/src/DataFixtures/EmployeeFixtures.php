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
    
    public function getDependencies()
    {
        return [
            EstablishmentFixtures::class,
        ];
    }

    public function load(ObjectManager $manager): void
    {
        $employeesData = [
            [
                'firstName' => 'John',
                'lastName' => 'Doe',
                'email' => 'john.doe@example.com',
                'category' => 'Web developer',
                'reference' => "john-doe",
                'establishmentReference' => "establishment-1",
            ],
            [
                'firstName' => 'Jane',
                'lastName' => 'Smith',
                'email' => 'jane.smith@example.com',
                'category' => 'Designer',
                'reference' => "jane-smith",
                'establishmentReference' => "establishment-2",
            ],
            [
                'firstName' => 'Robert',
                'lastName' => 'Brown',
                'email' => 'robert.brown@example.com',
                'category' => 'Digital Marketing Specialist',
                'reference' => "robert-brown",
                'establishmentReference' => "establishment-3",
            ],
            [
                'firstName' => 'Emily',
                'lastName' => 'Jones',
                'email' => 'emily.jones@example.com',
                'category' => 'Professional content writing',
                'reference' => "emily-jones",
                'establishmentReference' => "establishment-4",
            ],
        ];

        foreach ($employeesData as $data) {
            $employee = new Employee();
            $employee->setFirstname($data['firstName']);
            $employee->setLastname($data['lastName']);
            $employee->setEmail($data['email']);
            $employee->setCategory($data['category']);
            $employee->setEstablishment($this->getReference($data['establishmentReference']));
            $employee->setPassword($this->passwordHasher->hashPassword($employee, 'test'));

            $this->addReference($data['reference'], $employee);
            $manager->persist($employee);
        }

        $manager->flush();
    }
}