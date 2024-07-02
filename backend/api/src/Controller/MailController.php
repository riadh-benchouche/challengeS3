<?php

namespace App\Controller;

use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Dto\EmailDto;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;

#[AsController]
class MailController
{
    private $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    public function __invoke(EmailDto $emailDto): JsonResponse
    {
        $to = $emailDto->getTo();
        $subject = $emailDto->getSubject();
        $template = $emailDto->getTemplate();
        $context = $emailDto->getContext();
        $attachmentPath = $emailDto->getAttachmentPath();
        $attachmentFileName = $emailDto->getAttachmentFileName();

        $email = (new TemplatedEmail())
            ->from('no-reply@challenge.com <imed.ay95@gmail.com>')
            ->to($to)
            ->subject($subject)
            ->htmlTemplate('emails/' . $template . '.html.twig')
            ->context($context);

        if ($attachmentPath && $attachmentFileName) {
            $email->attachFromPath($attachmentPath, $attachmentFileName);
        }

        $this->mailer->send($email);

        return new JsonResponse(['message' => 'Email sent successfully']);
    }
}