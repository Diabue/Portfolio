import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { MessageSquare, LogOut, User } from 'lucide-react';

export default function DashboardLayout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.removeItem('demo_authed');
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-zinc-950 text-white overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-800 flex flex-col bg-zinc-900/50 backdrop-blur-sm">
                <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
                    <div className="h-10 w-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
                        :)
                    </div>
                    <div>
                        <h2 className="font-bold font-Orbitron tracking-wider text-sm">W&A DETAILING</h2>
                        <p className="text-xs text-zinc-500">Dashboard</p>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <div className="flex items-center gap-3 px-4 py-3 bg-yellow-500/10 text-yellow-500 rounded-xl border border-yellow-500/20 cursor-pointer transition-all">
                        <MessageSquare size={20} />
                        <span className="font-medium">Wiadomości</span>
                    </div>
                    {/* Add more nav items here if needed */}
                </nav>

                <div className="p-4 border-t border-zinc-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Wyloguj</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-grid-pattern">
                <div className="p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
