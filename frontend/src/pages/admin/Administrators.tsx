import {useState} from 'react'
import SideBarModal from "@/components/SideBarModal.tsx";
import AdminForm from "@/pages/admin/forms/AdminForm.tsx";
import Table from "@/components/Table.tsx";

const people = [
    {name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Administrator'},
    // More people...
]

export default function Administrators() {
    const [openCreate, setOpenCreate] = useState(false)

    return (
        <>
            <SideBarModal open={openCreate} setOpen={setOpenCreate} title="Add user"
                          description="Add a new user to your account." handleSubmit={(e) => e.preventDefault()}>
                <AdminForm type='create'/>
            </SideBarModal>
            <Table title="Employés"
                   description="Liste de tous les employes de votre organization, y compris leur nom, titre, email et rôle."
                   columns={[
                       {key: 'name', name: 'Nom'},
                       {key: 'title', name: 'Title'},
                       {key: 'email', name: 'Email'},
                       {key: 'role', name: 'Role'},
                   ]}
                   rows={people}
                   buttonLabel="Ajouter un Employé"
                   onEdit={() => setOpenCreate(true)}
                   onAdd={() => setOpenCreate(true)}
            />
        </>

    )
}