'use client';

import React, { createContext, useContext, useState, useEffect } from "react";
import authService, { User } from '@/lib/auth';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children}: { children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, [])

    const checkAuth = async() => {
        try {
            const response = await authService.getUser();
            setUser(response.data);
        } catch (error) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    };

    const login = async (email: string, password: string) => {
        const response = await authService.login({email, password});
        setUser(response.data.user);
    };

    const register = async (
        name: string,
        email: string,
        password: string,
        password_confirmation: string
    ) => {
        const response = await authService.register({
            name,
            email,
            password,
            password_confirmation
        });
        setUser(response.data.user);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null)
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, checkAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must me used within an AuthProvider')
    }

    return context;
}