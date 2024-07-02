<?php

namespace App\DataFixtures;

use App\Entity\Admin;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Uid\Uuid;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AdminFixtures extends Fixture
{
    private $passwordHasher = null;
    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }
    public function load(ObjectManager $manager): void
    {
        $faker = \Faker\Factory::create('fr_FR');
        for ($i = 1; $i < 6; $i++) {
            $admin = new Admin();
            $admin->setEmail($faker->email);
            $admin->setPassword($this->passwordHasher->hashPassword($admin, 'password'));
            $manager->persist($admin);
        }
        $manager->flush();
    }
}
