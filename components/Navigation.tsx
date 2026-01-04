"use client";

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation';
import Home from './icons/Home';
import Logout from './icons/Logout';
import List from './icons/List';
import Edit from './icons/Edit';
import Cog from './icons/Cog';
import route from '@/utils/route';

export default function Navigation() {
    const { logout } = useAuth();
    const router = useRouter();

    const iconStyles = 'group-hover:stroke-black transition-all duration-300';
    const links = [
        { name: 'Home', icon: <Home className={iconStyles} />, url: route('home') },
        { name: "Shopping List", icon: <List className={iconStyles} />, url: route('shopping-list') },
        { name: "Meal plans", icon: <Edit className={iconStyles} />, url: route('meal-plans') },
        { name: "settings", icon: <Cog className={iconStyles} />, url: route('settings')}
    ];

    const linkStyles = `dark:text-white text-black transition-all duration-300 hover:bg-orange-500 group hover:text-black rounded-full flex gap-3 px-10 py-5 whitespace-nowrap`;

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/login');
        } catch (error) {
            console.error('Logout failed: ', error);
        }
    }

    return (
        <nav className='absolute left-1/2 -translate-x-1/2 bottom-10 dark:bg-neutral-900 dark:border-neutral-800 bg-amber-100 border border-amber-500 rounded-full'>
            <ul className='flex items-center justify-center'>
                {links.map((link, index) => (
                    <li key={index}><a className={`${linkStyles} ${link.name === 'Home' ? 'items-end' : 'items-center'}`} href={link.url}>{link.icon}{link.name}</a></li>
                ))}

                <li>
                    <button className={`${linkStyles} cursor-pointer dark:text-red-500 text-red-400! hover:bg-red-500/30 bg-red-500/15`} onClick={handleLogout}>
                        <Logout />Logout
                    </button>
                </li>
            </ul>
        </nav>
    )
}
