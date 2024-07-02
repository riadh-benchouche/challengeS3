import Table from "@/components/Table.tsx";
import {useEffect, useState} from "react";
import SideBarModal from "@/components/SideBarModal.tsx";
import ServiceForm from "@/pages/organization/forms/ServiceForm.tsx";
import {useLocation} from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance.ts";
import {Employee, Service} from "@/types/employe.ts";
import {EstablishmentType} from "@/types/establishment.ts";
import EmployeeForm from "@/pages/organization/forms/EmployeeForm.tsx";
import EmployeeScheduleForm from "@/pages/organization/forms/EmployeeScheduleForm.tsx";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function EstablishmentDetail() {
    const [openCreateService, setOpenCreateService] = useState(false)
    const [openCreateEmployee, setOpenCreateEmployee] = useState(false)
    const [openCreateSchedule, setOpenCreateSchedule] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
    const [selectedService, setSelectedService] = useState<Service | null>(null)
    const location = useLocation()
    const establishmentId = location.pathname.split("/").pop()
    const [services, setServices] = useState<Service[]>([])
    const [establishment, setEstablishment] = useState<EstablishmentType>({} as EstablishmentType)
    const [employees, setEmployees] = useState<Employee[]>([])

    const [tabs, setTabs] = useState([
        {name: 'Employée', current: true},
        {name: 'Services', current: false},
    ])

    useEffect(() => {
        axiosInstance.get(`/api/establishments/${establishmentId}`).then(res => {
            setEstablishment(res.data)
            setServices(res.data.services)
            setEmployees([...res.data.employees.map((e: Employee) => {
                return {...e, serviceName: e.service.name}
            })])
        })
    }, [establishmentId, openCreateService, openCreateEmployee])

    const changeTab = (tab: { name: string, current: boolean }) => {
        tabs.forEach(tab => {
            tab.current = false
        })
        tab.current = true
        setTabs([...tabs])
    }
    const openEditEmployee = (employee: Employee) => {
        setSelectedEmployee(employee)
        setOpenCreateEmployee(true)
    }

    const openEditService = (service: Service) => {
        setSelectedService(service)
        setOpenCreateService(true)
    }
    return (
        <div>
            <SideBarModal open={openCreateService} setOpen={setOpenCreateService} title="Ajouter un service"
                          description="Ajoutez un nouveau service">
                <ServiceForm type={selectedService ? 'edit' : 'create'}
                             service={selectedService ? selectedService : undefined}
                             setClose={() => setOpenCreateService(false)}/>
            </SideBarModal>
            <SideBarModal open={openCreateEmployee} setOpen={setOpenCreateEmployee} title="Ajouter un employé"
                          description="Ajoutez un nouvel employé">
                <EmployeeForm type={selectedEmployee ? 'edit' : 'create'}
                              servicesList={services}
                              employee={selectedEmployee ? selectedEmployee : undefined}
                              setClose={() => setOpenCreateEmployee(false)}/>
            </SideBarModal>
            <SideBarModal open={openCreateSchedule} setOpen={setOpenCreateSchedule} title="Ajouter l'emloi du temps"
                          description="Ajoutez un nouvel emploi du temps">
                <EmployeeScheduleForm
                    employee={selectedEmployee ? selectedEmployee : undefined}
                    setClose={() => setOpenCreateEmployee(false)}/>
            </SideBarModal>
            <div className="px-4 sm:px-6 lg:px-8">
                <div
                    className="px-4 sm:px-6 lg:px-8 bg-white py-4 ring-1 ring-gray-200 mb-10 rounded-lg max-w-7xl mx-auto shadow ">
                    <h1 className="text-2xl font-semibold text-gray-900">{establishment.name}</h1>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Adresse: {establishment.adress}</p>
                            <p className="text-sm text-gray-500">Ville: {establishment.city}</p>
                            <p className="text-sm text-gray-500">Code postal: {establishment.zipCode}</p>

                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Pays: {establishment.country}</p>
                            <p className="text-sm text-gray-500">Téléphone: {establishment.phone}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 sm:px-6 lg:px-8 pb-10">
                <div className="block py-4 px-6 bg-gray-100 rounded-xl">
                    <nav className="flex space-x-4" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                type={'button'}
                                onClick={() => changeTab(tab)}
                                className={classNames(
                                    tab.current ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:text-gray-700',
                                    'rounded-md px-3 py-2 text-sm font-medium',
                                )}
                                aria-current={tab.current ? 'page' : undefined}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {tabs[1].current && (
                <Table
                    title="Services"
                    description="Liste des services offerts par l'établissement"
                    columns={[
                        {key: 'name', name: 'Nom'},
                        {key: 'duration', name: 'Durée'},
                        {key: 'price', name: 'Prix'},
                    ]}
                    rows={services as unknown as { [key: string]: string }[]}
                    buttonLabel="Ajouter un service"
                    onEdit={(s: unknown | Service) => {
                        openEditService(s as Service)
                    }}
                    onAdd={() => setOpenCreateService(true)}
                />)}

            {tabs[0].current && (
                <Table
                    title="Employés"
                    description="Liste des employés travaillant dans l'établissement"
                    columns={[
                        {key: 'firstName', name: 'Prénom'},
                        {key: 'lastName', name: 'Nom'},
                        {key: 'email', name: 'Email'},
                        {key: 'serviceName', name: 'Service'},
                        {key: 'category', name: 'Catégorie'},
                    ]}
                    rows={employees as unknown as { [key: string]: string }[]}
                    buttonLabel="Ajouter un employé"
                    onEdit={(e: unknown | Employee) => {
                        openEditEmployee(e as Employee)
                    }}
                    onSchedule={(e: unknown | Employee) => {
                        setSelectedEmployee(e as Employee)
                        setOpenCreateSchedule(true)
                    }}
                    onAdd={() => setOpenCreateEmployee(true)}
                />
            )}
        </div>
    )
}