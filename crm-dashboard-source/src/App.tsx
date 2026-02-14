import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardHome from './pages/DashboardHome';
import Customers from './pages/Customers';
import CustomerDetails from './pages/CustomerDetails';
import Mails from './pages/Mails';
import Deals from './pages/Deals';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';
import { DashboardProvider } from './context/DashboardContext';

// Wrapper component for the protected dashboard area
const DashboardLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Map current path to sidebar active state
    const getActiveTab = (pathname: string): string => {
        if (pathname === '/' || pathname === '') return 'Home';
        if (pathname.includes('/customers')) return 'Customers';
        if (pathname.includes('/mails')) return 'Mails';
        if (pathname.includes('/deals')) return 'Deals';
        if (pathname.includes('/tasks')) return 'Tasks';
        if (pathname.includes('/settings')) return 'Settings';
        return 'Home';
    };

    const activeTab = getActiveTab(location.pathname);

    const handleNavigation = (tabName: string): void => {
        setMobileMenuOpen(false); // Close menu on navigation
        switch (tabName) {
            case 'Home': navigate('/'); break;
            case 'Mails': navigate('/mails'); break;
            case 'Customers': navigate('/customers'); break;
            case 'Deals': navigate('/deals'); break;
            case 'Tasks': navigate('/tasks'); break;
            case 'Settings': navigate('/settings'); break;
            default: navigate('/');
        }
    };

    return (
        <div className="bg-background h-screen w-screen font-sans text-text-main selection:bg-primary/30 flex overflow-hidden">
            {/* Mobile Hamburger Button */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-surface border border-border rounded-lg text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>

            {/* Sidebar Wrapper */}
            <div className={`
                fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
                ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <Sidebar active={activeTab} setActive={handleNavigation} />
            </div>

            {/* Overlay for mobile */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            <main className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
                {/* Scrollable Content Container */}
                <div className="flex-1 overflow-y-auto w-full">
                    <div className="md:block hidden">
                        <Header />
                    </div>
                    {/* Mobile Header Spacer */}
                    <div className="md:hidden h-16 flex items-center justify-center border-b border-border bg-surface mb-4">
                        <span className="text-lg font-bold text-white">Dashboard</span>
                    </div>

                    <div className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto w-full pb-20 min-h-[calc(100vh-80px)]">
                        <Routes>
                            <Route path="/" element={<DashboardHome />} />
                            <Route path="/mails" element={<Mails />} />
                            <Route path="/customers" element={<Customers />} />
                            <Route path="/customers/:id" element={<CustomerDetails />} />
                            <Route path="/deals" element={<Deals />} />
                            <Route path="/tasks" element={<Tasks />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="*" element={<DashboardHome />} />
                        </Routes>
                    </div>
                </div>
            </main>
        </div>
    );
};


import { ErrorBoundary } from './components/ErrorBoundary';

const App: React.FC = () => {
    return (
        <Router basename="/crm-dashboard">
            <ErrorBoundary>
                <DashboardProvider>
                    <Routes>
                        {/* Redirect /login to / in demo mode */}
                        <Route path="/login" element={<Navigate to="/" replace />} />
                        <Route path="/*" element={<DashboardLayout />} />
                    </Routes>
                </DashboardProvider>
            </ErrorBoundary>
        </Router>
    );
};

export default App;
