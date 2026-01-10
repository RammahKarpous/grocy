import { FormWrapperProps } from '@/types/forms'

export default function FormWrapper(
    {className, onSubmit, title, children, width = "medium"}: FormWrapperProps
) {

    const formWidth = {
        small: "w-full max-w-3xl",
        medium: "w-full max-w-5xl",
        large: "w-full max-w-7xl",
        full: "w-full"
    }

    return (
        <form onSubmit={onSubmit} className={`mx-auto flex flex-col gap-5 items-start ${className} ${formWidth[width]}`}>
            <h2 className="text-3xl font-bold">{title}</h2>

            {children}
        </form>
    )
}
