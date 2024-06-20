import {useState} from 'react'
import {Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import Button from "@/components/Button.tsx";

const people = [
    {id: 1, name: 'Wade Cooper'},
    {id: 2, name: 'Arlene Mccoy'},
    {id: 3, name: 'Devon Webb'},
    {id: 4, name: 'Tom Cook'},
    {id: 5, name: 'Tanya Fox'},
    {id: 6, name: 'Hellen Schmidt'},
    {id: 7, name: 'Caroline Schultz'},
    {id: 8, name: 'Mason Heaney'},
    {id: 9, name: 'Claudie Smitham'},
    {id: 10, name: 'Emil Schaefer'},
]

const services = [
    {id: 1, name: 'Service 1'},
    {id: 2, name: 'Service 2'},
    {id: 3, name: 'Service 3'},
    {id: 4, name: 'Service 4'},
    {id: 5, name: 'Service 5'},
    {id: 6, name: 'Service 6'},
    {id: 7, name: 'Service 7'},
    {id: 8, name: 'Service 8'},
    {id: 9, name: 'Service 9'},
    {id: 10, name: 'Service 10'},
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Appointments() {
    const [selectedService, setSelectedService] = useState(services[0])
    const [selectedEmployee, setSelectedEmployee] = useState(people[0])
    return (
        <>
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <p className="text-base font-semibold leading-7 text-primary-600">Prenez rendez-vous</p>
                        <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Octopus IT
                            Solutions - Paris</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Merci de choisir un créneau horaire pour votre rendez-vous. Nous vous contacterons pour
                            confirmer votre rendez-vous.
                        </p>
                    </div>
                </div>
            </div>

            <form className="mx-auto max-w-4xl px-6 lg:px-8">
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Informations personnelles</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Merci de renseigner vos informations de
                            contact.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Country
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>Mexico</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="street-address"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Street address
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="street-address"
                                        id="street-address"
                                        autoComplete="street-address"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    City
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                    State / Province
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="region"
                                        id="region"
                                        autoComplete="address-level1"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="postal-code"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    ZIP / Postal code
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="postal-code"
                                        id="postal-code"
                                        autoComplete="postal-code"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="border-b border-gray-900/10 pb-12">
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
                                        className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6">
                                        <span className="block truncate">{selectedService.name}</span>
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
                    <Listbox value={selectedEmployee} onChange={setSelectedEmployee}>
                        {({open}) => (
                            <>
                                <Label className="block text-sm font-medium leading-6 text-gray-900 mt-10">Sélectionnez
                                    un employé pour votre rendez-vous
                                    <span className="text-red-500"> *</span>
                                </Label>
                                <div className="relative mt-2">
                                    <ListboxButton
                                        disabled={!selectedService}
                                        className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6 disabled:bg-gray-200 disabled:text-gray-400">
                                        <span className="block truncate">{selectedEmployee.name}</span>
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
                                            {people.map((person) => (
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
                    <span className="block text-sm font-medium leading-6 text-gray-900 mt-10">Sélectionnez une date et
                        Calendrier
                    </span>
                </div>


                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button type="button" className="text-gray-900 bg-gray-200 hover:bg-gray-200">
                        Annuler
                    </Button>
                    <Button
                        type="submit"
                    >
                        Réserver
                    </Button>
                </div>
            </form>
        </>
    )
}