import Input from "@/components/Input.tsx";
import React, {useEffect, useState} from "react";
import Button from "@/components/Button.tsx";
import axiosInstance from "@/utils/axiosInstance.ts";
import {useLocation} from "react-router-dom";
import {Employee} from "@/types/employe.ts";

export default function EmployeeForm({type = 'create', setClose, employee}: {
    type: 'create' | 'edit',
    setClose: () => void
    employee?: Employee
}) {

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const location = useLocation()
    const establishmentId = location.pathname.split("/").pop()

    useEffect(() => {
        if (employee) {
            setFirstName(employee.firstName)
            setLastName(employee.lastName)
            setEmail(employee.email)
            setCategory(employee.category)
        }
    }, [employee])
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (type === 'create') {
            axiosInstance.post('/api/employees', {
                establishment: '/api/establishments/' + establishmentId,
                firstName,
                lastName,
                email,
                category
            }).then(() => {
                setClose()
            }).catch(err => {
                console.log(err)
            })
        }
        if (type === 'edit' && employee) {
            axiosInstance.patch(`/api/employees/${employee?.id}`, {
                establishment: '/api/establishments/' + establishmentId,
                firstName,
                lastName,
                email,
                category
            }).then(() => {
                setClose()
            }).catch(err => {
                console.log(err)
            })
        }
    }

    return (
        <>
            <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                  onSubmit={handleSubmit}>
                <div className="h-0 flex-1 overflow-y-auto">
                    <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6 py-8">
                            <div className="flex flex-1 flex-col">
                                <div className="space-y-6 mt-auto">
                                    <div>
                                        <Input
                                            label="Prénom"
                                            type="text"
                                            placeholder="John"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required={true}
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            label="Nom"
                                            type="text"
                                            placeholder="Doe"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required={true}
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            label="Email"
                                            type="email"
                                            placeholder="example@test.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required={true}
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            label="Catégorie"
                                            type="text"
                                            placeholder="Catégorie"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            required={true}
                                        />
                                    </div>
                                </div>
                                <div className="flex space-x-2 mt-8">
                                    <Button
                                        type="submit"
                                        primary={true}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}