<?php

namespace App\EventSubscriber;

use App\Entity\Company;
use App\Enum\CompanyStatus;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Http\Event\CheckPassportEvent;

class CompanyStatusSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            CheckPassportEvent::class => ['onCheckPassport', -10],
        ];
    }

    /**
     * @throws CustomUserMessageAuthenticationException
     */
    public function onCheckPassport(CheckPassportEvent $event): void
    {
        $passport = $event->getPassport();
        $user = $passport->getUser();

        if (!$user instanceof Company) {
            return;
        }

        if ($user->getStatus() === CompanyStatus::PENDING) {
            throw new CustomUserMessageAuthenticationException(
                'Votre compte est en attente de validation par un administrateur.'
            );
        }

        if ($user->getStatus() === CompanyStatus::REJECTED) {
            throw new CustomUserMessageAuthenticationException(
                'Votre compte a été rejeté. Veuillez contacter un administrateur.'
            );
        }

        if ($user->getStatus() === CompanyStatus::SUSPENDED) {
            throw new CustomUserMessageAuthenticationException(
                'Votre compte est actuellement suspendu.'
            );
        }
    }
}