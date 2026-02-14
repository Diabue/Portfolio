import React from 'react';
import { Activity } from '../../types';

const activities: Activity[] = [
    {
        id: 1,
        type: 'deal',
        title: 'Sarah Wilson closed a deal with TechFlow Inc.',
        time: '2 hours ago',
        user: 'Sarah Wilson'
    },
    {
        id: 2,
        type: 'meeting',
        title: 'Mike Chen created a new task Q3 Report Analysis',
        time: '4 hours ago',
        user: 'Mike Chen'
    },
    {
        id: 3,
        type: 'email',
        title: 'Emily Davis added a new lead Green Energy Co.',
        time: '5 hours ago',
        user: 'Emily Davis'
    },
    {
        id: 4,
        type: 'call',
        title: 'Alex Morgan updated the status of Project Phoenix',
        time: '1 day ago',
        user: 'Alex Morgan'
    },
];

const RecentActivity: React.FC = () => {
    return (
        <div className="glass-card p-6 h-full">
            <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>

            <div className="space-y-6 relative">
                {/* Vertical connector line */}
                <div className="absolute left-4 top-4 bottom-4 w-px bg-border/50"></div>

                {activities.map((activity) => (
                    <div key={activity.id} className="relative flex gap-4">
                        <div className="relative z-10 w-8 h-8 rounded-full border-2 border-surface overflow-hidden flex-shrink-0">
                            <img src={`https://i.pravatar.cc/150?u=${activity.id}`} alt={activity.user} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 min-w-0 pt-1">
                            <p className="text-sm text-white">{activity.title}</p>
                            <p className="text-xs text-muted mt-1">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivity;
