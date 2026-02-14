import React from 'react';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, LucideIcon } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparkData {
    value: number;
}

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    data?: SparkData[];
    icon: LucideIcon;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, trend, data, icon: Icon }) => {
    const isPositive = trend === 'up';

    return (
        <div className="glass-card p-5 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 rounded-xl bg-surface-highlight text-text-secondary group-hover:text-white transition-colors">
                    <Icon size={20} />
                </div>
                <button className="text-text-secondary hover:text-white transition-colors">
                    <MoreHorizontal size={18} />
                </button>
            </div>

            <div className="space-y-1">
                <p className="text-sm text-text-secondary font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
            </div>

            <div className="flex items-center gap-2 mt-4">
                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${isPositive ? 'bg-secondary/10 text-secondary' : 'bg-red-500/10 text-red-400'
                    }`}>
                    {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {change}
                </div>
                <span className="text-xs text-text-secondary">vs last month</span>
            </div>

            {/* Mini Sparkline Background */}
            {data && (
                <div className="absolute -bottom-4 -right-4 w-32 h-20 opacity-30 group-hover:opacity-50 transition-opacity">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={isPositive ? "#10B981" : "#F87171"}
                                strokeWidth={3}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default StatCard;
