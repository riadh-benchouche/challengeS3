<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\RatingRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RatingRepository::class)]
#[ApiResource]
class Rating
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $note = null;

    #[ORM\Column(length: 255)]
    private ?string $comment = null;

    #[ORM\ManyToOne(inversedBy: 'ratings')]
    private ?Employee $ratedEmployee = null;

    #[ORM\ManyToOne(inversedBy: 'ratings')]
    private ?User $ratingClient = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNote(): ?int
    {
        return $this->note;
    }

    public function setNote(int $note): static
    {
        $this->note = $note;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(string $comment): static
    {
        $this->comment = $comment;

        return $this;
    }

    public function getRatedEmployee(): ?Employee
    {
        return $this->ratedEmployee;
    }

    public function setRatedEmployee(?Employee $ratedEmployee): static
    {
        $this->ratedEmployee = $ratedEmployee;

        return $this;
    }

    public function getRatingClient(): ?User
    {
        return $this->ratingClient;
    }

    public function setRatingClient(?User $ratingClient): static
    {
        $this->ratingClient = $ratingClient;

        return $this;
    }
}
