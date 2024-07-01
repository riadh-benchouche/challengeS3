<?php

namespace App\Listener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\Security\Core\User\UserInterface;

class JWTListener
{
    public function onJWTListener(JWTCreatedEvent $event): void
    {
        $data = $event->getData();

        $user = $event->getUser();

        $data['id'] = $user->getId();

        $event->setData($data);
    }
}
