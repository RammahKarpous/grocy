'use client';

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Input from "../form-fields/Input";
import Button from "../form-fields/Button";
import route from "@/utils/route";

export default function LoginForm() {
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(data.email, data.password);
            router.push(route('home'))
        } catch (error: any) {
            setError(
                error.response?.data?.message || 'Your username and/or password are invalid. Please try again.'
            );
        } finally {
            setLoading(false)
        }
    };
    
    return (
      <form onSubmit={handleSubmit} className="w-full mx-auto flex flex-col gap-4 items-start">
        <Input 
            id="email"
            type="email"
            label="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value})}
            required={true}
            disabled={loading}
        />

        <Input 
            id="password"
            type="password"
            label="Password"
            value={data.password}
            onChange={(e) => setData({...data, password: e.target.value})}
            required={true}
            disabled={loading}
        />

        <Button loading={loading} text="Login" />

        <p>Don't have an account yet? <a href="/register" className="text-amber-400 hover:text-amber-300 transition">Registere here</a></p>

        {error && (
            <p className="dark:text-red-500 text-red-600">{error}</p>
        )}
      </form>  
    )
}
