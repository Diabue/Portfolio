import { useEffect, useState } from 'react';
import { Phone, Mail, CornerUpRight } from 'lucide-react';

interface Inquiry {
    id: string;
    created_at: string;
    name: string;
    phone: string;
    email: string;
    message: string;
    status: string;
    ticket_token?: string;
}

interface Message {
    id: string;
    content: string;
    sender_type: 'customer' | 'admin';
    created_at: string;
}

// Mock Data
const MOCK_INQUIRIES: Inquiry[] = [
    {
        id: '1',
        created_at: new Date().toISOString(),
        name: 'Jan Kowalski',
        phone: '500 123 456',
        email: 'jan@example.com',
        message: 'Dzień dobry, chciałbym zapytać o cenę powłoki ceramicznej dla BMW X5. Czy macie wolne terminy na przyszły tydzień?',
        status: 'new',
        ticket_token: 'demo-token-1'
    },
    {
        id: '2',
        created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        name: 'Anna Nowak',
        phone: '600 987 654',
        email: 'anna@test.pl',
        message: 'Interesuje mnie pranie tapicerki w Audi A4. Czy dojazd do klienta jest możliwy?',
        status: 'read',
        ticket_token: 'demo-token-2'
    }
];

const MOCK_MESSAGES: Record<string, Message[]> = {
    '1': [],
    '2': [
        {
            id: 'm1',
            content: 'Dzień dobry, tak, dojazd jest możliwy na terenie Warszawy. Koszt to 50zł.',
            sender_type: 'admin',
            created_at: new Date(Date.now() - 40000000).toISOString()
        }
    ]
};

export default function Inquiries() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [replyContent, setReplyContent] = useState('');
    const [sending, setSending] = useState(false);

    useEffect(() => {
        // Simulate fetch delay
        setTimeout(() => {
            setInquiries(MOCK_INQUIRIES);
            setLoading(false);
        }, 500);
    }, []);

    // Fetch messages when inquiry selected
    useEffect(() => {
        if (selectedInquiry) {
            const msgs = MOCK_MESSAGES[selectedInquiry.id] || [];
            setMessages(msgs);
        }
    }, [selectedInquiry]);

    const handleReply = async () => {
        if (!replyContent.trim() || !selectedInquiry) return;
        setSending(true);

        // Simulate network request
        setTimeout(() => {
            const newMessage: Message = {
                id: Math.random().toString(36).substr(2, 9),
                content: replyContent,
                sender_type: 'admin',
                created_at: new Date().toISOString()
            };

            setMessages(prev => [...prev, newMessage]);
            setReplyContent('');
            setSending(false);

            // In a real demo, we might want to "persist" this reply only in memory, which is what we are doing here.
        }, 600);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pl-PL', {
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="flex h-[calc(100vh-4rem)] gap-6">
            {/* Left: List */}
            <div className="w-1/3 overflow-y-auto pr-2">
                <h1 className="text-2xl font-black text-white mb-6 font-Orbitron italic uppercase sticky top-0 bg-zinc-950 pb-4 z-10">Wiadomości</h1>

                {loading ? (
                    <div className="text-white">Ładowanie...</div>
                ) : inquiries.length === 0 ? (
                    <div className="text-zinc-500">Brak wiadomości.</div>
                ) : (
                    <div className="space-y-3">
                        {inquiries.map((inquiry) => (
                            <div
                                key={inquiry.id}
                                onClick={() => setSelectedInquiry(inquiry)}
                                className={`cursor-pointer border rounded-xl p-4 transition-all ${selectedInquiry?.id === inquiry.id
                                    ? 'bg-zinc-900 border-yellow-500'
                                    : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className={`font-bold ${selectedInquiry?.id === inquiry.id ? 'text-white' : 'text-zinc-300'}`}>
                                        {inquiry.name}
                                    </h3>
                                    <span className="text-[10px] text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded-full border border-zinc-800">
                                        {formatDate(inquiry.created_at)}
                                    </span>
                                </div>
                                <p className="text-sm text-zinc-500 line-clamp-2 italic">
                                    "{inquiry.message}"
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Right: Chat */}
            <div className="flex-1 bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col">
                {selectedInquiry ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-6 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                                    {selectedInquiry.name}
                                    <span className="text-xs font-normal text-zinc-500 flex items-center gap-2">
                                        <Mail size={12} /> {selectedInquiry.email}
                                    </span>
                                    <span className="text-xs font-normal text-zinc-500 flex items-center gap-2">
                                        <Phone size={12} /> {selectedInquiry.phone}
                                    </span>
                                </h2>
                            </div>
                            <div className="flex gap-2">
                                <a href={`mailto:${selectedInquiry.email}`} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors">
                                    <Mail size={18} />
                                </a>
                                <a href={`tel:${selectedInquiry.phone}`} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors">
                                    <Phone size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-950/30">
                            {/* Original Inquiry */}
                            <div className="flex justify-start">
                                <div className="max-w-[80%]">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold text-zinc-400">Klient</span>
                                        <span className="text-[10px] text-zinc-600">{formatDate(selectedInquiry.created_at)}</span>
                                    </div>
                                    <div className="bg-zinc-900 border border-zinc-800 text-zinc-300 p-4 rounded-2xl rounded-tl-none">
                                        {selectedInquiry.message}
                                    </div>
                                </div>
                            </div>

                            {/* Chat History */}
                            {messages.map((msg) => {
                                const isAdmin = msg.sender_type === 'admin';
                                return (
                                    <div key={msg.id} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%]`}>
                                            <div className={`flex items-center gap-2 mb-1 ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                                                <span className={`text-xs font-bold ${isAdmin ? 'text-yellow-500' : 'text-zinc-400'}`}>
                                                    {isAdmin ? 'Ty (Support)' : 'Klient'}
                                                </span>
                                                <span className="text-[10px] text-zinc-600">
                                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <div className={`p-4 rounded-2xl border ${isAdmin
                                                ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-100 rounded-tr-none'
                                                : 'bg-zinc-900 border-zinc-800 text-zinc-300 rounded-tl-none'
                                                }`}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-zinc-900 border-t border-zinc-800">
                            <div className="relative">
                                <textarea
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    placeholder="Napisz odpowiedź..."
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 pr-14 text-white placeholder:text-zinc-600 focus:outline-none focus:border-yellow-500/50 resize-none h-24"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleReply();
                                        }
                                    }}
                                />
                                <button
                                    onClick={handleReply}
                                    disabled={!replyContent.trim() || sending}
                                    className="absolute right-3 bottom-3 bg-yellow-500 hover:bg-yellow-400 text-black p-2 rounded-lg disabled:opacity-50 transition-colors"
                                >
                                    {sending ? (
                                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <CornerUpRight size={20} />
                                    )}
                                </button>
                            </div>
                            <p className="text-[10px] text-zinc-500 mt-2 text-center">
                                Enter aby wysłać • Shift + Enter nowa linia
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 gap-4">
                        <div className="bg-zinc-900 p-6 rounded-full border border-zinc-800">
                            <Mail size={48} className="opacity-50" />
                        </div>
                        <p>Wybierz wiadomość z listy, aby zobaczyć szczegóły</p>
                    </div>
                )}
            </div>
        </div>
    );
}
