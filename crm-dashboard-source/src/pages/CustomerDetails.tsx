import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building, Mail, Calendar, Briefcase, CheckSquare } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

const CustomerDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { customers, deals, tasks } = useDashboard();

    const customer = customers.find(c => c.id === Number(id));

    if (!customer) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-text-secondary">
                <p className="mb-4">Customer not found</p>
                <button
                    onClick={() => navigate('/customers')}
                    className="flex items-center gap-2 text-primary hover:text-white transition-colors"
                >
                    <ArrowLeft size={16} /> Back to Customers
                </button>
            </div>
        );
    }

    // Related Data
    const customerDeals = deals.filter(d => d.customerId === customer.id);
    const customerTasks = tasks.filter(t => {
        // Find if task is linked to a deal that belongs to this customer
        if (!t.dealId) return false;
        const deal = deals.find(d => d.id === t.dealId);
        return deal?.customerId === customer.id;
    });

    // Calculate total value
    const totalValue = customerDeals
        .filter(d => d.status === 'Won')
        .reduce((sum, d) => sum + d.value, 0);

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            {/* Header / Back */}
            <button
                onClick={() => navigate('/customers')}
                className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-2"
            >
                <ArrowLeft size={18} /> Back to Customers
            </button>

            {/* Profile Header */}
            <div className="glass-card p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-primary/20">
                            {customer.name.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">{customer.name}</h1>
                            <div className="flex flex-wrap gap-4 text-text-secondary text-sm">
                                <div className="flex items-center gap-1.5">
                                    <Building size={14} />
                                    {customer.company || 'No Company'}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Mail size={14} />
                                    {customer.email}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={14} />
                                    Last Contact: {customer.lastContact}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 text-right">
                        <div className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${customer.status === 'Customer' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                            customer.status === 'Potential' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                                'bg-surface-highlight text-text-secondary border-border'
                            }`}>
                            {customer.status}
                        </div>
                        <div className="text-2xl font-bold text-white font-mono">
                            ${totalValue.toLocaleString()} <span className="text-xs text-text-secondary font-sans font-normal">Lifetime Value</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Deals Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Briefcase className="text-primary" size={20} />
                            Deals
                        </h2>
                        <span className="bg-surface border border-border px-2 py-0.5 rounded text-xs text-text-secondary">
                            {customerDeals.length}
                        </span>
                    </div>

                    {customerDeals.length === 0 ? (
                        <div className="glass-card p-8 text-center text-text-secondary border-dashed">
                            No deals found for this customer.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {customerDeals.map(deal => (
                                <div key={deal.id} className="glass-card p-4 hover:bg-surface-highlight/10 transition-colors flex justify-between items-center group">
                                    <div>
                                        <h3 className="font-semibold text-white mb-1 group-hover:text-primary transition-colors">{deal.title}</h3>
                                        <p className="text-xs text-text-secondary">{deal.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-white mb-1">${deal.value.toLocaleString()}</div>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${deal.status === 'Won' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                            deal.status === 'Lost' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                            }`}>
                                            {deal.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Tasks Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <CheckSquare className="text-primary" size={20} />
                            Related Tasks
                        </h2>
                        <span className="bg-surface border border-border px-2 py-0.5 rounded text-xs text-text-secondary">
                            {customerTasks.length}
                        </span>
                    </div>

                    {customerTasks.length === 0 ? (
                        <div className="glass-card p-8 text-center text-text-secondary border-dashed">
                            No open tasks linked to this customer's deals.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {customerTasks.map(task => (
                                <div key={task.id} className={`glass-card p-4 flex items-center gap-4 ${task.completed ? 'opacity-50' : ''}`}>
                                    <div className={`w-2 h-2 rounded-full ${task.completed ? 'bg-emerald-500' : 'bg-primary'}`} />
                                    <div className="flex-1">
                                        <h3 className={`font-medium text-white ${task.completed ? 'line-through' : ''}`}>{task.title}</h3>
                                        <p className="text-xs text-text-secondary flex items-center gap-2">
                                            <span>{task.dueDate}</span>
                                            <span className="px-1.5 py-0.5 rounded bg-surface border border-border">{task.tag}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerDetails;
