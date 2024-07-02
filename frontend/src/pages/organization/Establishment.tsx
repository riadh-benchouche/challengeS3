import SideBarModal from "@/components/SideBarModal.tsx";
import {useEffect, useState} from "react";
import Table from "@/components/Table.tsx";
import axiosInstance from "@/utils/axiosInstance.ts";
import {EstablishmentType} from "@/types/establishment.ts";
import EstablishmentForm from "@/pages/organization/forms/EstablishmentForm.tsx";

export default function OrganizationEstablishment() {
    const [openCreate, setOpenCreate] = useState(false)
    const [establishments, setEstablishments] = useState<EstablishmentType[]>([])
    const [selectedEstablishment, setSelectedEstablishment] = useState<EstablishmentType | null>(null)
    const id = localStorage.getItem('userId')

    useEffect(() => {
        axiosInstance.get(`/api/companies/${id}`).then(res => {
            setEstablishments(res.data.establishments)
        })
    }, [id, openCreate])

    const openEdit = (establishment: EstablishmentType) => {
        setSelectedEstablishment(establishment)
        setOpenCreate(true)
    }

    return (
        <>
            <SideBarModal open={openCreate} setOpen={setOpenCreate} title="Ajouter une entreprise"
                          description="Ajoutez une nouvelle entreprise">
                <EstablishmentForm type={selectedEstablishment ? 'edit' : 'create'}
                                   establishment={selectedEstablishment ? selectedEstablishment : undefined}
                                   onClose={() => setOpenCreate(false)}/>
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
                onEdit={(establishment: unknown | EstablishmentType) => openEdit(establishment as EstablishmentType)}
                onAdd={() => setOpenCreate(true)}
                hrefView="/organization/establishment/"
                buttonLabel="Ajouter un établissement"
            />
        </>
    )
}