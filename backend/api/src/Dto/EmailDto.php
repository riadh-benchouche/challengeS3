<?php

namespace App\Dto;


use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use App\Controller\MailController;

#[ApiResource(
    operations: [
        new Post(
            controller: MailController::class,
            output: false,
        )],
    normalizationContext: ['groups' => ['email']],
    denormalizationContext: ['groups' => ['email']],
)]
class EmailDto

{
    #[Groups(['email'])]
    private string $to;

    #[Groups(['email'])]
    private string $subject;

    #[Groups(['email'])]
    private string $body;

    #[Groups(['email'])]
    private string $template;

    #[Groups(['email'])]
    private array $context;

    #[Groups(['email'])]
    private string $attachmentPath;

    #[Groups(['email'])]
    private string $attachmentFileName;

    public function getAttachmentPath(): string
    {
        return $this->attachmentPath;
    }

    public function setAttachmentPath(string $attachmentPath): void
    {
        $this->attachmentPath = $attachmentPath;
    }

    public function getAttachmentFileName(): string
    {
        return $this->attachmentFileName;
    }

    public function setAttachmentFileName(string $attachmentFileName): void
    {
        $this->attachmentFileName = $attachmentFileName;
    }

    public function getContext(): array
    {
        return $this->context;
    }

    public function setContext(array $context): void
    {
        $this->context = $context;
    }

    public function getTemplate(): string
    {
        return $this->template;
    }

    public function setTemplate(string $template): void
    {
        $this->template = $template;
    }

    public function getTo(): string
    {
        return $this->to;
    }

    public function setTo(string $to): void
    {
        $this->to = $to;
    }

    public function getSubject(): string
    {
        return $this->subject;
    }

    public function setSubject(string $subject): void
    {
        $this->subject = $subject;
    }

    public function getBody(): string
    {
        return $this->body;
    }

    public function setBody(string $body): void
    {
        $this->body = $body;
    }
}




