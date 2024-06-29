import Input from "@/components/Input.tsx";
import {useState} from "react";

export default function EmployeeForm({type = 'create', id}: { type: 'create' | 'edit', id?: string }) {

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

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
                            label="First Name"
                            type="text"
                            placeholder="John"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div>
                        <Input
                            label="Last Name"
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
                            label="Password"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required={true}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}