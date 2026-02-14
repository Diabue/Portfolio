import React, { useState } from 'react';
import { Trash2, AlertTriangle, CheckCircle, User, Palette, Globe, Key, Bell } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

const Settings: React.FC = () => {
    const {
        resetDashboard, clearAllTasks, autoCleanupTasks, toggleAutoCleanup,
        userProfile, updateUserProfile, appSettings, updateAppSettings // Get new context
    } = useDashboard();

    const [showConfirm, setShowConfirm] = useState(false);
    const [showTaskConfirm, setShowTaskConfirm] = useState(false);
    const [resetDone, setResetDone] = useState(false);

    const handleReset = () => {
        resetDashboard();
        setResetDone(true);
        setShowConfirm(false);

        // Hide success message after 3 seconds
        setTimeout(() => {
            setResetDone(false);
        }, 3000);
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto pb-10">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Settings</h1>
            </div>

            {/* Profile Section */}
            <div className="glass-card p-6 space-y-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <User size={20} className="text-primary" />
                    User Profile
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-text-secondary mb-1 block">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            autoComplete="off"
                            value={userProfile.name}
                            onChange={(e) => updateUserProfile({ name: e.target.value })}
                            className="w-full bg-background border border-border rounded-xl px-4 py-2 text-white focus:border-primary/50 outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-text-secondary mb-1 block">Role</label>
                        <input
                            type="text"
                            name="role"
                            autoComplete="off"
                            value={userProfile.role}
                            onChange={(e) => updateUserProfile({ role: e.target.value })}
                            className="w-full bg-background border border-border rounded-xl px-4 py-2 text-white focus:border-primary/50 outline-none"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-sm text-text-secondary mb-1 block">Avatar URL (Optional)</label>
                        <input
                            type="text"
                            name="avatar"
                            autoComplete="off"
                            value={userProfile.avatar}
                            placeholder="https://..."
                            onChange={(e) => updateUserProfile({ avatar: e.target.value })}
                            className="w-full bg-background border border-border rounded-xl px-4 py-2 text-white focus:border-primary/50 outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Personalization Section */}
            <div className="glass-card p-6 space-y-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Palette size={20} className="text-primary" />
                    Personalization
                </h2>

                {/* Theme Color */}
                <div>
                    <label className="text-sm text-text-secondary mb-2 block">Theme Color</label>
                    <div className="flex gap-3">
                        {['purple', 'blue', 'green', 'orange'].map((color) => (
                            <button
                                key={color}
                                onClick={() => updateAppSettings({ themeColor: color })}
                                className={`w-8 h-8 rounded-full border-2 transition-transform active:scale-95 ${appSettings.themeColor === color ? 'border-white scale-110' : 'border-transparent'}`}
                                style={{
                                    backgroundColor:
                                        color === 'purple' ? '#7C3AED' :
                                            color === 'blue' ? '#3B82F6' :
                                                color === 'green' ? '#10B981' :
                                                    '#F97316'
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Currency */}
                <div>
                    <label className="text-sm text-text-secondary mb-2 block flex items-center gap-2">
                        <Globe size={14} /> Currency format
                    </label>
                    <div className="flex bg-background border border-border rounded-xl p-1 w-fit">
                        {(['USD', 'EUR', 'PLN'] as const).map(curr => (
                            <button
                                key={curr}
                                onClick={() => updateAppSettings({ currency: curr })}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${appSettings.currency === curr ? 'bg-surface-highlight text-white shadow-sm' : 'text-text-secondary hover:text-white'
                                    }`}
                            >
                                {curr}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Integration Section */}
            <div className="glass-card p-6 space-y-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Key size={20} className="text-primary" />
                    Integrations & API
                </h2>

                <div>
                    <label className="text-sm text-text-secondary mb-1 block">Gemini API Key</label>
                    <div className="relative">
                        <input
                            type="password"
                            name="apiKey"
                            autoComplete="new-password"
                            value={appSettings.aiApiKey || ''}
                            onChange={(e) => updateAppSettings({ aiApiKey: e.target.value })}
                            placeholder="AIzaSy..."
                            className="w-full bg-background border border-border rounded-xl px-4 py-2 text-white focus:border-primary/50 outline-none pr-10"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
                            {appSettings.aiApiKey ? <CheckCircle size={16} className="text-emerald-500" /> : null}
                        </div>
                    </div>
                    <p className="text-xs text-text-secondary mt-1">Required for automated email summaries and replies.</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                        <Bell size={18} className="text-text-secondary" />
                        <span className="text-white">Enable Notifications</span>
                    </div>
                    <button
                        onClick={() => updateAppSettings({ notifications: !appSettings.notifications })}
                        className={`w-12 h-6 rounded-full transition-colors relative ${appSettings.notifications ? 'bg-primary' : 'bg-surface-highlight'}`}
                    >
                        <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${appSettings.notifications ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                </div>
            </div>

            {/* Data Management Section */}
            <div className="glass-card p-6 space-y-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <AlertTriangle size={20} className="text-amber-500" />
                    Data Management
                </h2>
                <p className="text-text-secondary text-sm">
                    Manage your demo data. Resetting will clear all current session data including revenue, active deals, and leads.
                </p>

                <div className="pt-4 border-t border-border/50">
                    {!showConfirm ? (
                        <div className="flex items-center justify-between">
                            <span className="text-white font-medium">Reset Demo Data</span>
                            <button
                                onClick={() => setShowConfirm(true)}
                                className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                            >
                                <Trash2 size={16} />
                                Reset Data
                            </button>
                        </div>
                    ) : (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 animate-in fade-in slide-in-from-top-2">
                            <h4 className="text-red-400 font-bold mb-1">Are you sure?</h4>
                            <p className="text-red-400/80 text-sm mb-4">This action cannot be undone. All dashboard stats will be reset to zero.</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="px-4 py-2 rounded-lg text-text-secondary hover:text-white text-sm font-medium hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-red-600/20"
                                >
                                    Yes, Reset Everything
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Task Management Section */}
            <div className="glass-card p-6 space-y-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <CheckCircle size={20} className="text-primary" />
                    Task Automation
                </h2>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-white font-medium">Auto-close Tasks</p>
                        <p className="text-text-secondary text-sm">Automatically mark tasks as completed when their linked Deal is Won or Lost.</p>
                    </div>
                    <button
                        onClick={toggleAutoCleanup}
                        className={`w-12 h-6 rounded-full transition-colors relative ${autoCleanupTasks ? 'bg-primary' : 'bg-surface-highlight'}`}
                    >
                        <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${autoCleanupTasks ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                </div>

                <div className="pt-4 border-t border-border/50">
                    {!showTaskConfirm ? (
                        <div className="flex items-center justify-between">
                            <span className="text-white font-medium">Clear All Tasks</span>
                            <button
                                onClick={() => setShowTaskConfirm(true)}
                                className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                            >
                                <Trash2 size={16} />
                                Clear Tasks
                            </button>
                        </div>
                    ) : (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 animate-in fade-in slide-in-from-top-2">
                            <h4 className="text-red-400 font-bold mb-1">Delete all tasks?</h4>
                            <p className="text-red-400/80 text-sm mb-4">This will permanently delete all tasks.</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowTaskConfirm(false)}
                                    className="px-4 py-2 rounded-lg text-text-secondary hover:text-white text-sm font-medium hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        clearAllTasks();
                                        setShowTaskConfirm(false);
                                        setResetDone(true);
                                        setTimeout(() => setResetDone(false), 3000);
                                    }}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-red-600/20"
                                >
                                    Yes, Delete All
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Success Toast (Simple implementation) */}
            {resetDone && (
                <div className="fixed bottom-8 right-8 bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
                    <CheckCircle size={24} />
                    <div>
                        <h4 className="font-bold">Success</h4>
                        <p className="text-sm opacity-90">Dashboard data has been reset.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
