import {useEffect, useState} from 'react'
import {Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import Button from "@/components/Button.tsx";
import Calendar from "@/components/Calendar.tsx";
import {format} from 'date-fns';
import axiosInstance from "@/utils/axiosInstance.ts";
import {EstablishmentType} from "@/types/establishment.ts";
import {useNavigate, useParams} from "react-router-dom";
import {Employee, Service} from "@/types/employe.ts";
import {CheckCircleIcon} from "@heroicons/react/16/solid";
import {fr} from "date-fns/locale";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function EditAppointment() {
    const [establishment, setEstablishment] = useState<EstablishmentType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [date, setDate] = useState<Date | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [originalAppointment, setOriginalAppointment] = useState<any>(null);

    const navigate = useNavigate();
    const {appointmentId} = useParams();

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                // 1. Récupérer le rendez-vous
                const response = await axiosInstance.get(`/api/appointments/${appointmentId}`);
                const appointmentData = response.data;
                setOriginalAppointment(appointmentData);

                // 2. Récupérer le service
                const serviceId = appointmentData.service['@id'].split('/').pop();
                const serviceResponse = await axiosInstance.get(`/api/services/${serviceId}`);
                const serviceData = serviceResponse.data;
                setSelectedService(serviceData);

                // 3. Récupérer l'établissement
                const establishmentId = serviceData.establishment.id;
                const establishmentResponse = await axiosInstance.get(`/api/establishments/${establishmentId}`);
                setEstablishment(establishmentResponse.data);
                setServices(establishmentResponse.data.services);

                // 4. Définir l'employé
                const employeeId = appointmentData.employee['@id'].split('/').pop();
                const employeeResponse = await axiosInstance.get(`/api/employees/${employeeId}`);
                setSelectedEmployee(employeeResponse.data);

                // 5. Définir la date
                const appointmentDate = new Date(appointmentData.reservationDate);
                appointmentDate.setHours(appointmentData.beginning);
                setDate(appointmentDate);

            } catch (error) {
                console.error('Erreur lors du chargement du rendez-vous:', error);
                setError('Erreur lors du chargement du rendez-vous');
            }
        };

        if (appointmentId) {
            fetchAppointment();
        }
    }, [appointmentId]);

    useEffect(() => {
        if (selectedService) {
            setEmployees(selectedService.employees);
        }
    }, [selectedService]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!date) {
            return setError('Veuillez sélectionner une date');
        }

        try {
            const formattedDateTimeLocal = format(date, "yyyy-MM-dd");
            const formattedDateTime = date.getHours();

            await axiosInstance.patch(`/api/appointments/${appointmentId}`, {
                reservationDate: formattedDateTimeLocal,
                beginning: formattedDateTime,
                service: `/api/services/${selectedService?.id}`,
                employee: `/api/employees/${selectedEmployee?.id}`,
            });

            setSuccess(true);
            setTimeout(() => {
                navigate('/bookings');
            }, 2000);
        } catch (error) {
            console.error('Erreur lors de la modification du rendez-vous:', error);
            setError('Erreur lors de la modification du rendez-vous');
        }
    };

    if (!originalAppointment || !establishment) {
        return <div className="text-center py-16">Chargement...</div>;
    }

    return (
        <>
            <div className="py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <p className="text-base font-semibold leading-7 text-primary-600">Modifier votre rendez-vous</p>
                        <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            {establishment?.name}
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Modifiez les détails de votre rendez-vous ci-dessous.
                        </p>
                    </div>
                </div>
            </div>

            {success ? (
                <div className="rounded-md bg-green-50 p-4 max-w-2xl mx-auto">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true"/>
                        </div>
                        <div className="ml-3">
                            <h3 className="font-medium text-green-800">Votre rendez-vous a été modifié avec succès</h3>
                            <div className="mt-2 text-sm text-green-700">
                                <p>
                                    Votre rendez-vous est maintenant prévu pour
                                    le {format(date as Date, 'dd MMMM yyyy', {locale: fr})} à {format(date as Date, 'HH:mm', {locale: fr})} avec {selectedEmployee?.firstName} {selectedEmployee?.lastName}.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <form className="mx-auto max-w-4xl px-6 lg:px-8" onSubmit={handleSubmit}>
                    <div className="border-b border-gray-900/10 pb-12">
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                        <Listbox value={selectedService} onChange={setSelectedService}>
                            {({open}) => (
                                <>
                                    <Label className="block text-sm font-medium leading-6 text-gray-900 mt-10">
                                        Service sélectionné
                                        <span className="text-red-500"> *</span>
                                    </Label>
                                    <div className="relative mt-2">
                                        <ListboxButton
                                            className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6 min-h-8">
                                            <span className="block truncate">{selectedService?.name}</span>
                                            <span
                                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400"
                                                                   aria-hidden="true"/>
                                            </span>
                                        </ListboxButton>

                                        <Transition
                                            show={open}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0">
                                            <ListboxOptions
                                                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {services.map((service) => (
                                                    <ListboxOption
                                                        key={service.id}
                                                        className={({active}) =>
                                                            classNames(
                                                                active ? 'bg-primary-600 text-white' : 'text-gray-900',
                                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                                            )
                                                        }
                                                        value={service}
                                                    >
                                                        {({selected, active}) => (
                                                            <>
                                                                <span className={classNames(
                                                                    selected ? 'font-semibold' : 'font-normal',
                                                                    'block truncate'
                                                                )}>
                                                                    {service.name}
                                                                </span>
                                                                {selected && (
                                                                    <span className={classNames(
                                                                        active ? 'text-white' : 'text-primary-600',
                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                    )}>
                                                                        <CheckIcon className="h-5 w-5"
                                                                                   aria-hidden="true"/>
                                                                    </span>
                                                                )}
                                                            </>
                                                        )}
                                                    </ListboxOption>
                                                ))}
                                            </ListboxOptions>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Listbox>

                        {employees && employees.length > 0 && (
                            <Listbox value={selectedEmployee} onChange={setSelectedEmployee}>
                                {({open}) => (
                                    <>
                                        <Label className="block text-sm font-medium leading-6 text-gray-900 mt-10">
                                            Employé sélectionné
                                            <span className="text-red-500"> *</span>
                                        </Label>
                                        <div className="relative mt-2">
                                            <ListboxButton
                                                className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6 min-h-8">
                                                <span className="block truncate">
                                                    {selectedEmployee?.firstName} {selectedEmployee?.lastName}
                                                </span>
                                                <span
                                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400"
                                                                       aria-hidden="true"/>
                                                </span>
                                            </ListboxButton>

                                            <Transition
                                                show={open}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0">
                                                <ListboxOptions
                                                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    {employees.map((employee) => (
                                                        <ListboxOption
                                                            key={employee.id}
                                                            className={({active}) =>
                                                                classNames(
                                                                    active ? 'bg-primary-600 text-white' : 'text-gray-900',
                                                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                                                )
                                                            }
                                                            value={employee}
                                                        >
                                                            {({selected, active}) => (
                                                                <>
                                                                    <span className={classNames(
                                                                        selected ? 'font-semibold' : 'font-normal',
                                                                        'block truncate'
                                                                    )}>
                                                                        {employee.firstName} {employee.lastName}
                                                                    </span>
                                                                    {selected && (
                                                                        <span className={classNames(
                                                                            active ? 'text-white' : 'text-primary-600',
                                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                        )}>
                                                                            <CheckIcon className="h-5 w-5"
                                                                                       aria-hidden="true"/>
                                                                        </span>
                                                                    )}
                                                                </>
                                                            )}
                                                        </ListboxOption>
                                                    ))}
                                                </ListboxOptions>
                                            </Transition>
                                        </div>
                                    </>
                                )}
                            </Listbox>
                        )}

                        {selectedEmployee && (
                            <>
                                <span className="block text-sm font-medium leading-6 text-gray-900 mt-10">
                                    Sélectionnez une nouvelle date
                                </span>
                                <Calendar
                                    service={selectedService as Service}
                                    employee={selectedEmployee}
                                    date={date}
                                    setDate={setDate}
                                />
                            </>
                        )}
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button
                            primary={false}
                            type="button"
                            onClick={() => navigate('/bookings')}
                            className="text-gray-900 bg-gray-200 hover:bg-gray-200"
                        >
                            Annuler
                        </Button>
                        <Button
                            disabled={!date || !selectedService || !selectedEmployee}
                            className={!date || !selectedService || !selectedEmployee
                                ? 'bg-gray-300 cursor-not-allowed hover:bg-gray-300'
                                : 'bg-primary-600 hover:bg-primary-700'
                            }
                            type="submit"
                        >
                            Mettre à jour
                        </Button>
                    </div>
                </form>
            )}
        </>
    );
}