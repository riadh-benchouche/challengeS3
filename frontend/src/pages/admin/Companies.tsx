import SideBarModal from "@/components/SideBarModal.tsx";
import {useEffect, useState} from "react";
import CompanyForm from "@/pages/admin/forms/CompanyForm.tsx";
import Table from "@/components/Table.tsx";
import axiosInstance from "@/utils/axiosInstance";
import {Company} from "@/types/company.ts";

export default function Companies() {
    const [openCreate, setOpenCreate] = useState(false)
    const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(undefined)
    const [companies, setCompanies] = useState([])

    useEffect(() => {
        axiosInstance.get('/api/companies').then(res => {
            setCompanies(res.data['hydra:member'])
        })
    }, [openCreate])

    const openEdit = (company: Company) => {
        setSelectedCompany(company)
        setOpenCreate(true)
    }
    return (
        <>
            <SideBarModal open={openCreate} setOpen={setOpenCreate} title="Ajouter une entreprise"
                          description="Ajoutez une nouvelle entreprise">
                <CompanyForm type={selectedCompany ? 'edit' : 'create'}
                             company={selectedCompany ? selectedCompany : undefined}
                             onClose={() => { 
                                setOpenCreate(false)
                                setSelectedCompany(undefined)
                            }}/>
            </SideBarModal>
            <Table title="Entreprises"
                   description="Une liste de toutes les entreprises de votre compte, y compris leur nom, siret, kbis, statut, adresse, forme juridique et date de création."
                   columns={[
                       {key: 'image', name: 'Image'},
                       {key: 'name', name: 'Nom'},
                       {key: 'email', name: 'Email'},
                       {key: 'country', name: 'Pays'},
                       {key: 'kbis', name: 'Kbis'},
                       {key: 'status', name: 'Statut'},
                       {key: 'foundationDate', name: 'Date de création'},
                   ]}
                   rows={companies}
                   onEdit={(company: unknown | Company) => {
                       openEdit(company as Company)
                   }}
                   onAdd={() => setOpenCreate(true)}
                   buttonLabel="Ajouter une entreprise"
            />
        </>
    )
}