import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDashboard } from '../../context/DashboardContext';

const RevenueChart: React.FC = () => {
    const { deals } = useDashboard();

    // Aggregate revenue by month
    const monthlyRevenue = new Array(12).fill(0);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    deals.forEach(deal => {
        if (deal.status === 'Won') {
            const date = deal.date ? new Date(deal.date) : new Date(); // Fallback to now if no date
            const monthIndex = date.getMonth();
            monthlyRevenue[monthIndex] += deal.value;
        }
    });

    const data = months.map((name, index) => ({
        name,
        revenue: monthlyRevenue[index],
        profit: monthlyRevenue[index] * 0.4, // Mock profit margin
    }));

    return (
        <div className="glass-card p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white">Revenue Growth</h3>
                    <p className="text-sm text-text-secondary">Yearly financial performance</p>
                </div>
                <select className="bg-surface-highlight border border-border rounded-lg text-sm text-white px-3 py-1.5 focus:outline-none focus:border-primary/50">
                    <option>This Year</option>
                    <option>Last Year</option>
                </select>
            </div>

            <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#525252"
                            tick={{ fill: '#737373', fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#525252"
                            tick={{ fill: '#737373', fontSize: 12 }}
                            tickFormatter={(value: number) => `$${value}`}
                            tickLine={false}
                            axisLine={false}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#141414',
                                borderColor: '#262626',
                                borderRadius: '12px',
                                color: '#fff'
                            }}
                            itemStyle={{ color: '#A1A1AA' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#7C3AED"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                        <Area
                            type="monotone"
                            dataKey="profit"
                            stroke="#3B82F6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorProfit)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueChart;
