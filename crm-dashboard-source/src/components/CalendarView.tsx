import React, { useState } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    isToday
} from 'date-fns';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { Task } from '../types';

interface CalendarViewProps {
    tasks: Task[];
    onEditTask: (task: Task) => void;
    onToggleTask: (id: number) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ tasks, onEditTask, onToggleTask }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({
        start: startDate,
        end: endDate,
    });

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="glass-card flex flex-col h-full overflow-hidden">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-xl font-bold text-white">
                    {format(currentDate, 'MMMM yyyy')}
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={prevMonth}
                        className="p-2 hover:bg-surface-highlight rounded-lg text-text-secondary hover:text-white transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => setCurrentDate(new Date())}
                        className="px-3 py-1.5 text-sm font-medium hover:bg-surface-highlight rounded-lg text-text-secondary hover:text-white transition-colors border border-border"
                    >
                        Today
                    </button>
                    <button
                        onClick={nextMonth}
                        className="p-2 hover:bg-surface-highlight rounded-lg text-text-secondary hover:text-white transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 border-b border-border bg-surface/50">
                {weekDays.map(day => (
                    <div key={day} className="py-2 text-center text-xs font-semibold text-text-secondary uppercase tracking-wider">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 flex-1 auto-rows-fr overflow-y-auto">
                {calendarDays.map((day) => {
                    // Find tasks for this day
                    const dayTasks = tasks.filter(task => {
                        if (!task.dueDate) return false;
                        const taskDate = new Date(task.dueDate);
                        return isSameDay(taskDate, day);
                    });

                    const isCurrentMonth = isSameMonth(day, monthStart);
                    const isDayToday = isToday(day);

                    return (
                        <div
                            key={day.toString()}
                            className={`
                                min-h-[100px] p-2 border-b border-r border-border/50 flex flex-col gap-1 transition-colors
                                ${!isCurrentMonth ? 'bg-black/20 text-text-secondary/50' : 'bg-transparent'}
                                ${isDayToday ? 'bg-primary/5' : ''}
                            `}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span
                                    className={`
                                        text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full
                                        ${isDayToday ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-text-secondary'}
                                    `}
                                >
                                    {format(day, 'd')}
                                </span>
                                {dayTasks.length > 0 && (
                                    <span className="text-[10px] text-text-secondary font-medium px-1.5 py-0.5 bg-surface border border-border rounded-md">
                                        {dayTasks.length}
                                    </span>
                                )}
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
                                {dayTasks.map(task => (
                                    <div
                                        key={task.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEditTask(task);
                                        }}
                                        className={`
                                            group text-[10px] p-1.5 rounded-md border cursor-pointer transition-all hover:scale-[1.02]
                                            ${task.completed
                                                ? 'bg-emerald-500/10 border-emerald-500/20 text-text-secondary line-through opacity-70'
                                                : task.tag === 'Urgent'
                                                    ? 'bg-red-500/10 border-red-500/30 text-white shadow-sm'
                                                    : 'bg-surface-highlight border-border text-white'
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-1.5">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onToggleTask(task.id);
                                                }}
                                                className={`flex-shrink-0 ${task.completed ? 'text-emerald-500' : 'text-text-secondary group-hover:text-white'}`}
                                            >
                                                {task.completed ? <CheckCircle2 size={10} /> : <Circle size={10} />}
                                            </button>
                                            <span className="truncate">{task.title}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarView;
