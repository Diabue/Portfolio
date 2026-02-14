
import { createClient } from '@supabase/supabase-js';

// Mock Data
const mockDeals = [
    { id: 1, title: 'Enterprise License', value: 5000, status: 'Active', customer_id: 1, date: new Date().toISOString() },
    { id: 2, title: 'Startup Plan', value: 1200, status: 'Won', customer_id: 2, date: new Date(Date.now() - 86400000 * 2).toISOString() },
    { id: 3, title: 'Consulting', value: 3000, status: 'Active', customer_id: 3, date: new Date().toISOString() },
];

const mockCustomers = [
    { id: 1, name: 'Acme Corp', email: 'contact@acme.com', status: 'Customer', company: 'Acme Inc', last_contact_at: new Date().toISOString() },
    { id: 2, name: 'Startup IO', email: 'hello@startup.io', status: 'Lead', company: 'Startup IO', last_contact_at: new Date().toISOString() },
    { id: 3, name: 'Global Tech', email: 'info@globaltech.com', status: 'Potential', company: 'Global Tech', last_contact_at: new Date().toISOString() },
];

const mockTasks = [
    { id: 1, title: 'Follow up with Acme', completed: false, due_date: new Date().toISOString(), deal_id: 1 },
    { id: 2, title: 'Send contract', completed: true, due_date: new Date().toISOString(), deal_id: 2 },
];

// Mock Client
const mockSupabase = {
    auth: {
        getUser: async () => ({
            data: {
                user: {
                    id: 'demo-user-id',
                    email: 'demo@example.com',
                    user_metadata: {
                        full_name: 'Demo User',
                        avatar_url: '',
                        role: 'Administrator'
                    }
                }
            },
            error: null
        }),
        getSession: async () => ({
            data: {
                session: {
                    access_token: 'mock-token',
                    user: { xml: 'mock' }
                }
            },
            error: null
        }),
        onAuthStateChange: (callback: any) => {
            // Simulate signed in
            callback('SIGNED_IN', { user: {} });
            return { data: { subscription: { unsubscribe: () => { } } } };
        },
        updateUser: async () => ({ data: {}, error: null }),
        signInWithPassword: async () => ({ data: { user: {} }, error: null }),
        signOut: async () => ({ error: null }),
    },
    from: (table: string) => {
        return {
            select: () => {
                return {
                    order: () => {
                        let data = [];
                        if (table === 'deals') data = mockDeals;
                        if (table === 'customers') data = mockCustomers;
                        if (table === 'tasks') data = mockTasks;
                        if (table === 'emails') data = [];
                        return { data, error: null };
                    },
                    single: async () => ({ data: null, error: null }) // Generic fallback
                };
            },
            insert: (data: any) => {
                console.log(`[Demo] Insert into ${table}:`, data);
                return {
                    select: () => ({
                        single: async () => {
                            // Return a mock object with an ID to simulate success
                            return { data: { id: Date.now(), ...data[0] }, error: null };
                        }
                    })
                };
            },
            update: (data: any) => {
                console.log(`[Demo] Update ${table}:`, data);
                return {
                    eq: (col: string, val: any) => {
                        console.log(`[Demo] ... where ${col} = ${val}`);
                        return { error: null };
                    }
                };
            },
            delete: () => {
                return {
                    eq: (col: string, val: any) => {
                        console.log(`[Demo] Delete from ${table} where ${col} = ${val}`);
                        return { error: null };
                    },
                    neq: () => ({ error: null })
                };
            },
            upsert: (data: any) => {
                console.log(`[Demo] Upsert into ${table}:`, data);
                return { error: null };
            }
        };
    }
};

export const supabase = mockSupabase as any;
