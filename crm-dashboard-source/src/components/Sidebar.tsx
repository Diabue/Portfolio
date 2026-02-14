import React from 'react';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    CheckSquare,
    Settings,
    LogOut,
    Mail,
    LucideIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SidebarProps } from '../types';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface NavItem {
    name: string;
    icon: LucideIcon;
}

import { useDashboard } from '../context/DashboardContext';

const Sidebar: React.FC<SidebarProps> = ({ active, setActive }) => {
    const { userProfile } = useDashboard();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error);
            alert('Error logging out');
        } else {
            navigate('/login');
        }
    };
    const navItems: NavItem[] = [
        { name: 'Home', icon: LayoutDashboard },
        { name: 'Mails', icon: Mail },
        { name: 'Customers', icon: Users },
        { name: 'Deals', icon: Briefcase },
        { name: 'Tasks', icon: CheckSquare },
        { name: 'Settings', icon: Settings },
    ];

    return (
        <div className="h-full w-64 bg-surface border-r border-border flex flex-col">
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full opacity-80" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">Dashboard</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setActive(item.name)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${active === item.name
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'text-text-secondary hover:bg-surface-highlight hover:text-white'
                            }`}
                    >
                        <item.icon size={20} strokeWidth={2} className={active === item.name ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'} />
                        <span className="font-medium">{item.name}</span>
                        {active === item.name && (
                            <motion.div
                                layoutId="activeIndicator"
                                className="absolute left-0 w-1 h-8 bg-white rounded-r-full opacity-20"
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-border">
                <div
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-highlight cursor-pointer transition-colors"
                    title="Click to Logout"
                >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent overflow-hidden border-2 border-surface flex items-center justify-center relative">
                        {userProfile.avatar ? (
                            <img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <Users size={20} className="text-white opacity-80" />
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{userProfile.name}</p>
                        <p className="text-xs text-text-secondary truncate">{userProfile.role}</p>
                    </div>
                    <LogOut size={16} className="text-text-secondary hover:text-white" />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
