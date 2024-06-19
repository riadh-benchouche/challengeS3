const stats = [
    {label: 'Founded', value: '2021'},
    {label: 'Employees', value: '37'},
    {label: 'Countries', value: '12'},
    {label: 'Raised', value: '$25M'},
]

const people = [
    {
        name: 'Leslie Alexander',
        role: 'Experte en développement web',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More people...
]

const featuredTestimonial = {
    body: 'Integer id nunc sit semper purus. Bibendum at lacus ut arcu blandit montes vitae auctor libero. Hac condimentum dignissim nibh vulputate ut nunc. Amet nibh orci mi venenatis blandit vel et proin. Non hendrerit in vel ac diam.',
    author: {
        name: 'Brenna Goyette',
        handle: 'brennagoyette',
        imageUrl:
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80',
        logoUrl: 'https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg',
    },
}
const testimonials = [
    [
        [
            {
                body: 'Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.',
                author: {
                    name: 'Leslie Alexander',
                    handle: 'lesliealexander',
                    imageUrl:
                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
            },
            // More testimonials...
        ],
        [
            {
                body: 'Aut reprehenderit voluptatem eum asperiores beatae id. Iure molestiae ipsam ut officia rem nulla blanditiis.',
                author: {
                    name: 'Lindsay Walton',
                    handle: 'lindsaywalton',
                    imageUrl:
                        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
            },
            // More testimonials...
        ],
    ],
    [
        [
            {
                body: 'Voluptas quos itaque ipsam in voluptatem est. Iste eos blanditiis repudiandae. Earum deserunt enim molestiae ipsum perferendis recusandae saepe corrupti.',
                author: {
                    name: 'Tom Cook',
                    handle: 'tomcook',
                    imageUrl:
                        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
            },
            // More testimonials...
        ],
        [
            {
                body: 'Molestias ea earum quos nostrum doloremque sed. Quaerat quasi aut velit incidunt excepturi rerum voluptatem minus harum.',
                author: {
                    name: 'Leonard Krasner',
                    handle: 'leonardkrasner',
                    imageUrl:
                        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
            },
            // More testimonials...
        ],
    ],
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function ProviderDetails() {
    return (
        <>
            <div className="py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div
                        className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-4">
                            <div
                                className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
                                <img
                                    className="absolute inset-0 h-full w-full object-cover brightness-125 saturate-0"
                                    src="https://images.unsplash.com/photo-1630569267625-157f8f9d1a7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80"
                                    alt=""
                                />
                                <div className="absolute inset-0 bg-gray-900 mix-blend-multiply"/>
                                <div
                                    className="absolute left-1/2 top-1/2 -ml-16 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl"
                                    aria-hidden="true"
                                >
                                    <div
                                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-40"
                                        style={{
                                            clipPath:
                                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                        }}
                                    />
                                </div>
                                <figure className="relative isolate">
                                    <svg
                                        viewBox="0 0 162 128"
                                        fill="none"
                                        aria-hidden="true"
                                        className="absolute -left-2 -top-4 -z-10 h-32 stroke-white/20"
                                    >
                                        <path
                                            id="0ef284b8-28c2-426e-9442-8655d393522e"
                                            d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                                        />
                                        <use href="#0ef284b8-28c2-426e-9442-8655d393522e" x={86}/>
                                    </svg>
                                    <img src="https://tailwindui.com/img/logos/workcation-logo-white.svg" alt=""
                                         className="h-12 w-auto"/>
                                    <blockquote className="mt-6 text-xl font-semibold leading-8 text-white">
                                        <p>
                                            “Amet amet eget scelerisque tellus sit neque faucibus non eleifend. Integer
                                            eu
                                            praesent at a. Ornare
                                            arcu gravida natoque erat et cursus tortor.”
                                        </p>
                                    </blockquote>
                                    <figcaption className="mt-6 text-sm leading-6 text-gray-300">
                                        <strong className="font-semibold text-white">Judith Rogers,</strong> CEO at
                                        Workcation
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                        <div>
                            <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
                                <p className="text-base font-semibold leading-7 text-primary-600">À propos de nous</p>
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    Octopus IT Solutions
                                </h1>
                                <div className="max-w-xl">
                                    <p className="mt-6">
                                        Octupus IT Solutions est une entreprise de services informatiques qui propose
                                        des
                                        solutions informatiques pour les entreprises et les particuliers. Nous proposons
                                        des
                                        services de développement web, de développement mobile
                                    </p>
                                </div>
                            </div>
                            <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-900/10 pt-10 sm:grid-cols-4">
                                {stats.map((stat, statIdx) => (
                                    <div key={statIdx}>
                                        <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.label}</dt>
                                        <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900">{stat.value}</dd>
                                    </div>
                                ))}
                            </dl>
                            <div className="mt-10 flex">
                                <a href="/providers/1/book" className="text-base font-semibold leading-7 text-primary-600">
                                    Prennez rendez-vous avec nous <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary-600">Nos services</h2>
                    <div
                        className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                        <div
                            className="col-span-1 text-center py-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
                            <p className="text-sm font-semibold leading-6 text-gray-900">Développement web</p>
                        </div>
                        <div
                            className="col-span-1 text-center py-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
                            <p className="mt-2 text-sm font-semibold leading-6 text-gray-900">Cybersécurité</p>
                        </div>
                        <div
                            className="col-span-1 text-center py-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
                            <p className="mt-2 text-sm font-semibold leading-6 text-gray-900">Développment Mobile</p>
                        </div>
                        <div
                            className="col-span-1 text-center py-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
                            <p className="mt-2 text-sm font-semibold leading-6 text-gray-900">Conseil en
                                informatique</p>
                        </div>
                        <div
                            className="col-span-1 text-center py-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
                            <p className="mt-2 text-sm font-semibold leading-6 text-gray-900">Gestion de projet</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-24 mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Notre équipe</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Notre équipe est composée d'experts en informatique qui sont prêts à vous aider à résoudre vos
                        problèmes informatiques.
                    </p>
                </div>
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                    {people.map((person) => (
                        <li key={person.name}>
                            <div className="flex items-center gap-x-6">
                                <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt=""/>
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                                    <p className="text-sm font-semibold leading-6 text-primary-600">{person.role}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="relative isolate">
                <div
                    className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
                    aria-hidden="true"
                >
                    <div
                        className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:ml-0 xl:mr-[calc(50%-12rem)]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-xl text-center">
                        <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary-600">Témoignages</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Ce que nos clients disent de nous
                        </p>
                    </div>
                    <div
                        className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
                        <figure
                            className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
                            <blockquote
                                className="p-6 text-lg font-semibold leading-7 tracking-tight text-gray-900 sm:p-12 sm:text-xl sm:leading-8">
                                <p>{`“${featuredTestimonial.body}”`}</p>
                            </blockquote>
                            <figcaption
                                className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
                                <img
                                    className="h-10 w-10 flex-none rounded-full bg-gray-50"
                                    src={featuredTestimonial.author.imageUrl}
                                    alt=""
                                />
                                <div className="flex-auto">
                                    <div className="font-semibold">{featuredTestimonial.author.name}</div>
                                    <div className="text-gray-600">{`@${featuredTestimonial.author.handle}`}</div>
                                </div>
                                <img className="h-10 w-auto flex-none" src={featuredTestimonial.author.logoUrl} alt=""/>
                            </figcaption>
                        </figure>
                        {testimonials.map((columnGroup, columnGroupIdx) => (
                            <div key={columnGroupIdx} className="space-y-8 xl:contents xl:space-y-0">
                                {columnGroup.map((column, columnIdx) => (
                                    <div
                                        key={columnIdx}
                                        className={classNames(
                                            (columnGroupIdx === 0 && columnIdx === 0) ||
                                            (columnGroupIdx === testimonials.length - 1 && columnIdx === columnGroup.length - 1)
                                                ? 'xl:row-span-2'
                                                : 'xl:row-start-1',
                                            'space-y-8',
                                        )}
                                    >
                                        {column.map((testimonial) => (
                                            <figure
                                                key={testimonial.author.handle}
                                                className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                                            >
                                                <blockquote className="text-gray-900">
                                                    <p>{`“${testimonial.body}”`}</p>
                                                </blockquote>
                                                <figcaption className="mt-6 flex items-center gap-x-4">
                                                    <img className="h-10 w-10 rounded-full bg-gray-50"
                                                         src={testimonial.author.imageUrl} alt=""/>
                                                    <div>
                                                        <div className="font-semibold">{testimonial.author.name}</div>
                                                        <div
                                                            className="text-gray-600">{`@${testimonial.author.handle}`}</div>
                                                    </div>
                                                </figcaption>
                                            </figure>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}