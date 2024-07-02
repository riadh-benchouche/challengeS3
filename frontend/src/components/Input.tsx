import {ChangeEvent} from "react";

export default function Input({
                                  label,
                                  type,
                                  placeholder,
                                  value,
                                  onChange,
                                  className,
                                  required = true,
                                  name,
                                  disabled = false,
                                  min,
                                  max
                              }: {
    label?: string,
    type: string,
    placeholder: string,
    value: string | number,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    className?: string
    required?: boolean
    disabled?: boolean
    name?: string
    min?: number
    max?: number
}) {
    return (
        <div className="w-full">
            <label htmlFor={label}
                   className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={label}
                    name={label ? label : name}
                    type={type}
                    autoComplete="off"
                    min={min}
                    max={max}
                    disabled={disabled}
                    required={required}
                    value={value}
                    onChange={onChange}
                    className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 ${className}`}
                    placeholder={placeholder}
                />
            </div>
        </div>
    )
}