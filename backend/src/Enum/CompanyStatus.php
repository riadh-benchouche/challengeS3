<?php

namespace App\Enum;

enum CompanyStatus: string
{
    case PENDING = 'PENDING';
    case APPROVED = 'APPROVED';
    case REJECTED = 'REJECTED';
    case SUSPENDED = 'SUSPENDED';

    public function getLabel(): string
    {
        return match ($this) {
            self::PENDING => 'En attente',
            self::APPROVED => 'Approuvé',
            self::REJECTED => 'Rejeté',
            self::SUSPENDED => 'Suspendu'
        };
    }

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}

