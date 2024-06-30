import Input from "@/components/Input.tsx";
import {useState} from "react";

export default function ServiceForm({type = 'create', id}: { type: 'create' | 'edit', id?: string }) {

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [duration, setDuration] = useState<string>('')
    const [price, setPrice] = useState<string>('')

    if (type === 'edit' && !id) {
        return null
    }

    if (type === 'edit' && id) {
        // Fetch the admin by id
        // const admin = fetchAdminById(id)
    }

    return (
        <>
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
                        <Input
                            label="Description"
                            type="text"
                            placeholder="Doe"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div>
                        <Input
                            label="Durée"
                            type="text"
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
            </div>
        </>
    )
}