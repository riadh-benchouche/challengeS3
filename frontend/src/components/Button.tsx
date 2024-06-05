export default function Button({children, onClick, className, type = "button"}: {
    children: string,
    onClick: () => void,
    className?: string,
    type?: "button" | "submit" | "reset"
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 ${className}`}
        >
            {children}
        </button>
    )
}