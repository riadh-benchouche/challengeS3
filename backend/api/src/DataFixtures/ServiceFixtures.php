<?php

namespace App\DataFixtures;

use App\Entity\Service;
use App\DataFixtures\EmployeeFixtures;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ServiceFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies()
    {
        return [
            EmployeeFixtures::class,
        ];
    }

    public function load(ObjectManager $manager): void
    {
        $servicesData = [
            [
                'name' => 'Web Development',
                'description' => 'Full stack web development service.',
                'duration' => 2,
                'price' => 200,
                'reference' => "web-development",
                'employeeReference' => "john-doe",
            ],
            [
                'name' => 'Graphic Design',
                'description' => 'Creative graphic design service.',
                'duration' => 1,
                'price' => 150,
                'reference' => "graphic-design",
                'employeeReference' => "jane-smith",
            ],
            [
                'name' => 'Digital Marketing',
                'description' => 'Comprehensive digital marketing strategy.',
                'duration' => 1,
                'price' => 120,
                'reference' => "digital-marketing",
                'employeeReference' => "robert-brown",
            ],
            [
                'name' => 'Content Writing',
                'description' => 'Professional content writing service.',
                'duration' => 2,
                'price' => 80,
                'reference' => "content-writing",
                'employeeReference' => "emily-jones",
            ],
        ];

        foreach ($servicesData as $data) {
            $service = new Service();
            $service->setName($data['name']);
            $service->setDescription($data['description']);
            $service->setDuration($data['duration']);
            $service->setPrice($data['price']);
            $service->setEmployee($this->getReference($data['employeeReference']));

            $this->addReference($data['reference'], $service);
            $manager->persist($service);
        }

        $manager->flush();
    }
}
