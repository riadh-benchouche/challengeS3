import {useEffect, useState} from 'react'
import {Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import Button from "@/components/Button.tsx";
import Calendar from "@/components/Calendar.tsx";
import Input from "@/components/Input.tsx";
import {format} from 'date-fns';
import axiosInstance from "@/utils/axiosInstance.ts";
import {EstablishmentType} from "@/types/establishment.ts";
import {useLocation} from "react-router-dom";
import {Employee, Service} from "@/types/employe.ts";
import {CheckCircleIcon} from "@heroicons/react/16/solid";
import {fr} from "date-fns/locale";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Appointments() {
    const [establishment, setEstablishment] = useState<EstablishmentType | null>(null);
    const [error, setError] = useState<string | null>(null)
    const [services, setServices] = useState<Service[]>([])
    const [selectedService, setSelectedService] = useState<Service | null>(null)
    const [employees, setEmployees] = useState<Employee[]>([])
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [date, setDate] = useState<Date | null>(null)
    const [success, setSuccess] = useState<boolean>(false)
    const location = useLocation();
    const id = location.pathname.split('/')[4];
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        axiosInstance.get('/api/establishments/' + id)
            .then((res) => {
                setEstablishment(res.data);
                setServices(res.data.services)
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    useEffect(() => {
        axiosInstance.get('/api/users/' + userId)
            .then((res) => {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setEmail(res.data.email);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [userId]);

    useEffect(() => {
        if (selectedService) {
            setEmployees(selectedService.employees)
        }
    }, [selectedService]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!date) {
            return setError('Veuillez sélectionner une date')
        }
        const formattedDateTimeLocal = format(date, "yyyy-MM-dd");
        const formattedDateTime = date.getHours()
        axiosInstance.post('/api/appointments', {
            reservationDate: formattedDateTimeLocal,
            beginning: formattedDateTime,
            duration: selectedService?.duration,
            bookedBy: '/api/users/' + userId,
            service: '/api/services/' + selectedService?.id,
            employee: '/api/employees/' + selectedEmployee?.id,
        }).then(() => {
            console.log('Appointment booked successfully')
            setSuccess(true)
        }).catch((error) => {
            console.error('Error booking appointment', error)
        })
    }
    return (
        <>
            <div className="py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <p className="text-base font-semibold leading-7 text-primary-600">Prenez rendez-vous</p>
                        <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            {establishment?.name}
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Merci de choisir un créneau horaire pour votre rendez-vous. Nous vous contacterons pour
                            confirmer votre rendez-vous.
                        </p>
                    </div>
                </div>
            </div>

            {(date && selectedService && selectedEmployee && success) ?
                <div className="rounded-md bg-green-50 p-4 max-w-2xl mx-auto">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true"/>
                        </div>
                        <div className="ml-3">
                            <h3 className="font-medium text-green-800">Votre rendez-vous a été réservé avec
                                succès</h3>
                            <div className="mt-2 text-sm text-green-700">
                                <p>Votre rendez-vous est prévu pour
                                    le {format(date as Date, 'dd MMMM yyyy', {locale: fr})} à {format(date as Date, 'HH:mm', {locale: fr})} avec {selectedEmployee?.firstName} {selectedEmployee?.lastName}.
                                    <br/><br/>
                                    On vous remercie pour votre confiance.
                                </p>
                            </div>
                            <div className="mt-4">
                                <div className="-mx-2 -my-1.5 flex">
                                    <a
                                        type="button"
                                        href="/bookings"
                                        className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                                    >
                                        Voir mes rendez-vous
                                    </a>
                                    <a
                                        type="button"
                                        href="/"
                                        className="ml-3 rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                                    >
                                        Retour à l'accueil
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <form className="mx-auto max-w-4xl px-6 lg:px-8" onSubmit={handleSubmit}>
                    <div className="border-b border-gray-900/10 pb-12">
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        <Listbox value={selectedService} onChange={setSelectedService}>
                            {({open}) => (
                                <>
                                    <Label className="block text-sm font-medium leading-6 text-gray-900 mt-10">Sélectionnez
                                        un
                                        service
                                        <span className="text-red-500"> *</span>
                                    </Label>
                                    <div className="relative mt-2">
                                        <ListboxButton
                                            className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6 min-h-8">
                                            <span className="block truncate">{selectedService?.name}</span>
                                            <span
                                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                    </span>
                                        </ListboxButton>

                                        <Transition show={open} leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0">
                                            <ListboxOptions
                                                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {services.map((person) => (
                                                    <ListboxOption
                                                        key={person.id}
                                                        className={({focus}) =>
                                                            classNames(
                                                                focus ? 'bg-primary-600 text-white' : '',
                                                                !focus ? 'text-gray-900' : '',
                                                                'relative cursor-default select-none py-2 pl-3 pr-9',
                                                            )
                                                        }
                                                        value={person}
                                                    >
                                                        {({selected, focus}) => (
                                                            <>
                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                      {person.name}
                                                    </span>
                                                                {selected ? (
                                                                    <span
                                                                        className={classNames(
                                                                            focus ? 'text-white' : 'text-primary-600',
                                                                            'absolute inset-y-0 right-0 flex items-center pr-4',
                                                                        )}
                                                                    >
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                                                            </span>
                                                                ) : null}
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
                                        <Label className="block text-sm font-medium leading-6 text-gray-900 mt-10">Sélectionnez
                                            un
                                            employé
                                            <span className="text-red-500"> *</span>
                                        </Label>
                                        <div className="relative mt-2">
                                            <ListboxButton
                                                className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6 min-h-8">
                                            <span
                                                className="block truncate">{selectedEmployee?.firstName} {selectedEmployee?.lastName}</span>
                                                <span
                                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                    </span>
                                            </ListboxButton>

                                            <Transition show={open} leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0">
                                                <ListboxOptions
                                                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    {employees.map((person) => (
                                                        <ListboxOption
                                                            key={person.id}
                                                            className={({focus}) =>
                                                                classNames(
                                                                    focus ? 'bg-primary-600 text-white' : '',
                                                                    !focus ? 'text-gray-900' : '',
                                                                    'relative cursor-default select-none py-2 pl-3 pr-9',
                                                                )
                                                            }
                                                            value={person}
                                                        >
                                                            {({selected, focus}) => (
                                                                <>
                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                      {person.firstName} {person.lastName}
                                                    </span>
                                                                    {selected ? (
                                                                        <span
                                                                            className={classNames(
                                                                                focus ? 'text-white' : 'text-primary-600',
                                                                                'absolute inset-y-0 right-0 flex items-center pr-4',
                                                                            )}
                                                                        >
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                                                            </span>
                                                                    ) : null}
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
                        <span className="block text-sm font-medium leading-6 text-gray-900 mt-10">Sélectionnez une date et
                        Calendrier
                        </span>
                                <Calendar
                                    service={selectedService as Service}
                                    employee={selectedEmployee}
                                    date={date}
                                    setDate={setDate}/>
                            </>
                        )}
                    </div>

                    <div className="space-y-12 mt-6">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Informations
                                personnelles</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Merci de renseigner vos informations
                                de
                                contact.</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <Input
                                        type="text"
                                        placeholder="Doe"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required={true}
                                    />
                                </div>

                                <div className="sm:col-span-3">
                                    <Input
                                        type="text"
                                        placeholder="John"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required={true}
                                    />
                                </div>

                                <div className="sm:col-span-4">
                                    <Input
                                        type="email"
                                        placeholder="john@doe.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button primary={false} type="button"
                                className="text-gray-900 bg-gray-200 hover:bg-gray-200">
                            Annuler
                        </Button>
                        <Button
                            disabled={!date || !selectedService || !selectedEmployee}
                            className={!date || !selectedService || !selectedEmployee ? 'bg-gray-300 cursor-not-allowed hover:bg-gray-300' : 'bg-primary-600 hover:bg-primary-700'}
                            type="submit"
                        >
                            Réserver
                        </Button>
                    </div>
                </form>
            }


        </>
    )
}