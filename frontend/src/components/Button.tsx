export default function Button({children, onClick, className, color = 'primary', type = "button"}: {
    children: string,
    onClick?: () => void,
    className?: string,
    color?: "primary" | "secondary" | "danger" | "gray",
    type?: "button" | "submit" | "reset"
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 
            shadow-sm ${'bg-' + color + '-600 hover:bg-' + color + '-500'} ${className}`}
        >
            {children}
        </button>
    )
}