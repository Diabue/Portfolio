import React from 'react';
import { MoreVertical } from 'lucide-react';

interface Customer {
    id: number;
    name: string;
    contact: string;
    avatar: string;
    value: string;
    status: 'Active' | 'Negotiation' | 'Closed' | 'Pending';
}

const customers: Customer[] = [
    { id: 1, name: 'Acme Corp', contact: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=1', value: '$120,000', status: 'Active' },
    { id: 2, name: 'Global Tech', contact: 'Alice Smith', avatar: 'https://i.pravatar.cc/150?u=2', value: '$85,500', status: 'Negotiation' },
    { id: 3, name: 'Stark Ind', contact: 'Tony S.', avatar: 'https://i.pravatar.cc/150?u=3', value: '$250,000', status: 'Closed' },
    { id: 4, name: 'Wayne Ent', contact: 'Bruce W.', avatar: 'https://i.pravatar.cc/150?u=4', value: '$180,000', status: 'Active' },
    { id: 5, name: 'Cyberdyne', contact: 'Sarah C.', avatar: 'https://i.pravatar.cc/150?u=5', value: '$95,000', status: 'Pending' },
];

const statusStyles: Record<Customer['status'], string> = {
    Active: 'bg-emerald-500/10 text-emerald-500',
    Negotiation: 'bg-amber-500/10 text-amber-500',
    Closed: 'bg-blue-500/10 text-blue-500',
    Pending: 'bg-zinc-500/10 text-zinc-400',
};

const CustomerTable: React.FC = () => {
    return (
        <div className="glass-card p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Top Customers</h3>
                <button className="text-text-secondary hover:text-white">
                    <MoreVertical size={18} />
                </button>
            </div>

            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-xs text-text-secondary border-b border-border">
                            <th className="pb-3 font-medium pl-2">Company</th>
                            <th className="pb-3 font-medium">Status</th>
                            <th className="pb-3 font-medium text-right font-mono">Value</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {customers.map((customer) => (
                            <tr key={customer.id} className="group hover:bg-surface-highlight/30 transition-colors">
                                <td className="py-3 pl-2">
                                    <div className="flex items-center gap-3">
                                        <img src={customer.avatar} alt={customer.name} className="w-8 h-8 rounded-full bg-surface-highlight" />
                                        <div>
                                            <p className="font-medium text-white">{customer.name}</p>
                                            <p className="text-xs text-text-secondary">{customer.contact}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[customer.status]}`}>
                                        {customer.status}
                                    </span>
                                </td>
                                <td className="py-3 text-right text-white font-medium">{customer.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerTable;
