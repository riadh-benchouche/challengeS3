<?php

namespace App\Validator\Constraints;

use App\Repository\RatingRepository;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class UniqueRatingValidator extends ConstraintValidator
{
    private $ratingRepository;

    public function __construct(RatingRepository $ratingRepository)
    {
        $this->ratingRepository = $ratingRepository;
    }

    public function validate($rating, Constraint $constraint)
    {
        if (!$rating instanceof \App\Entity\Rating) {
            throw new \InvalidArgumentException('Expected instance of \App\Entity\Rating.');
        }

        $existingRating = $this->ratingRepository->findOneBy([
            'ratingClient' => $rating->getRatingClient(),
            'ratedEmployee' => $rating->getRatedEmployee(),
        ]);

        if ($existingRating) {
            $this->context->buildViolation($constraint->message)
                ->addViolation();
        }
    }
}
