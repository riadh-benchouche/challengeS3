<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

use App\State\UserPasswordHasher;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Validator\Constraints as AcmeAssert;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ApiResource(
    operations: [
        new Get(
            security: "
                is_granted('ROLE_ADMIN')
                or (is_granted('ROLE_CLIENT') and object.getId() == user.getId())
            ",
        ),
        new GetCollection(
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Post(
            inputFormats: [ "json" ],
            denormalizationContext: ['groups' => 'user:create'],
            validationContext: ['groups' => 'user:create'],
            processor: UserPasswordHasher::class
        ),
        new Patch(
            inputFormats: [ "json" ],
            denormalizationContext: ['groups' => 'user:update'],
            security: "is_granted('ROLE_ADMIN') or (is_granted('ROLE_CLIENT') and object.getId() == user.getId())",
            processor: UserPasswordHasher::class
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')"
        )
    ],
    normalizationContext: [ 'groups' => ['user:read']],
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read', 'appointment:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:create', 'user:read'])]
    #[AcmeAssert\UniqueEmail(groups: ['user:create'])]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    #[Groups(['user:create', 'user:update'])]
    private ?string $plainPassword = null;

    private array $roles = ['ROLE_CLIENT'];

    /**
     * @var Collection<int, Rating>
     */
    #[ORM\OneToMany(mappedBy: 'ratingClient', targetEntity: Rating::class)]
    #[Groups(['user:read'])]
    private Collection $ratings;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user:create', 'user:update'])]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user:create', 'user:update'])]
    private ?string $lastName = null;

    /**
     * @var Collection<int, Appointment>
     */
    #[ORM\OneToMany(mappedBy: 'bookedBy', targetEntity: Appointment::class)]
    #[Groups(['user:read'])]
    private Collection $appointments;

    public function __construct()
    {
        $this->ratings = new ArrayCollection();
        $this->appointments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(string $plainPassword): static
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;

        $roles[] = 'ROLE_CLIENT';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

     /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        $this->plainPassword = null;
    }

    /**
     * @return Collection<int, Rating>
     */
    public function getRatings(): Collection
    {
        return $this->ratings;
    }

    public function addRating(Rating $rating): static
    {
        if (!$this->ratings->contains($rating)) {
            $this->ratings->add($rating);
            $rating->setRatingClient($this);
        }

        return $this;
    }

    public function removeRating(Rating $rating): static
    {
        if ($this->ratings->removeElement($rating)) {
            // set the owning side to null (unless already changed)
            if ($rating->getRatingClient() === $this) {
                $rating->setRatingClient(null);
            }
        }

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * @return Collection<int, Appointment>
     */
    public function getAppointments(): Collection
    {
        return $this->appointments;
    }

    public function addAppointment(Appointment $appointment): static
    {
        if (!$this->appointments->contains($appointment)) {
            $this->appointments->add($appointment);
            $appointment->setBookedBy($this);
        }

        return $this;
    }

    public function removeAppointment(Appointment $appointment): static
    {
        if ($this->appointments->removeElement($appointment)) {
            // set the owning side to null (unless already changed)
            if ($appointment->getBookedBy() === $this) {
                $appointment->setBookedBy(null);
            }
        }

        return $this;
    }

}
