import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';

const Header: React.FC = () => {
    return (
        <header className="h-20 px-8 flex items-center justify-between sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
            {/* Search */}
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search for deals, customers, or tasks..."
                        className="w-full bg-surface border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-text-secondary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 ml-4">
                <button className="relative p-2.5 text-text-secondary hover:text-white hover:bg-surface rounded-xl transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-background"></span>
                </button>

                <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-primary/25 transition-all active:scale-95">
                    <Plus size={18} />
                    <span>Create New</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
