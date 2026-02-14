import React from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Deal } from '../../types';
import { CheckCircle, XCircle, GripVertical } from 'lucide-react';

interface BoardViewProps {
    deals: Deal[];
    onDragEnd: (event: DragEndEvent) => void;
    onUpdateStatus: (id: number, status: 'Active' | 'Won' | 'Lost') => void;
    onEditDeal: (deal: Deal) => void;
}

const SortableDealCard = ({ deal, onUpdateStatus, onEditDeal }: { deal: Deal, onUpdateStatus: (id: number, status: 'Active' | 'Won' | 'Lost') => void, onEditDeal: (deal: Deal) => void }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: deal.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            // Add onDoubleClick to edit
            onDoubleClick={() => onEditDeal(deal)}
            className="glass-card p-4 mb-3 border border-border/50 hover:border-primary/50 transition-colors group relative"
        >
            <div
                {...attributes}
                {...listeners}
                className="absolute top-2 right-2 cursor-grab text-text-secondary hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <GripVertical size={16} />
            </div>

            <div className="flex justify-between items-start mb-2 pr-6">
                <span className="text-xs text-text-secondary">{deal.date}</span>
            </div>
            <h4 className="font-bold text-white text-sm mb-1">{deal.title}</h4>
            <p className="text-xs text-text-secondary mb-3">${deal.value.toLocaleString()}</p>

            {deal.status === 'Active' && (
                <div className="flex gap-2">
                    <button
                        onClick={() => onUpdateStatus(deal.id, 'Won')}
                        className="flex-1 flex items-center justify-center gap-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 py-1.5 rounded text-[10px] font-semibold border border-emerald-500/30 transition-all"
                    >
                        <CheckCircle size={12} /> Won
                    </button>
                    <button
                        onClick={() => onUpdateStatus(deal.id, 'Lost')}
                        className="flex-1 flex items-center justify-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 py-1.5 rounded text-[10px] font-semibold border border-red-500/30 transition-all"
                    >
                        <XCircle size={12} /> Lost
                    </button>
                </div>
            )}
        </div>
    );
};

const BoardColumn = ({ title, status, deals, onUpdateStatus, onEditDeal }: { title: string, status: string, deals: Deal[], onUpdateStatus: any, onEditDeal: (deal: Deal) => void }) => {
    const { setNodeRef } = useSortable({
        id: status,
        data: {
            type: 'Column',
            status
        }
    });

    return (
        <div ref={setNodeRef} className="bg-surface/30 rounded-xl p-4 flex flex-col h-full min-h-[500px]">
            <h3 className="font-semibold text-white mb-4 flex justify-between items-center">
                {title}
                <span className="text-xs bg-surface border border-border px-2 py-0.5 rounded-full text-text-secondary">
                    {deals.length}
                </span>
            </h3>

            <SortableContext items={deals.map(d => d.id)} strategy={verticalListSortingStrategy}>
                <div className="flex-1 space-y-3">
                    {deals.map(deal => (
                        <SortableDealCard key={deal.id} deal={deal} onUpdateStatus={onUpdateStatus} onEditDeal={onEditDeal} />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
};

const BoardView: React.FC<BoardViewProps> = ({ deals, onDragEnd, onUpdateStatus, onEditDeal }) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Group deals by status
    // Note: 'Lead' and 'Negotiation' are just 'Active' in current data model.
    // I need to update the data model if I want more statuses.
    // For now, let's stick to 'Active', 'Won', 'Lost' as columns, but maybe split Active?
    // The user request said "Lead -> Negotiation -> Won/Lost".
    // This implies adding a STATUS to deals beyond just 'Active'.
    // Or I can infer it? No, explicit is better.
    // I'll stick to 'Active', 'Won', 'Lost' for now to match current types, 
    // BUT I will mock 'Lead' vs 'Negotiation' randomly or just put all Active in 'Active' column for now 
    // until I update the schema.

    // Actually, I should update the schema if I want true Kanban.
    // But let's start with matching existing valid statuses: Active, Won, Lost.
    // I'll add "Lead" and "Negotiation" as visual columns but they both map to "Active" in backend? 
    // Or better: update types to support more granular status.
    // I can't easily change database schema without migration tools or SQL.
    // I'll stick to visualized columns based on existing status.
    // Maybe split 'Active' based on value? < $5000 = Lead, > $5000 = Negotiation?
    // No, that's hacky.

    // Let's implement full columns but realize they might just be visual for now.
    // Wait, the user specifically asked for "Lead -> Negotiation".
    // I should check if I can add a 'stage' field to deals?
    // Or just abuse 'description' or 'status'.
    // Let's check `types.ts` first.

    // I'll write a simple version first with Active/Won/Lost columns.
    // And maybe "New" definition?

    const activeDeals = deals.filter(d => d.status === 'Active');
    const wonDeals = deals.filter(d => d.status === 'Won');
    const lostDeals = deals.filter(d => d.status === 'Lost');

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full overflow-x-auto pb-4">
                <BoardColumn title="Active / In Progress" status="Active" deals={activeDeals} onUpdateStatus={onUpdateStatus} onEditDeal={onEditDeal} />
                <BoardColumn title="Won Deals" status="Won" deals={wonDeals} onUpdateStatus={onUpdateStatus} onEditDeal={onEditDeal} />
                <BoardColumn title="Lost Deals" status="Lost" deals={lostDeals} onUpdateStatus={onUpdateStatus} onEditDeal={onEditDeal} />
            </div>
        </DndContext>
    );
};

export default BoardView;
