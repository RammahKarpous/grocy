interface Input {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: any) => void;
    required?: boolean;
    className?: string;
    disabled?: boolean;
    errors?: string[]
}

export default function Input({ id, label, type, value, onChange, required = false, className, disabled = false, errors }: Input) {
    return (
        <div className="flex flex-col gap-3 w-full">
            <label htmlFor={id}>{label}</label>
            <input 
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                className={`p-4 rounded-lg border-black bg-white text-black ${className}`}
                disabled={disabled}
            />

            {errors && (
                <p>{errors}</p>
            )}
        </div>
    )
}
