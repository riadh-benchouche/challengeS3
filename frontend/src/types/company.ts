import {EstablishmentType} from "@/types/establishment.ts";

export interface Company {
    id: number;
    name: string;
    foundationDate: string;
    email: string;
    password: string;
    status: CompanyStatus;
    image: string
    description: string;
    establishments: EstablishmentType[];
    country: string;
    raised: string;
}

export enum CompanyStatus {
    PENDING = "PENDING",
    ACTIVE = "ACTIVE"
}