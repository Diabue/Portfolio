import React from 'react';
import { DollarSign, Briefcase, Users, Percent, Activity as ActivityIcon, CheckSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/Dashboard/StatCard';
import RevenueChart from '../components/Dashboard/RevenueChart';
// import TaskList from '../components/Dashboard/TaskList'; // Removed unused
import { useDashboard } from '../context/DashboardContext';

const DashboardHome: React.FC = () => {
    const navigate = useNavigate();
    // Get Global State
    const { recentActivities, tasks, deals, revenue, revenueChange, activeDealsCount, activeDealsChange, newLeads, newLeadsChange, winRate, winRateChange } = useDashboard();

    // Upcoming Tasks Logic
    const upcomingTasks = tasks
        .filter(t => !t.completed)
        .sort((a, b) => new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime())
        .slice(0, 5);

    const topCustomers = Object.entries(
        deals.filter(d => d.status === 'Won').reduce((acc, d) => {
            acc[d.company] = (acc[d.company] || 0) + d.value;
            return acc;
        }, {} as Record<string, number>)
    )
        .sort(([, a], [, b]) => b - a)
        .slice(0, 4)
        .map(([name, value], i) => ({
            id: i,
            name,
            dealValue: value,
            status: 'Customer' // Simplified
        }));

    // If no data, show some examples or empty state? No, let's show real data or nothing.
    // If empty, maybe show empty state.

    return (
        <div className="space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Revenue"
                    value={`$${revenue.toLocaleString()}`}
                    change={`${revenueChange > 0 ? '+' : ''}${revenueChange}%`}
                    icon={DollarSign}
                    trend={revenueChange >= 0 ? 'up' : 'down'}
                />
                <StatCard
                    title="Active Deals"
                    value={activeDealsCount.toString()}
                    change={`${activeDealsChange > 0 ? '+' : ''}${activeDealsChange}`}
                    icon={Briefcase}
                    trend={activeDealsChange >= 0 ? 'up' : 'down'}
                />
                <StatCard
                    title="Win Rate"
                    value={`${winRate}%`}
                    change={`${winRateChange > 0 ? '+' : ''}${winRateChange}%`}
                    icon={Percent}
                    trend={winRateChange >= 0 ? 'up' : 'down'}
                />
                <StatCard
                    title="New Leads"
                    value={`+${newLeads}`}
                    change={`${newLeadsChange > 0 ? '+' : ''}${newLeadsChange}%`}
                    icon={Users}
                    trend={newLeadsChange >= 0 ? 'up' : 'down'}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="lg:col-span-2 min-h-[400px]">
                    <RevenueChart />
                </div>

                {/* Recent Activity */}
                <div className="glass-card p-6 flex flex-col">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <ActivityIcon size={20} className="text-primary" />
                        Recent Activity
                    </h3>
                    <div className="space-y-4 overflow-auto flex-1 max-h-[300px] pr-2 custom-scrollbar">
                        {recentActivities.length > 0 ? recentActivities.map(activity => (
                            <div key={activity.id} className="flex gap-3 items-start p-3 rounded-xl hover:bg-surface-highlight/50 transition-colors">
                                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${activity.type === 'deal' ? 'bg-emerald-500' :
                                    activity.type === 'task' ? 'bg-blue-500' :
                                        activity.type === 'customer' ? 'bg-purple-500' : 'bg-orange-500'
                                    }`} />
                                <div>
                                    <p className="text-sm font-medium text-white">{activity.title}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-text-secondary">{activity.time}</span>
                                        <span className="text-xs text-text-secondary">•</span>
                                        <span className="text-xs text-text-secondary">{activity.user}</span>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <p className="text-text-secondary text-sm">No recent activity.</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Customers */}
                <div className="lg:col-span-2 glass-card p-6">
                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center justify-between">
                        <span>Top Customers</span>
                        <button
                            onClick={() => navigate('/customers')}
                            className="text-xs text-primary hover:text-primary-glow transition-colors"
                        >
                            View All
                        </button>
                    </h3>
                    <div className="space-y-4">
                        {topCustomers.length > 0 ? topCustomers.map((customer, i) => (
                            <div key={customer.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-highlight/20 hover:bg-surface-highlight/40 transition-colors">
                                <div className="flex items-center gap-4">
                                    <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${i === 0 ? 'bg-yellow-500/20 text-yellow-500' :
                                        i === 1 ? 'bg-gray-400/20 text-gray-400' :
                                            'bg-orange-700/20 text-orange-700'
                                        }`}>
                                        {i + 1}
                                    </span>
                                    <div>
                                        <p className="font-medium text-white">{customer.name}</p>
                                        <p className="text-xs text-text-secondary">{customer.status}</p>
                                    </div>
                                </div>
                                <div className="font-semibold text-emerald-400">
                                    ${customer.dealValue.toLocaleString()}
                                </div>
                            </div>
                        )) : (
                            <p className="text-text-secondary text-sm">No won deals yet.</p>
                        )}
                    </div>
                </div>

                {/* Upcoming Tasks */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <CheckSquare size={20} className="text-primary" />
                        Upcoming Tasks
                    </h3>
                    <div className="space-y-3">
                        {upcomingTasks.length > 0 ? upcomingTasks.map(task => (
                            <div key={task.id} className="group flex items-start gap-3 p-3 rounded-xl border border-border/50 hover:bg-surface-highlight hover:border-border transition-all cursor-pointer">
                                <div className={`w-4 h-4 rounded mt-1 border-2 transition-colors ${task.completed ? 'bg-primary border-primary' : 'border-text-secondary group-hover:border-primary'
                                    }`} />
                                <div>
                                    <p className={`text-sm font-medium transition-colors ${task.completed ? 'text-text-secondary line-through' : 'text-white group-hover:text-primary'
                                        }`}>
                                        {task.title}
                                    </p>
                                    <p className="text-xs text-text-secondary mt-1">{task.dueDate}</p>
                                </div>
                            </div>
                        )) : (
                            <p className="text-text-secondary text-sm">No upcoming tasks.</p>
                        )}
                    </div>
                    <button
                        onClick={() => navigate('/tasks?action=new')}
                        className="w-full mt-4 py-2 text-sm text-text-secondary hover:text-white border border-border rounded-lg hover:bg-surface-highlight transition-colors"
                    >
                        Add New Task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
