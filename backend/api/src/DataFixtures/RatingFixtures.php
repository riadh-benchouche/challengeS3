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
    public function getDependencies()
    {
        return [
            UserFixtures::class,
            EmployeeFixtures::class,
        ];
    }

    public function load(ObjectManager $manager): void
    {
        $user1 = $this->getReference('user1@example.com');
        $user2 = $this->getReference('user2@example.com');
        $employee1 = $this->getReference('john-doe');
        $employee2 = $this->getReference('jane-smith');

        $rating1 = new Rating();
        $rating1->setNote(5);
        $rating1->setComment('Excellent service!');
        $rating1->setRatedEmployee($employee1);
        $rating1->setRatingClient($user1);
        $manager->persist($rating1);

        $rating2 = new Rating();
        $rating2->setNote(4);
        $rating2->setComment('Very good, but can improve.');
        $rating2->setRatedEmployee($employee2);
        $rating2->setRatingClient($user2);
        $manager->persist($rating2);

        $rating3 = new Rating();
        $rating3->setNote(3);
        $rating3->setComment('Average experience.');
        $rating3->setRatedEmployee($employee1);
        $rating3->setRatingClient($user2);
        $manager->persist($rating3);

        $manager->flush();
    }
}
