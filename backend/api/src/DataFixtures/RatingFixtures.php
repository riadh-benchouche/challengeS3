<?php

namespace App\DataFixtures;

use App\Entity\Rating;
use App\Entity\User;
use App\Entity\Employee;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class RatingFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
            EmployeeFixtures::class,
        ];
    }

    public function load(ObjectManager $manager): void
    {

        $faker = \Faker\Factory::create('fr_FR');
        for ($i = 1; $i < 11; $i++) {
            $user = $this->getReference('user_' . $faker->numberBetween(1, 10));
            $employee = $this->getReference('employee_' . $faker->numberBetween(1, 10));
            $rating = new Rating();
            $rating->setNote($faker->numberBetween(1, 5));
            $rating->setComment($faker->sentence(6, true));
            $rating->setRatedEmployee($employee);
            $rating->setRatingClient($user);
            $manager->persist($rating);
        }

        $manager->flush();
    }
}
