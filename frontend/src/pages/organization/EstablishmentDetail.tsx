import Table from "@/components/Table.tsx";
import {useState} from "react";
import SideBarModal from "@/components/SideBarModal.tsx";
import ServiceForm from "@/pages/organization/forms/ServiceForm.tsx";

const services = [
    {
        name: "Service 1",
        description: "Description 1",
        duration: "1h",
        price: "50€"
    },
    {
        name: "Service 2",
        description: "Description 2",
        duration: "2h",
        price: "100€"
    },
    {
        name: "Service 3",
        description: "Description 3",
        duration: "3h",
        price: "150€"
    }
]

const establishment = {
    name: "ABC Développement",
    siret: "123456789",
    kbis: "2019B01234",
    status: "Actif",
    date_creation: "2019-01-15"
}

export default function EstablishmentDetail() {
    const [openCreate, setOpenCreate] = useState(false)
    return (
        <div>
            <SideBarModal open={openCreate} setOpen={setOpenCreate} title="Ajouter un service"
                          description="Ajoutez un nouveau service"
                          handleSubmit={(e) => e.preventDefault()}>
                <ServiceForm type={'create'}/>{ /* TODO: Add the id of the establishment */}
            </SideBarModal>
            <div className="px-4 sm:px-6 lg:px-8">
                <div
                    className="px-4 sm:px-6 lg:px-8 bg-white py-4 ring-1 ring-gray-200 mb-10 rounded-lg max-w-7xl mx-auto shadow ">
                    <h1 className="text-2xl font-semibold text-gray-900">{establishment.name}</h1>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Siret: {establishment.siret}</p>
                            <p className="text-sm text-gray-500">Kbis: {establishment.kbis}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Statut: {establishment.status}</p>
                            <p className="text-sm text-gray-500">Date de création: {establishment.date_creation}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Table
                title="Services"
                description="Liste des services offerts par l'établissement"
                columns={[
                    {key: 'name', name: 'Nom'},
                    {key: 'description', name: 'Description'},
                    {key: 'duration', name: 'Durée'},
                    {key: 'price', name: 'Prix'},
                ]}
                rows={services}
                buttonLabel="Ajouter un service"
                onEdit={() => setOpenCreate(true)}
                onAdd={() => setOpenCreate(true)}
            />
        </div>
    )
}