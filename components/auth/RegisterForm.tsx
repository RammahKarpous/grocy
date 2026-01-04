"use client"

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Input from '../form-fields/Input';
import Button from '../form-fields/Button';
import route from '@/utils/route';

export default function RegisterForm() {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrors({});
        setLoading(false);

        try {
            await register(data.name, data.email, data.password, data.password_confirmation);
            router.push(route('home'));
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setErrors(error.respone.data.errors)
            } else {
                setErrors({ general: [error.respone?.data?.message || 'Registration dailed'] });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full mx-auto flex flex-col gap-4 items-start">
            {errors.general && (
                <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded">
                    {errors.general[0]}
                </div>
            )}

            <Input 
                id="name"
                type="name"
                label="Name"
                value={data.name}
                onChange={(e) => setData({...data, name: e.target.value})}
                required={true}
                disabled={loading}
                errors={errors && errors.name}
            />

            <Input 
                id="email"
                type="email"
                label="Email"
                value={data.email}
                onChange={(e) => setData({...data, email: e.target.value})}
                required={true}
                disabled={loading}
                errors={errors && errors.email}
            />

            <Input 
                id="password"
                type="password"
                label="Password"
                value={data.password}
                onChange={(e) => setData({...data, password: e.target.value})}
                required={true}
                disabled={loading}
                errors={errors && errors.password}
            />

            <Input 
                id="password_confirmation"
                type="password"
                label="Confirm password"
                value={data.password_confirmation}
                onChange={(e) => setData({...data, password_confirmation: e.target.value})}
                required={true}
                disabled={loading}
                errors={errors && errors.password_confirmation}
            />

            <Button loading={loading} text='Register' />

            <p>Already have an account? <a href="/login" className="text-amber-400 hover:text-amber-300 transition">Login here</a></p>
        </form>
    )
}
