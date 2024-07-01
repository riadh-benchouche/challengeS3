<?php

namespace App\DataFixtures;

use App\Entity\Appointment;
use App\Entity\User;
use App\Entity\Service;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class AppointmentFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies()
    {
        return [
            UserFixtures::class,
            ServiceFixtures::class,
        ];
    }

    public function load(ObjectManager $manager): void
    {
        $user1 = $this->getReference('user1@example.com');
        $user2 = $this->getReference('user2@example.com');
        $webDevelopmentService = $this->getReference('web-development');
        $graphicDesignService = $this->getReference('graphic-design');

        $appointment1 = new Appointment();
        $appointment1->setBeginning(9);
        $appointment1->setDuration(3);
        $appointment1->setStatus('Booked');
        $appointment->setReservationDate(new \DateTime('2024-06-30'));
        $appointment1->setBookedBy($user1);
        $appointment1->setService($webDevelopmentService);
        $manager->persist($appointment1);

        $appointment2 = new Appointment();
        $appointment2->setBeginning(13);
        $appointment2->setDuration(4);
        $appointment2->setStatus('Confirmed');
        $appointment->setReservationDate(new \DateTime('2024-06-30'));
        $appointment2->setBookedBy($user2);
        $appointment2->setService($graphicDesignService);
        $manager->persist($appointment2);

        $manager->flush();
    }
}
