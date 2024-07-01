<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\CompanyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Validator\Constraints as AcmeAssert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\GetCollection;
use Symfony\Component\HttpFoundation\File\File;
use App\State\UserPasswordHasher;


#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: CompanyRepository::class)]
#[ApiResource(
    normalizationContext: [ 'groups' => ['company:read', 'service:read']],
    operations: [
        new Get(),
        new GetCollection(),
        new Post(
            processor: UserPasswordHasher::class,
            denormalizationContext: ['groups' => 'company:create'],
            validationContext: ['groups' => 'company:create'],
        ),
        new Patch(
            processor: UserPasswordHasher::class,
            security: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_COMPANY') and object.getId() == user.getId())
            ",
            inputFormats: [ "json" ],
            denormalizationContext: ['groups' => 'company:update'],
        ),
        new Delete(
            security: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_COMPANY') and object.getId() == user.getId())
            ",
        )
    ],
)]
class Company implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['company:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['company:read', 'company:create', 'company:update'])]
    private ?string $name = null;

    #[Vich\UploadableField(mapping: 'kbis_file', fileNameProperty: 'kbis')]
    #[Groups(['company:create'])]
    private ?File $kbisFile = null;

    #[ORM\Column(length: 255)]
    #[Groups(['company:read'])]
    #[ApiProperty(
        security: "
            is_granted('ROLE_ADMIN') 
            or (is_granted('ROLE_COMPANY') and object.getId() == user.getId())
        ",
    )]    
    private ?string $kbis = null;

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(['company:read', 'company:update'])]
    private ?\DateTimeInterface $foundationDate = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['company:read', 'company:update'])]
    private ?string $country = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['company:read', 'company:update'])]
    private ?string $description = null;
    
    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['company:read', 'company:update'])]
    private ?string $raised = null;

    #[ORM\Column(length: 255)]
    #[Groups(['company:read', 'company:create'])]
    #[AcmeAssert\UniqueEmail(groups: ['company:create'])]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    #[Groups(['company:read', 'put:admin', 'company:update'])]
    #[ApiProperty(
        security: "
            is_granted('ROLE_ADMIN') 
        ",
    )]
    private ?string $status = 'PENDING';

    private ?array $roles = ['ROLE_COMPANY'];

    #[Groups(['company:create'])]
    #[Assert\Length(min:4)]
    private ?string $plainPassword = null;

    /**
     * @var Collection<int, Establishment>
     */
    #[ORM\OneToMany(mappedBy: 'company', targetEntity: Establishment::class)]
    #[Groups(['company:read'])]
    private Collection $establishments;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['company:read', 'company:create', 'company:update'])]
    #[Assert\Url]
    private ?string $image = null;

    public function __construct()
    {
        $this->establishments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getKbisFile(): ?File
    {
        return $this->kbisFile;
    }

    public function setKbisFile(?File $kbisFile): static
    {
        $this->kbisFile = $kbisFile;

        return $this;
    }

    public function getKbis(): ?string
    {
        return $this->kbis;
    }

    public function setKbis(string $kbis): static
    {
        $this->kbis = $kbis;

        return $this;
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

    public function setPlainPassword(?string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        $this->plainPassword = null;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;

        $roles[] = 'ROLE_COMPANY';

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
        return (string) $this->id;
    }

    /**
     * @return Collection<int, Establishment>
     */
    public function getEstablishments(): Collection
    {
        return $this->establishments;
    }

    public function addEstablishment(Establishment $establishment): static
    {
        if (!$this->establishments->contains($establishment)) {
            $this->establishments->add($establishment);
            $establishment->setCompany($this);
        }

        return $this;
    }

    public function removeEstablishment(Establishment $establishment): static
    {
        if ($this->establishments->removeElement($establishment)) {
            // set the owning side to null (unless already changed)
            if ($establishment->getCompany() === $this) {
                $establishment->setCompany(null);
            }
        }

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getFoundationDate(): ?\DateTimeInterface
    {
        return $this->foundationDate;
    }

    public function setFoundationDate(?\DateTimeInterface $foundationDate): static
    {
        $this->foundationDate = $foundationDate;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): static
    {
        $this->country = $country;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getRaised(): ?string
    {
        return $this->raised;
    }

    public function setRaised(string $raised): static
    {
        $this->raised = $raised;

        return $this;
    }

}
