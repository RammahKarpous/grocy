interface Button {
    loading: boolean;
    text: string
}

export default function Button({ loading, text }: Button) {
    return (
        <button type="submit" className="py-4 px-8 rounded-lg bg-amber-500 border-0 text-black">
            {loading ? "Logging in" : text}
        </button>
    )
}
