import Button from "../../components/Button.tsx";
import Input from "../../components/Input.tsx";
import {useState} from "react";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <>
            <div className="mx-auto w-full max-w-sm lg:w-96">
                <div>
                    <img
                        className="h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=primary&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Connectez-vous à votre compte
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        Vous n'avez pas de compte ?{' '}
                        <a href="/register" className="font-semibold text-primary-600 hover:text-primary-500">
                            Créer un compte
                        </a>
                    </p>
                </div>

                <div className="mt-10">
                    <div>
                        <form action="#" method="POST" className="space-y-6">
                            <div>
                                <Input label="Email"
                                       type="email"
                                       placeholder="exemple@exemple.com"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <Input label="Mot de passe"
                                       type="password"
                                       placeholder="********"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center justify-end">
                                <div className="text-sm leading-6">
                                    <a href="#"
                                       className="font-semibold text-primary-600 hover:text-primary-500">
                                        Mot de passe oublié ?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <Button onClick={() => {
                                }} className="w-full">
                                    Connexion
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}