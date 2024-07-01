import SideBarModal from "@/components/SideBarModal.tsx";
import CompanyForm from "@/pages/admin/forms/CompanyForm.tsx";
import {useEffect, useState} from "react";
import Table from "@/components/Table.tsx";
import axiosInstance from "@/utils/axiosInstance.ts";
import {EstablishmentType} from "@/types/establishment.ts";

export default function OrganizationEstablishment() {
    const [openCreate, setOpenCreate] = useState(false)
    const [establishments, setEstablishments] = useState<EstablishmentType[]>([])
    const id = localStorage.getItem('userId')

    useEffect(() => {
        axiosInstance.get(`/api/companies/${id}`).then(res => {
            setEstablishments(res.data.establishments)
        })
    }, [id])

    return (
        <>
            <SideBarModal open={openCreate} setOpen={setOpenCreate} title="Ajouter une entreprise"
                          description="Ajoutez une nouvelle entreprise"
                          handleSubmit={(e) => e.preventDefault()}>
                <CompanyForm type="create"/>
            </SideBarModal>
            <Table
                title="Établissements"
                description="Une liste de toutes les établissements de votre compte, y compris leur nom, siret, kbis, statut, adresse, forme juridique et date de création."
                columns={[
                    {key: 'name', name: 'Nom'},
                    {key: 'adress', name: 'Adresse'},
                    {key: 'city', name: 'Ville'},
                    {key: 'zipCode', name: 'Code postal'},
                    {key: 'country', name: 'Pays'},
                    {key: 'phone', name: 'Téléphone'},
                ]}
                rows={establishments as unknown as { [key: string]: string }[]}
                onEdit={() => setOpenCreate(true)}
                onAdd={() => setOpenCreate(true)}
                hrefView="/organization/establishment/"
                buttonLabel="Ajouter un établissement"
            />
        </>
    )
}