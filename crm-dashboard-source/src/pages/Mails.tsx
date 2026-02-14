import React, { useState, useEffect } from 'react';
import { Mail, Send, Brain, Sparkles, CheckCircle2, XCircle, RefreshCw, Briefcase, Loader2 } from 'lucide-react';
import { Email, SentEmail, StatusBadgeProps } from '../types';
import { useDashboard } from '../context/DashboardContext';
import { supabase } from '../lib/supabase';
import { GmailService } from '../services/gmail';
import { analyzeEmailAI } from '../utils/ai-simulator';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const Mails: React.FC = () => {
    const { addLead } = useDashboard();
    const [activeTab, setActiveTab] = useState<'Replied' | 'Sent'>('Replied');
    const [selectedMail, setSelectedMail] = useState<Email | null>(null);
    const [simulating, setSimulating] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [inbox, setInbox] = useState<Email[]>([]);
    const [sentMails, setSentMails] = useState<SentEmail[]>([]);

    const [isConnected, setIsConnected] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const initGmail = async () => {
            try {
                await GmailService.initialize();
                const signedIn = GmailService.isSignedIn();
                setIsConnected(signedIn);
                if (signedIn) {
                    fetchEmails();
                }
            } catch (error) {
                console.error("Gmail init error", error);
            }
        };
        initGmail();
    }, []);

    const handleConnect = async () => {
        try {
            await GmailService.signIn();
            setIsConnected(true);
            fetchEmails();
        } catch (error: any) {
            console.error("Sign in failed", error);
            const errorMsg = error?.error || error?.details || JSON.stringify(error);
            const debugInfo = `\n\nDebug Info:\nOrigin: ${window.location.origin}\nClient ID: ${import.meta.env.VITE_GOOGLE_CLIENT_ID ? 'Loaded' : 'MISSING'}`;
            alert(`Failed to sign in to Gmail: ${errorMsg}${debugInfo}`);
        }
    };
    const fetchEmails = async () => {
        if (!GmailService.isSignedIn()) return;

        setLoading(true);
        try {
            const messages = await GmailService.listMessages();
            const processedEmails: any[] = [];
            const chunkSize = 3;
            for (let i = 0; i < messages.length; i += chunkSize) {
                const chunk = messages.slice(i, i + chunkSize);
                const chunkDetails = await Promise.all(chunk.map((msg: any) => GmailService.getMessage(msg.id)));
                const chunkProcessed = await Promise.all(chunkDetails.map(async (e: any) => {
                    const from = GmailService.getHeader(e, 'From');
                    const subject = GmailService.getHeader(e, 'Subject');
                    const dateHeader = GmailService.getHeader(e, 'Date');
                    const body = GmailService.getBody(e);
                    const isSent = e.labelIds && e.labelIds.includes('SENT');
                    const { summary, status } = await analyzeEmailAI(body);

                    return {
                        id: e.id,
                        from: from,
                        company: 'Gmail Contact',
                        subject: subject,
                        excerpt: body.substring(0, 50) + '...',
                        fullText: body,
                        date: new Date(dateHeader).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
                        read: !e.labelIds?.includes('UNREAD'),
                        aiSummary: summary,
                        suggestedStatus: status,
                        direction: isSent ? 'Outbound' : 'Inbound'
                    };
                }));
                processedEmails.push(...chunkProcessed);
                await new Promise(r => setTimeout(r, 1000));
            }

            const received = processedEmails.filter((e: any) => e.direction === 'Inbound');
            const sent = processedEmails.filter((e: any) => e.direction === 'Outbound').map((e: any) => ({
                id: e.id,
                recipient: 'Recipient',
                subject: e.subject,
                date: e.date,
                status: 'Sent' as const,
                from: e.from,
                company: 'Me',
                fullText: e.fullText,
                excerpt: e.excerpt,
                aiSummary: 'Sent by you',
                suggestedStatus: 'Customer' as const,
                direction: 'Outbound' as const
            }));

            setInbox(received);
            setSentMails(sent);
        } catch (error) {
            console.error('Error fetching emails:', error);
        } finally {
            setLoading(false);
        }
    };


    // Simulation Logic: Add real email to DB
    const simulateIncomingReply = async (): Promise<void> => {
        setSimulating(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const body = "Hello,\n\nI'm looking for a CRM solution. Can you send me your pricing list?\n\nRegards,\nJohn";
        const newMail = {
            sender: 'New Lead',
            recipient: 'me@company.com',
            subject: 'Inquiry about pricing',
            body: body,
            read: false,
            ai_summary: 'Pricing inquiry. High intent.',
            suggested_status: 'Potential',
            direction: 'Inbound',
            status: 'Received',
            user_id: (await supabase.auth.getUser()).data.user?.id
        };

        const { error } = await supabase.from('emails').insert([newMail]);

        if (!error) {
            addLead();
            await fetchEmails();
        } else {
            console.error(error);
            alert('Error simulating reply');
        }
        setSimulating(false);
    };

    const handleSendReply = async () => {
        if (!selectedMail || !replyText.trim()) return;
        setSending(true);
        try {
            await GmailService.sendEmail(
                selectedMail.from,
                `Re: ${selectedMail.subject}`,
                replyText
            );
            alert('Reply sent successfully!');
            setReplyText('');
        } catch (error) {
            console.error('Failed to send reply:', error);
            alert('Failed to send reply.');
        } finally {
            setSending(false);
        }
    };

    const handleStatusUpdate = async (status: string) => {
        if (!selectedMail) return;
        const fromRaw = selectedMail.from;
        let name = fromRaw;
        let email = '';
        if (fromRaw.includes('<')) {
            const parts = fromRaw.split('<');
            name = parts[0].trim().replace(/"/g, '');
            email = parts[1].replace('>', '').trim();
        } else {
            email = fromRaw;
        }

        const newCustomer: Partial<any> = {
            name: name || 'Unknown',
            email: email || 'unknown@example.com',
            status: status,
            company: selectedMail.company || 'Gmail Contact',
            value: '$0',
            last_contact: new Date().toISOString()
        };

        const { error } = await supabase
            .from('customers')
            .upsert([newCustomer], { onConflict: 'email' });

        if (error) {
            console.error('Error creating customer:', error);
            alert('Error updating status/creating customer');
        } else {
            alert(`Customer status updated to ${status} and saved to CRM!`);
            addLead();
        }
    };

    const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
        const colors: Record<string, string> = {
            'Potential': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            'Cold': 'bg-red-500/20 text-red-400 border-red-500/30',
            'Customer': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
            'Won': 'bg-green-500/20 text-green-400 border-green-500/30',
            'Lost': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
        };
        return (
            <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${colors[status] || 'bg-gray-500/20 text-gray-400'}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="h-full flex flex-col gap-6">
            <style>{`
                .ql-toolbar {
                    background: transparent !important;
                    border-color: rgba(255,255,255,0.1) !important;
                    border-top-left-radius: 0.75rem;
                    border-top-right-radius: 0.75rem;
                }
                .ql-container {
                    border-color: rgba(255,255,255,0.1) !important;
                    border-bottom-left-radius: 0.75rem;
                    border-bottom-right-radius: 0.75rem;
                    font-size: 0.875rem;
                }
                .ql-editor {
                    color: white;
                    min-height: 100px;
                }
                .ql-stroke {
                    stroke: #9ca3af !important;
                }
                .ql-fill {
                    fill: #9ca3af !important;
                }
                .ql-picker {
                    color: #9ca3af !important;
                }
            `}</style>
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Mail Automation</h1>
                    <p className="text-text-secondary">Monitor campaigns - Realtime DB connected</p>
                </div>
                <div className="flex gap-3">
                    {!isConnected && (
                        <button onClick={handleConnect} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all font-medium text-sm shadow-lg shadow-blue-500/20">
                            <Mail size={16} /> Connect Gmail
                        </button>
                    )}
                    <button onClick={simulateIncomingReply} disabled={simulating} className="flex items-center gap-2 bg-surface border border-border hover:border-primary/50 text-text-secondary hover:text-white px-4 py-2 rounded-xl transition-all font-mono text-sm">
                        {simulating ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} className="text-accent" />}
                        {simulating ? 'Saving to DB...' : 'Dev: Simulate Reply'}
                    </button>
                </div>
            </div>

            <div className="flex gap-6 border-b border-border">
                {(['Replied', 'Sent'] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 text-sm font-medium transition-all relative ${activeTab === tab ? 'text-primary' : 'text-text-secondary hover:text-white'}`}>
                        {tab} ({tab === 'Replied' ? inbox.length : sentMails.length})
                        {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />}
                    </button>
                ))}
            </div>

            <div className="flex-1 min-h-0 flex gap-6">
                <div className="w-1/3 glass-card flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-border/50 bg-surface/50">
                        <input type="text" placeholder="Search inbox..." className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50" />
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {loading && activeTab === 'Replied' ? (
                            <div className="p-8 text-center text-text-secondary">Loading emails...</div>
                        ) : activeTab === 'Replied' ? (
                            inbox.length === 0 ? <div className="p-8 text-center text-text-secondary">No emails yet. Simulate one!</div> :
                                inbox.map(mail => (
                                    <div key={mail.id} onClick={() => setSelectedMail(mail)} className={`p-4 border-b border-border/30 cursor-pointer transition-colors hover:bg-surface-highlight/50 ${selectedMail?.id === mail.id ? 'bg-surface-highlight border-l-2 border-l-primary' : ''} ${!mail.read ? 'bg-primary/5' : ''}`}>
                                        <div className="flex justify-between mb-1">
                                            <span className={`text-sm font-semibold ${!mail.read ? 'text-white' : 'text-text-secondary'}`}>{mail.from.split('<')[0].replace(/"/g, '').trim()}</span>
                                            <span className="text-xs text-text-secondary">{mail.date}</span>
                                        </div>
                                        <div className="text-xs text-text-secondary mb-1 flex items-center gap-2"><Briefcase size={12} /> {mail.company}</div>
                                        <p className="text-sm text-text-secondary truncate">{mail.subject}</p>
                                        <p className="text-xs text-muted mt-1 truncate">{mail.excerpt}</p>
                                    </div>
                                ))
                        ) : (
                            sentMails.map(mail => (
                                <div key={mail.id} onClick={() => setSelectedMail(mail as unknown as Email)} className={`p-4 border-b border-border/30 cursor-pointer transition-colors hover:bg-surface-highlight/50 ${selectedMail?.id === mail.id ? 'bg-surface-highlight border-l-2 border-l-primary' : ''}`}>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-semibold text-white">{mail.recipient}</span>
                                        <span className="text-xs text-text-secondary">{mail.date}</span>
                                    </div>
                                    <p className="text-sm text-text-secondary">{mail.subject}</p>
                                    <div className="mt-2"><span className="bg-surface border border-border text-text-secondary text-[10px] px-2 py-0.5 rounded-full">{mail.status}</span></div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="flex-1 glass-card flex flex-col p-6 relative overflow-hidden">
                    {selectedMail ? (
                        <>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-2">{selectedMail.subject}</h2>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">{selectedMail.from.charAt(0)}</div>
                                        <div>
                                            <p className="text-sm font-semibold text-white">
                                                {selectedMail.from.split('<')[0].replace(/"/g, '').trim()}
                                                <span className="text-text-secondary font-normal ml-2">{selectedMail.from.includes('<') ? `<${selectedMail.from.split('<')[1]}` : ''}</span>
                                            </p>
                                            <p className="text-xs text-text-secondary">{selectedMail.company}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right"><p className="text-xs text-text-secondary">{selectedMail.date}</p></div>
                            </div>

                            <div className="flex-1 overflow-y-auto mb-6 pr-2">
                                <div className="text-sm text-gray-300 whitespace-pre-line leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedMail.fullText }}></div>
                            </div>

                            <div className="bg-surface-highlight/40 border border-primary/20 rounded-xl p-4 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent"></div>
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary"><Brain size={20} /></div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">AI Summary & Suggestion <StatusBadge status={selectedMail.suggestedStatus} /></h4>
                                        <p className="text-sm text-text-secondary mb-3">{selectedMail.aiSummary}</p>
                                        <div className="flex gap-3">
                                            <button onClick={() => handleStatusUpdate(selectedMail.suggestedStatus)} className="flex items-center gap-2 bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"><CheckCircle2 size={14} /> Accept "{selectedMail.suggestedStatus}"</button>
                                            <button className="flex items-center gap-2 hover:bg-surface border border-transparent hover:border-border text-text-secondary px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"><XCircle size={14} /> Ignore</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-border/50 flex flex-col gap-3">
                                <ReactQuill
                                    theme="snow"
                                    value={replyText}
                                    onChange={setReplyText}
                                    placeholder="Type your reply..."
                                    className="bg-surface rounded-xl text-white"
                                    modules={{
                                        toolbar: [
                                            ['bold', 'italic', 'underline', 'strike'],
                                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                            ['link', 'clean']
                                        ],
                                    }}
                                />
                                <div className="flex justify-end mt-2">
                                    <button
                                        onClick={handleSendReply}
                                        disabled={sending || !replyText.trim()}
                                        className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 font-medium"
                                    >
                                        {sending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                                        Send Reply
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-text-secondary">
                            <Mail size={48} className="opacity-20 mb-4" />
                            <p>Select an email to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Mails;
