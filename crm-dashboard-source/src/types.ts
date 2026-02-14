// Data Types
export interface Customer {
    id: number;
    name: string;
    email: string;
    status: 'Lead' | 'Potential' | 'Customer' | 'Cold' | 'Refused';
    company?: string;
    value: string;
    lastContact: string;
}

export interface Email {
    id: string;
    from: string;
    company: string;
    subject: string;
    excerpt: string;
    fullText: string;
    date: string;
    read: boolean;
    aiSummary: string;
    suggestedStatus: 'Potential' | 'Cold' | 'Customer' | 'Won' | 'Lost';
    customerId?: number;
    direction: 'Inbound' | 'Outbound'; // Added to match usage in Mails.tsx
}

export interface SentEmail {
    id: string;
    subject: string;
    recipient: string;
    date: string;
    status: 'Sent' | 'Opened' | 'Clicked';
    // Fields for viewing
    from: string;
    company: string;
    fullText: string;
    excerpt: string;
    aiSummary: string;
    suggestedStatus: 'Potential' | 'Cold' | 'Customer' | 'Won' | 'Lost';
    direction: 'Outbound';
}

export interface Deal {
    id: number;
    title: string; // Added title
    customerId?: number;
    company: string;
    value: number;
    status: 'Active' | 'Won' | 'Lost';
    description: string;
    date?: string;
}

export interface Task {
    id: number;
    dealId?: number;
    title: string;
    completed: boolean;
    dueDate?: string;
    tag?: string;
}

export interface Activity {
    id: number;
    type: 'deal' | 'meeting' | 'email' | 'call' | 'task' | 'customer' | 'lead';
    title: string;
    time: string;
    user: string;
}

export interface StatCardData {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    data: number[];
}

// Component Props
export interface SidebarProps {
    active: string;
    setActive: (tab: string) => void;
}

export interface StatusBadgeProps {
    status: string;
}
