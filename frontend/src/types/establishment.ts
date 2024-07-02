import {Employee} from "@/types/employe.ts";
import {Company} from "@/types/company.ts";

export interface EstablishmentType {
    id: number;
    name: string;
    adress: string;
    city: string;
    zipCode: string;
    country: string;
    phone: string;
    company: Company;
    employees: Employee[];
}

