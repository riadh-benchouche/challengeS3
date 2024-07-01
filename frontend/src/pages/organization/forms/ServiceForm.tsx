import Input from "@/components/Input.tsx";
import React, {useEffect, useState} from "react";
import axiosInstance from "@/utils/axiosInstance.ts";
import {useLocation} from "react-router-dom";
import {Service} from "@/types/employe.ts";
import Button from "@/components/Button.tsx";
import TextArea from "@/components/TextArea.tsx";

export default function ServiceForm({type = 'create', setClose, service}: {
    type: 'create' | 'edit',
    setClose: () => void,
    service?: Service | null
}) {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [duration, setDuration] = useState<number | string>(0)
    const [price, setPrice] = useState<number | string>(0)
    const location = useLocation()
    const establishmentId = location.pathname.split("/").pop()

    useEffect(() => {
        if (service) {
            setName(service.name)
            setDescription(service.description)
            setDuration(service.duration)
            setPrice(service.price)
        }
    }, [service])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (type === 'create') {
            axiosInstance.post('/api/services', {
                establishment: '/api/establishments/' + establishmentId,
                name,
                description,
                duration: Number(duration),
                price: Number(price)
            }).then(() => {
                setClose()
            }).catch(err => {
                console.log(err)
            })
        }
        if (type === 'edit' && service) {
            axiosInstance.patch(`/api/services/${service.id}`, {
                establishment: '/api/establishments/' + establishmentId,
                name,
                description,
                duration: Number(duration),
                price: Number(price)
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
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="space-y-6">
                                    <div>
                                        <Input
                                            label="Nom"
                                            type="text"
                                            placeholder="Service 1"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required={true}
                                        />
                                    </div>
                                    <div>
                                        <TextArea
                                            label="Description"
                                            placeholder="Description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required={true}
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            label="Durée"
                                            type="number"
                                            placeholder="1h"
                                            value={duration}
                                            onChange={(e) => setDuration(e.target.value)}
                                            required={true}
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            label="Prix"
                                            type="text"
                                            placeholder="50€"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
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