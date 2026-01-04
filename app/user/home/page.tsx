"use client";

import { useAuth } from '@/contexts/AuthContext'

export default function Home() {

    const { user, loading } = useAuth();

    return (
        <div>
            <p>{user?.name}</p>
        </div>
    )
}
