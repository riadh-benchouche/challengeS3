export default function Button({children, onClick, className, type = "button", primary = true, disabled = false}: {
    children: string,
    onClick?: () => void,
    className?: string,
    type?: "button" | "submit" | "reset"
    primary?: boolean
    disabled?: boolean
}) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 
            shadow-sm ${primary ? 'text-white' : 'text-gray-800'} ${primary ? 'bg-primary-500' : 'bg-gray-200'} 
            ${primary ? 'hover:bg-primary-600' : 'hover:bg-gray-300'} ${className}`}
        >
            {children}
        </button>
    )
}