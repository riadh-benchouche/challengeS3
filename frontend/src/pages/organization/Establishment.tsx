import SideBarModal from "@/components/SideBarModal.tsx";
import CompanyForm from "@/pages/admin/forms/CompanyForm.tsx";
import {useState} from "react";
import Table from "@/components/Table.tsx";

const establishments = [
    {
        name: "ABC Développement",
        kbis: "2019B01234",
        status: "Actif",
        date_creation: "2019-01-15"
    },
    {
        name: "Techno Solutions",
        kbis: "2018C05678",
        status: "Actif",
        date_creation: "2018-10-10"
    },
    {
        name: "Éco Vert",
        kbis: "2020D03456",
        status: "En Attente",
        date_creation: "2020-03-05"
    }
]
export default function OrganizationEstablishment() {
    const [openCreate, setOpenCreate] = useState(false)
    return (
        <>
            <SideBarModal open={openCreate} setOpen={setOpenCreate} title="Ajouter une entreprise"
                          description="Ajoutez une nouvelle entreprise"
                          handleSubmit={(e) => e.preventDefault()}>
                <CompanyForm type="create"/>
            </SideBarModal>
            <Table
                title="Entreprises"
                description="Une liste de toutes les entreprises de votre compte, y compris leur nom, siret, kbis, statut, adresse, forme juridique et date de création."
                columns={[
                    {key: 'name', name: 'Nom'},
                    {key: 'kbis', name: 'Kbis'},
                    {key: 'status', name: 'Statut'},
                    {key: 'date_creation', name: 'Date de création'},
                ]}
                rows={establishments}
                onEdit={() => setOpenCreate(true)}
                onAdd={() => setOpenCreate(true)}
                buttonLabel="Ajouter une entreprise"
            />
        </>
    )
}