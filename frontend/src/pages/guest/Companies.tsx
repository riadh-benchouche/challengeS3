import {useEffect, useState} from "react";
import axiosInstance from "@/utils/axiosInstance.ts";
import {Company} from "@/types/company.ts";

export default function Companies() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        axiosInstance.get('/api/companies')
            .then((res) => {
                setCompanies(res.data['hydra:member']);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-28">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Trouvez votre expert IT</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    Explorez les experts informatiques les plus qualifiés et les plus expérimentés pour vous aider à
                    résoudre vos problèmes informatiques.
                </p>
            </div>
            {loading ? (
                <div className="mt-16 flex justify-center">
                    <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary-600 motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-primary-600"
                        role="status">
                          <span
                              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                          >Loading...</span>
                    </div>
                </div>
            ) : (
                <div
                    className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {companies.map((company: Company) => (
                        <article key={company.id} className="flex flex-col items-start justify-between">
                            <div className="relative w-full">
                                <img
                                    src={company.image}
                                    alt=""
                                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                />
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"/>
                            </div>
                            <div className="max-w-xl">
                                <div className="mt-8 flex items-center gap-x-4 text-xs">
                                    <time dateTime="2020-03-16" className="text-gray-500">
                                        {company.foundationDate}
                                    </time>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                        <a href={"/companies/" + company.id}>
                                            <span className="absolute inset-0"/>
                                            {company.name}
                                        </a>
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{company.description}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}