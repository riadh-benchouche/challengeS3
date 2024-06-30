<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\RatingRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: RatingRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Post(
            denormalizationContext: ['groups' => 'rating:create'],
            securityPostDenormalize: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_CLIENT') and object.getRatedEmployee().getId() == user.getId())
            ",
        ),
        new Patch(
            inputFormats: ["json"],
            denormalizationContext: ['groups' => 'rating:update'],
            security: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_CLIENT') and object.getRatingClient().getId() == user.getId())
            ",
        ),
        new Delete(
            security: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_CLIENT') and object.getRatingClient().getId() == user.getId())
            ",
        )
    ],
    normalizationContext: ['groups' => ['rating:read']]
)]
//#[AcmeAssert\UniqueRating]
class Rating
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['employee:read', 'user:read', 'rating:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['employee:read', 'user:read', 'rating:read', 'rating:create', 'rating:update'])]
    private ?int $note = null;

    #[ORM\Column(length: 255)]
    #[Groups(['employee:read', 'user:read', 'rating:read', 'rating:create', 'rating:update'])]
    private ?string $comment = null;

    #[ORM\ManyToOne(inversedBy: 'ratings')]
    #[Groups(['employee:read', 'user:read', 'rating:read', 'rating:create'])]
    private ?Employee $ratedEmployee = null;

    #[ORM\ManyToOne(inversedBy: 'ratings')]
    #[Groups(['employee:read', 'user:read', 'rating:read', 'rating:create'])]
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
