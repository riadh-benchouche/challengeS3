<?php

namespace App\Serializer;

use Symfony\Component\Serializer\Normalizer\ContextAwareDenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;
use Symfony\Component\Serializer\Exception\UnexpectedValueException;

class CustomDateNormalizer implements ContextAwareNormalizerInterface, ContextAwareDenormalizerInterface
{
    private const FORMAT = 'Y-m-d';
    private const SUPPORTED_TYPES = [\DateTimeInterface::class];

    public function normalize($object, $format = null, array $context = [])
    {
        if (!$object instanceof \DateTimeInterface) {
            return null;
        }

        return $object->format(self::FORMAT);
    }

    public function denormalize($data, $type, $format = null, array $context = [])
    {
        if (!is_string($data)) {
            throw new UnexpectedValueException('The data is not a valid string.');
        }

        return \DateTime::createFromFormat(self::FORMAT, $data) ?: null;
    }

    public function supportsNormalization($data, $format = null, array $context = []): bool
    {
        return $data instanceof \DateTimeInterface;
    }

    public function supportsDenormalization($data, $type, $format = null, array $context = []): bool
    {
        return in_array($type, self::SUPPORTED_TYPES, true);
    }
}
