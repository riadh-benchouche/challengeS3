<?php
namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager)
    {
        $user1 = new User();
        $user1->setFirstname('John');
        $user1->setLastname('Doe');
        $user1->setEmail('user1@example.com');
        // $user1->setPassword("test");
        $user1->setPassword($this->passwordHasher->hashPassword($user1, 'test'));
        $manager->persist($user1);
        $this->addReference('user1@example.com', $user1);

        $user2 = new User();
        $user2->setFirstname('Jack');
        $user2->setLastname('Paul');
        $user2->setEmail('user2@example.com');
        $user2->setPassword($this->passwordHasher->hashPassword($user2, 'password2'));
        $manager->persist($user2);
        $this->addReference('user2@example.com', $user2);

        $manager->flush();
    }
}
