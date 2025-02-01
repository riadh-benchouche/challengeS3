import {EstablishmentType} from "@/types/establishment.ts";
export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    service: Service;
    serviceName: string;
    category: string;
    establishment: EstablishmentType;
    workSchedules: WorkSchedule[];
    appointments: Appointment[];
    services: Service[];
}

export interface Service {
    id: number;
    name: string;
    description: string;
    duration: number;
    price: number;
    employees: Employee[];
}

export interface WorkSchedule {
    id: number;
    workDay: number;
    morningStart: number;
    morningEnd: number;
    afternoonStart: number;
    afternoonEnd: number;
}

export interface Appointment {
    id: number;
    reservationDate: string;
    beginning: number;
    duration: number;
    status: string;
}