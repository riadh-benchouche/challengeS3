<?php

namespace App\Listener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\Security\Core\User\UserInterface;

class JWTListener
{
    public function onJWTListener(JWTCreatedEvent $event)
    {
        $data = $event->getData();

        $user = $event->getUser();

        if (!$user instanceof UserInterface) {
            return;
        }

        $data['id'] = $user->getId();

        $event->setData($data);
    }
}
