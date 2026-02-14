import React, { useState, useEffect } from 'react';
import { CheckSquare, Plus, Calendar as CalendarIcon, CheckCircle2, Circle, Trash2, Link, Edit2, X, LayoutList } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext';
import { Task } from '../types';
import CalendarView from '../components/CalendarView';

const Tasks: React.FC = () => {
    const { tasks, addTask, updateTask, toggleTask, deleteTask, deals } = useDashboard();
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

    // Auto-open modal if query param exists
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('action') === 'new') {
            setShowModal(true);
        }
    }, [location]);

    // Form State
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [tag, setTag] = useState('General');
    const [selectedDealId, setSelectedDealId] = useState<string>('');

    const handleSaveTask = () => {
        if (!title) {
            alert('Please enter a task title');
            return;
        }

        if (editingTaskId) {
            updateTask(editingTaskId, {
                title,
                dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
                tag,
                dealId: selectedDealId ? parseInt(selectedDealId) : undefined
            });
        } else {
            const newTask: Task = {
                id: Date.now(),
                title,
                dueDate: dueDate ? new Date(dueDate).toISOString() : new Date().toISOString(),
                tag,
                completed: false,
                dealId: selectedDealId ? parseInt(selectedDealId) : undefined
            };
            addTask(newTask);
        }

        resetModal();
    };

    const openEditModal = (task: Task) => {
        setTitle(task.title);
        setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
        setTag(task.tag || 'General');
        setSelectedDealId(task.dealId ? task.dealId.toString() : '');
        setEditingTaskId(task.id);
        setShowModal(true);
    };

    const resetModal = () => {
        setTitle('');
        setDueDate('');
        setTag('General');
        setSelectedDealId('');
        setEditingTaskId(null);
        setShowModal(false);
    };

    return (
        <div className="space-y-6 h-full flex flex-col relative">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-white">Tasks & Reminders</h1>
                    <div className="bg-surface border border-border rounded-lg p-1 flex">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-text-secondary hover:text-white'}`}
                            title="List View"
                        >
                            <LayoutList size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('calendar')}
                            className={`p-1.5 rounded-md transition-colors ${viewMode === 'calendar' ? 'bg-primary text-white' : 'text-text-secondary hover:text-white'}`}
                            title="Calendar View"
                        >
                            <CalendarIcon size={18} />
                        </button>
                    </div>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-primary/25 transition-all active:scale-95"
                >
                    <Plus size={18} />
                    <span>New Task</span>
                </button>
            </div>

            {viewMode === 'calendar' ? (
                <div className="flex-1 overflow-hidden">
                    <CalendarView
                        tasks={tasks}
                        onEditTask={openEditModal}
                        onToggleTask={toggleTask}
                    />
                </div>
            ) : tasks.length === 0 ? (
                <div className="flex items-center justify-center flex-1 glass-card border-dashed">
                    <div className="text-center text-text-secondary">
                        <CheckSquare size={48} className="mx-auto mb-4 opacity-50" />
                        <h3 className="text-xl font-semibold text-white mb-2">No Tasks Yet</h3>
                        <p>Create a task to stay organized.</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tasks.map(task => {
                        const linkedDeal = deals.find(d => d.id === task.dealId);
                        return (
                            <div key={task.id} className={`glass-card p-4 flex flex-col gap-3 group transition-all ${task.completed ? 'opacity-60' : 'hover:bg-surface-highlight/10'}`}>
                                <div className="flex justify-between items-start">
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${task.tag === 'Urgent' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                                        task.tag === 'Meeting' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                                            'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                        }`}>
                                        {task.tag}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEditModal(task)}
                                            className="text-text-secondary hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                                            title="Edit Task"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => deleteTask(task.id)}
                                            className="text-text-secondary hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                                            title="Delete Task"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => toggleTask(task.id)}
                                            className={`transition-colors ${task.completed ? 'text-emerald-400' : 'text-text-secondary hover:text-white'}`}
                                        >
                                            {task.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <h3 className={`font-medium text-white ${task.completed ? 'line-through text-text-secondary' : ''}`}>
                                    {task.title}
                                </h3>

                                {linkedDeal && (
                                    <div className="flex items-center gap-1.5 text-xs text-primary bg-primary/10 w-fit px-2 py-1 rounded-md">
                                        <Link size={12} />
                                        <span className="truncate max-w-[150px]">{linkedDeal.title}</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-2 text-xs text-text-secondary mt-auto">
                                    <CalendarIcon size={12} />
                                    <span>{task.dueDate}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* Add Task Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-surface border border-border rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">{editingTaskId ? 'Edit Task' : 'Add New Task'}</h2>
                            <button onClick={resetModal} className="text-text-secondary hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-text-secondary mb-1 block">Task Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Call John Doe"
                                    className="w-full bg-background border border-border rounded-xl px-4 py-2 text-white focus:border-primary/50 outline-none"
                                    autoFocus
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-text-secondary mb-1 block">Due Date</label>
                                    <input
                                        type="datetime-local"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                        className="w-full bg-background border border-border rounded-xl px-4 py-2 text-white focus:border-primary/50 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-text-secondary mb-1 block">Tag</label>
                                    <select
                                        value={tag}
                                        onChange={(e) => setTag(e.target.value)}
                                        className="w-full bg-background border border-border rounded-xl px-4 py-2 text-white focus:border-primary/50 outline-none"
                                    >
                                        <option value="General">General</option>
                                        <option value="Meeting">Meeting</option>
                                        <option value="Urgent">Urgent</option>
                                        <option value="Sales">Sales</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-text-secondary mb-1 block">Link to Deal (Optional)</label>
                                <select
                                    value={selectedDealId}
                                    onChange={(e) => setSelectedDealId(e.target.value)}
                                    className="w-full bg-background border border-border rounded-xl px-4 py-2 text-white focus:border-primary/50 outline-none"
                                >
                                    <option value="">-- No Deal --</option>
                                    {deals.filter(d => d.status === 'Active').map(deal => (
                                        <option key={deal.id} value={deal.id}>
                                            {deal.title} (${deal.value})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={resetModal}
                                className="flex-1 py-2.5 rounded-xl text-text-secondary hover:text-white hover:bg-surface-highlight transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveTask}
                                className="flex-1 bg-primary hover:bg-primary/90 text-white py-2.5 rounded-xl font-medium shadow-lg shadow-primary/25 transition-all"
                            >
                                {editingTaskId ? 'Update Task' : 'Create Task'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tasks;
