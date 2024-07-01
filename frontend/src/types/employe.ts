import {EstablishmentType} from "@/types/establishment.ts";
export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    establishment: EstablishmentType;
    services: Service[];
}

export interface Service {
    id: number;
    name: string;
    description: string;
    duration: number;
    price: number;
    employee: Employee;
}