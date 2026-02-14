import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Deal, Task, Customer, Activity } from '../types';
import { supabase } from '../lib/supabase';

interface DashboardState {
    revenue: number;
    revenueChange: number; // Percentage change
    activeDealsCount: number;
    activeDealsChange: number; // Change count
    newLeads: number;
    newLeadsChange: number; // Percentage change
    winRate: number;
    winRateChange: number; // Percentage change
    deals: Deal[];
    tasks: Task[];
    customers: Customer[];
    recentActivities: Activity[];
}

interface DashboardContextType extends DashboardState {
    addDeal: (deal: Deal) => void;
    updateDealStatus: (id: number, status: 'Active' | 'Won' | 'Lost') => void;
    addLead: () => void;
    addTask: (task: Task) => void;
    toggleTask: (id: number) => void;
    resetDashboard: () => void;
    deleteCustomer: (id: number) => void;
    addCustomer: (customer: Omit<Customer, 'id' | 'value' | 'lastContact'>) => void;
    updateCustomerStatus: (id: number, status: Customer['status']) => void;
    updateCustomer: (id: number, data: Partial<Customer>) => void; // New
    updateDeal: (id: number, data: Partial<Deal>) => void; // New
    updateTask: (id: number, data: Partial<Task>) => void; // New
    deleteTask: (id: number) => void;
    clearAllTasks: () => void;
    autoCleanupTasks: boolean;
    toggleAutoCleanup: () => void;
    // New Settings
    userProfile: UserProfile;
    updateUserProfile: (profile: Partial<UserProfile>) => void;
    appSettings: AppSettings;
    updateAppSettings: (settings: Partial<AppSettings>) => void;
}

export interface UserProfile {
    name: string;
    role: string;
    avatar: string;
}

export interface AppSettings {
    themeColor: string; // 'purple', 'blue', 'green', 'orange'
    currency: 'USD' | 'EUR' | 'PLN';
    aiApiKey?: string;
    notifications: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // State
    const [deals, setDeals] = useState<Deal[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]); // Moved to global state
    // const [newLeads, setNewLeads] = useState<number>(0); // Removed state, now derived
    const [recentActivities, setRecentActivities] = useState<Activity[]>([]);

    // Settings State
    const [autoCleanupTasks, setAutoCleanupTasks] = useState<boolean>(() => {
        const saved = localStorage.getItem('autoCleanupTasks');
        return saved ? JSON.parse(saved) : false;
    });

    const [userProfile, setUserProfile] = useState<UserProfile>(() => {
        const saved = localStorage.getItem('userProfile');
        return saved ? JSON.parse(saved) : {
            name: 'Maksymilian Kasprowicz',
            role: 'Product Lead',
            avatar: ''
        };
    });

    const [appSettings, setAppSettings] = useState<AppSettings>(() => {
        const saved = localStorage.getItem('appSettings');
        return saved ? JSON.parse(saved) : {
            themeColor: 'purple',
            currency: 'USD',
            notifications: true
        };
    });

    // Sync Auth with Profile & Fetch Data
    const syncProfile = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user && user.user_metadata) {
            const { full_name, avatar_url, role } = user.user_metadata;
            if (full_name || avatar_url || role) {
                setUserProfile(prev => {
                    const updated = {
                        ...prev,
                        name: full_name || prev.name,
                        avatar: avatar_url || prev.avatar,
                        role: role || prev.role
                    };
                    localStorage.setItem('userProfile', JSON.stringify(updated));
                    return updated;
                });
            }

            // Sync Settings
            if (user.user_metadata?.settings) {
                setAppSettings(prev => {
                    const merged = { ...prev, ...user.user_metadata.settings };
                    localStorage.setItem('appSettings', JSON.stringify(merged));
                    return merged;
                });
            }
        }
    };

    const fetchData = async () => {
        console.log('Fetching dashboard data...');

        // Fetch Deals
        const { data: dealsData, error: dealsError } = await supabase
            .from('deals')
            .select('*')
            .order('id', { ascending: false });

        if (dealsError) console.error('Error fetching deals:', dealsError);
        else if (dealsData) {
            setDeals(dealsData.map((d: any) => ({
                ...d,
                customerId: d.customer_id,
            })));
        }

        // Fetch Tasks
        const { data: tasksData, error: tasksError } = await supabase
            .from('tasks')
            .select('*')
            .order('id', { ascending: false });

        if (tasksError) console.error('Error fetching tasks:', tasksError);
        else if (tasksData) {
            setTasks(tasksData.map((t: any) => ({
                ...t,
                dealId: t.deal_id,
                dueDate: t.due_date,
            })));
        }

        // Fetch Customers
        const { data: customersData, error: customersError } = await supabase
            .from('customers')
            .select('*')
            .order('id', { ascending: false });

        if (customersError) console.error('Error fetching customers:', customersError);
        else if (customersData) {
            const formattedCustomers: Customer[] = customersData.map((c: any) => ({
                id: c.id,
                name: c.name,
                email: c.email || '',
                status: c.status,
                company: c.company || '',
                value: '$0',
                lastContact: c.last_contact_at ? new Date(c.last_contact_at).toLocaleDateString() : 'Never',
            }));
            setCustomers(formattedCustomers);
        }
    };

    useEffect(() => {
        // Initial load
        syncProfile();
        fetchData();

        // Listen for auth changes (Login, Logout)
        const { data: authListener } = supabase.auth.onAuthStateChange((event, _session) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                console.log('Auth changed:', event, '- Refetching data');
                syncProfile();
                fetchData();
            } else if (event === 'SIGNED_OUT') {
                // Optional: Clear state on logout
                // setDeals([]); setTasks([]); setCustomers([]);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    // Color Theme Effect
    useEffect(() => {
        const root = document.documentElement;
        const colorMap: Record<string, string> = {
            purple: '124 58 237',
            blue: '59 130 246', // blue-500
            green: '16 185 129', // emerald-500
            orange: '249 115 22', // orange-500
        };
        const color = colorMap[appSettings.themeColor] || colorMap['purple'];
        root.style.setProperty('--color-primary', color);
    }, [appSettings.themeColor]);


    const toggleAutoCleanup = () => {
        setAutoCleanupTasks(prev => {
            const newValue = !prev;
            localStorage.setItem('autoCleanupTasks', JSON.stringify(newValue));
            return newValue;
        });
    };

    const updateUserProfile = async (newProfile: Partial<UserProfile>) => {
        setUserProfile(prev => {
            const updated = { ...prev, ...newProfile };
            localStorage.setItem('userProfile', JSON.stringify(updated));
            return updated;
        });

        // Persist to Supabase Auth Metadata
        const { error } = await supabase.auth.updateUser({
            data: {
                full_name: newProfile.name, // Will be merged/overwritten if present
                role: newProfile.role,
                avatar_url: newProfile.avatar
            }
        });

        if (error) {
            console.error('Error updating profile in Supabase:', error);
        }
    };

    const updateAppSettings = async (newSettings: Partial<AppSettings>) => {
        setAppSettings(prev => {
            const updated = { ...prev, ...newSettings };
            // Ensure currency updates propagate immediately if dependent logic existed (none yet)
            localStorage.setItem('appSettings', JSON.stringify(updated));
            return updated;
        });

        // Persist to Supabase
        const { error } = await supabase.auth.updateUser({
            data: {
                settings: {
                    ...appSettings,
                    ...newSettings
                }
            }
        });

        if (error) console.error('Error saving settings to DB:', error);
    };

    const addCustomer = async (customer: Omit<Customer, 'id' | 'value' | 'lastContact'>) => {
        // Prepare DB object (map camelCase to snake_case if needed, assuming DB cols are standard)
        // If DB has 'created_at' it handles lastContact logic often, but we'll insert what we can.
        // We'll init value to 0 and lastContact to now.
        const dbCustomer = {
            ...customer,
            // value: 0, // DB likely has default
            last_contact_at: new Date().toISOString(),
        };

        const { data, error } = await supabase
            .from('customers')
            .insert([dbCustomer])
            .select()
            .single();

        if (error) {
            console.error('Error adding customer:', error);
            alert('Failed to add customer: ' + error.message);
        } else if (data) {
            const newCustomer: Customer = {
                id: data.id,
                name: data.name,
                email: data.email,
                status: data.status,
                company: data.company,
                value: '$0', // default
                lastContact: new Date(data.last_contact_at).toLocaleDateString()
            };
            setCustomers(prev => [newCustomer, ...prev]);
            logActivity('customer', `Added new customer ${newCustomer.name}`);
        }
    };

    const updateCustomer = async (id: number, data: Partial<Customer>) => {
        const { error } = await supabase
            .from('customers')
            .update(data)
            .eq('id', id);

        if (!error) {
            setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
        } else {
            console.error('Error updating customer:', error);
            alert('Error updating customer');
        }
    };

    const updateCustomerStatus = async (id: number, status: Customer['status']) => {
        // Optimistic update
        setCustomers(prev => prev.map(c => c.id === id ? { ...c, status } : c));

        const { error } = await supabase
            .from('customers')
            .update({ status })
            .eq('id', id);

        if (error) {
            console.error('Error updating customer status:', error);
            // Revert? For now, we assume success or user sees an error eventually but optimistic makes UI snappy
            alert('Failed to update status on server');
        } else {
            logActivity('customer', `Updated customer status to ${status}`);
        }
    };

    const logActivity = (type: 'deal' | 'task' | 'customer' | 'lead', title: string) => {
        const newActivity: Activity = {
            id: Date.now(),
            type,
            title,
            time: 'Just now', // Ideally real timestamp logic
            user: userProfile.name
        };
        setRecentActivities(prev => [newActivity, ...prev].slice(0, 10));
    };

    // Derived state calculators with Comparison Logic

    // Derived state calculators with Comparison Logic
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const isThisMonth = (dateString?: string) => {
        if (!dateString) return false;
        const d = new Date(dateString);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    };

    const isLastMonth = (dateString?: string) => {
        if (!dateString) return false;
        const d = new Date(dateString);
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const year = currentMonth === 0 ? currentYear - 1 : currentYear;
        return d.getMonth() === lastMonth && d.getFullYear() === year;
    };

    // Revenue
    const revenue = deals
        .filter(d => d.status === 'Won')
        .reduce((sum, d) => sum + d.value, 0);

    const revenueLastMonth = deals
        .filter(d => d.status === 'Won' && isLastMonth(d.date))
        .reduce((sum, d) => sum + d.value, 0);

    const revenueThisMonth = deals
        .filter(d => d.status === 'Won' && isThisMonth(d.date))
        .reduce((sum, d) => sum + d.value, 0);

    // Calculate percentage change based on ALL time vs last month? Or This Month vs Last Month?
    // Standard dashboard usually implies "Total Revenue" and then maybe change from last month?
    // User asked for "Total Revenue", so change is irrelevant if Total is cumulative?
    // Let's assume "Revenue" is Total, but change is "This Month vs Last Month" growth?
    // Or maybe "Revenue" IS "Monthly Revenue" in this context?
    // Given the small numbers, let's assume Revenue is Total for now, but change is tricky.
    // Let's compare Total This Month vs Total Last Month for the percentage.
    const revenueChange = revenueLastMonth === 0 ? (revenueThisMonth > 0 ? 100 : 0) : Math.round(((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100);

    // Active Deals
    const activeDealsCount = deals.filter(d => d.status === 'Active').length;
    const activeDealsLastMonth = deals.filter(d => d.status === 'Active' && isLastMonth(d.date)).length;
    // For 'Active', usually we just show net change
    const activeDealsChange = deals.filter(d => d.status === 'Active' && isThisMonth(d.date)).length - activeDealsLastMonth;


    // New Leads
    const newLeads = customers.filter(c => c.status === 'Lead' || c.status === 'Potential').length;
    // Assuming we had a 'created_at' for customers, which we don't have in type yet. We used lastContact.
    // Let's use lastContact as proxy for 'New' if we have no created_at
    const newLeadsThisMonth = customers.filter(c => (c.status === 'Lead' || c.status === 'Potential') && isThisMonth(c.lastContact)).length;
    const newLeadsLastMonth = customers.filter(c => (c.status === 'Lead' || c.status === 'Potential') && isLastMonth(c.lastContact)).length;
    const newLeadsChange = newLeadsLastMonth === 0 ? (newLeadsThisMonth > 0 ? 100 : 0) : Math.round(((newLeadsThisMonth - newLeadsLastMonth) / newLeadsLastMonth) * 100);

    // Win Rate
    const calculateWinRate = (periodFn: (d: string | undefined) => boolean) => {
        const closedDeals = deals.filter(d => (d.status === 'Won' || d.status === 'Lost') && (periodFn ? periodFn(d.date) : true));
        if (closedDeals.length === 0) return 0;
        const wonDeals = deals.filter(d => d.status === 'Won' && (periodFn ? periodFn(d.date) : true)).length;
        return Math.round((wonDeals / closedDeals.length) * 100);
    };

    const winRate = calculateWinRate(() => true); // All time
    const winRateLastMonth = calculateWinRate(isLastMonth);
    const winRateThisMonth = calculateWinRate(isThisMonth);
    const winRateChange = winRateThisMonth - winRateLastMonth; // Percentage point difference

    // Actions
    const addDeal = async (deal: Deal) => {
        const { id, customerId, ...dealData } = deal; // eslint-disable-line @typescript-eslint/no-unused-vars
        const dbDeal = {
            ...dealData,
            customer_id: customerId,
        };
        const { data, error } = await supabase
            .from('deals')
            .insert([dbDeal])
            .select()
            .single();

        if (error) {
            console.error('Error adding deal:', error);
            alert('Failed to add deal: ' + error.message);
        } else if (data) {
            setDeals(prev => [{ ...data, customerId: data.customer_id }, ...prev]);
        }
    };

    const updateDeal = async (id: number, data: Partial<Deal>) => {
        const { error } = await supabase
            .from('deals')
            .update(data)
            .eq('id', id);

        if (!error) {
            setDeals(prev => prev.map(d => d.id === id ? { ...d, ...data } : d));
            logActivity('deal', `Updated deal details`);
        } else {
            console.error('Error updating deal:', error);
            alert('Failed to update deal');
        }
    };

    const updateDealStatus = async (id: number, status: 'Active' | 'Won' | 'Lost') => {
        const { error } = await supabase
            .from('deals')
            .update({ status })
            .eq('id', id);

        if (!error) {
            setDeals(prev => prev.map(d => d.id === id ? { ...d, status } : d));

            // Auto-cleanup tasks logic
            if (autoCleanupTasks && (status === 'Won' || status === 'Lost')) {
                // Find tasks linked to this deal
                const dealTasks = tasks.filter(t => t.dealId === id && !t.completed);

                // Update them in DB
                for (const task of dealTasks) {
                    await supabase
                        .from('tasks')
                        .update({ completed: true })
                        .eq('id', task.id);
                }

                // Update local state
                setTasks(prev => prev.map(t =>
                    t.dealId === id ? { ...t, completed: true } : t
                ));
            }
        }
    };

    const addLead = () => {
        // Logic handled by adding customer with status 'Lead'
    };

    const addTask = async (task: Task) => {
        // Remove ID if it's a placeholder (mock ID) to let DB assign it, or pass it if you handle IDs manually
        // Assuming DB handles IDs, we omit the 'id' if it's just a timestamp
        const { id, dealId, dueDate, ...taskData } = task; // eslint-disable-line @typescript-eslint/no-unused-vars

        const dbTask = {
            ...taskData,
            deal_id: dealId,
            due_date: dueDate,
        };

        const { data, error } = await supabase
            .from('tasks')
            .insert([dbTask])
            .select()
            .single();

        if (error) {
            console.error('Error adding task:', error);
            alert('Failed to add task: ' + error.message);
        } else if (data) {
            setTasks(prev => [{ ...data, dealId: data.deal_id, dueDate: data.due_date }, ...prev]);
        }
    };

    const updateTask = async (id: number, data: Partial<Task>) => {
        // Map fields to DB columns
        const dbData: any = { ...data };
        if (data.dealId) dbData.deal_id = data.dealId;
        if (data.dueDate) dbData.due_date = data.dueDate;

        const { error } = await supabase
            .from('tasks')
            .update(dbData)
            .eq('id', id);

        if (!error) {
            setTasks(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));
        } else {
            console.error('Error updating task:', error);
        }
    };

    const toggleTask = async (id: number) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        const newCompleted = !task.completed;
        const { error } = await supabase
            .from('tasks')
            .update({ completed: newCompleted })
            .eq('id', id);

        if (!error) {
            setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: newCompleted } : t));
        }
    };

    const deleteCustomer = async (id: number) => {
        // Optimistic Update
        const previousCustomers = [...customers];
        setCustomers(prev => prev.filter(c => c.id !== id));

        const { error } = await supabase.from('customers').delete().eq('id', id);
        if (error) {
            console.error('Error deleting customer:', error);
            // Revert on error
            setCustomers(previousCustomers);
        } else {
            logActivity('customer', `Deleted customer #${id}`);
        }
    };

    const deleteTask = async (id: number) => {
        const { error } = await supabase.from('tasks').delete().eq('id', id);
        if (!error) {
            setTasks(prev => prev.filter(t => t.id !== id));
            logActivity('task', `Deleted task`);
        }
    };

    const clearAllTasks = async () => {
        const { error } = await supabase.from('tasks').delete().neq('id', 0);
        if (!error) {
            setTasks([]);
        }
    };

    const resetDashboard = async () => {
        // Delete all data
        await supabase.from('deals').delete().neq('id', 0); // Delete all
        await supabase.from('tasks').delete().neq('id', 0); // Delete all
        await supabase.from('customers').delete().neq('id', 0); // Delete all customers too for full reset?
        // Maybe keep customers as the request was only about resetting "data" (stats), but usually reset means empty state.
        // Let's keep it safe and just clear deals/tasks/customers as requested by "Reset Data" implies fresh start.

        setDeals([]);
        setTasks([]);
        // setNewLeads(0); // Derived from customers now
    };

    return (
        <DashboardContext.Provider value={{
            revenue,
            revenueChange,
            activeDealsCount,
            activeDealsChange,
            newLeads,
            newLeadsChange,
            winRate,
            winRateChange,
            deals,
            tasks,
            customers,
            recentActivities,
            addDeal,
            updateDealStatus,
            addLead,
            addCustomer,
            updateCustomerStatus,
            updateCustomer, // New
            updateDeal, // New
            addTask,
            updateTask, // New
            toggleTask,
            resetDashboard,
            deleteCustomer,
            deleteTask,
            clearAllTasks,
            autoCleanupTasks,
            toggleAutoCleanup,
            userProfile,
            updateUserProfile,
            appSettings,
            updateAppSettings
        }}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
};
