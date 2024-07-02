import {Dispatch, SetStateAction} from "react";

export default function Table({
                                  title,
                                  description,
                                  columns,
                                  rows,
                                  buttonLabel,
                                  onEdit,
                                  onAdd,
                                  hrefView,
                                  showView = true
                              }:
                                  {
                                      title: string,
                                      description: string,
                                      columns: { key: string, name: string }[]
                                      rows: { [key: string]: string }[],
                                      buttonLabel: string,
                                      onEdit: Dispatch<SetStateAction<{ [key: string]: string }>>
                                      onAdd: Dispatch<SetStateAction<boolean>>
                                      hrefView?: string
                                      showView?: boolean
                                  }) {
    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">{title}</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            {description}
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            onClick={() => onAdd(true)}
                            className="block rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                        >
                            {buttonLabel}
                        </button>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        {columns.map((column) => (
                                            <th key={column.key}
                                                scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                {column.name}
                                            </th>
                                        ))}
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">View</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                    {rows.map((row) => (
                                        <tr key={row.id}>
                                            {columns.map((column) => (
                                                <td key={row[column.key]}
                                                    className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {row[column.key]}
                                                </td>
                                            ))}
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-2">
                                                <button
                                                    onClick={() => onEdit(row)}
                                                    className="text-primary-600 hover:text-primary-900">
                                                    Modifier<span className="sr-only">, {row.name}</span>
                                                </button>
                                                {(showView && hrefView) && <a
                                                    href={hrefView + row.id}
                                                    className="text-primary-600 hover:text-primary-900">
                                                    Voir<span className="sr-only">, {row.name}</span>
                                                </a>}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}