import {ChangeEvent} from "react";

export default function TextArea({label, placeholder, value, onChange, required = true}: {
    label: string,
    placeholder: string,
    value: string | number,
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    required?: boolean
}) {
    return (
        <div>
            <label htmlFor={label}
                   className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
        <textarea
            rows={4}
            name={label}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            id={label}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            defaultValue={value as string}
        />
            </div>
        </div>
    )
}