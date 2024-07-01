import {EstablishmentType} from "@/types/establishment.ts";

export interface Company {
    id: number;
    name: string;
    foundationDate: string;
    image: string
    description: string;
    establishments: EstablishmentType[];
    country: string;
    raised: string;
}