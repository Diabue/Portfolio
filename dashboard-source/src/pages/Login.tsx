import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader2 } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock Login
        setTimeout(() => {
            localStorage.setItem('demo_authed', 'true');
            navigate('/');
        }, 800);
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-white mb-2 font-Orbitron tracking-wider">W&A DASHBOARD</h1>
                    <p className="text-zinc-500">Zaloguj się aby zarządzać wiadomościami</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-yellow-500/50 outline-none transition-all"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Hasło"
                            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-yellow-500/50 outline-none transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded-xl transition-all shadow-lg shadow-yellow-500/10 flex items-center justify-center gap-2 uppercase tracking-wider"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Zaloguj się'}
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-zinc-600 text-sm">Problemy z logowaniem?</p>
                    <a href="#" className="text-yellow-500 font-bold text-sm mt-1 hover:underline">
                        Skontaktuj się z administratorem
                    </a>
                </div>
            </div>
        </div>
    );
}
