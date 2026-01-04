import LoginForm from "@/components/auth/LoginForm";

export default function Login() {
    return (
        <div className="flex items-center justify-center h-screen bg-">
            <div className="max-w-xl w-full flex flex-col gap-5 bg-neutral-100 border-neutral-200/20 dark:bg-neutral-900 p-8 rounded-xl border dark:border-neutral-600/20">
                <h1 className="text-4xl font-bold">Login</h1>
                
                <LoginForm />
            </div>
        </div>
    )
}
