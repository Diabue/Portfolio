
// Mock Emails
const MOCK_EMAILS = [
    {
        id: 'mock-1',
        snippet: 'Hi, I am interested in your Enterprise plan. Can we hop on a call...',
        payload: {
            headers: [
                { name: 'From', value: 'Alice Smith <alice@bigcorp.com>' },
                { name: 'Subject', value: 'Enterprise Plan Inquiry' },
                { name: 'Date', value: new Date().toISOString() }
            ],
            body: { data: btoa("Hi Team,\n\nI am interested in your Enterprise plan. Can we hop on a call to discuss pricing and features?\n\nBest,\nAlice Smith\nCTO, BigCorp") }
        },
        labelIds: ['INBOX']
    },
    {
        id: 'mock-2',
        snippet: 'Do you offer a free trial? I would like to test the tool before...',
        payload: {
            headers: [
                { name: 'From', value: 'Bob Jones <bob@startup.io>' },
                { name: 'Subject', value: 'Free Trial Question' },
                { name: 'Date', value: new Date(Date.now() - 3600000).toISOString() }
            ],
            body: { data: btoa("Hello,\n\nDo you offer a free trial? I would like to test the tool before committing to a subscription.\n\nThanks,\nBob") }
        },
        labelIds: ['INBOX', 'UNREAD']
    },
    {
        id: 'mock-3',
        snippet: 'Meeting confirmation. See you tomorrow at 10 AM.',
        payload: {
            headers: [
                { name: 'From', value: 'Charlie Day <charlie@consulting.net>' },
                { name: 'Subject', value: 'Re: Meeting' },
                { name: 'Date', value: new Date(Date.now() - 86400000).toISOString() }
            ],
            body: { data: btoa("On Mon, Feb 12, 2026 at 9:00 AM, You wrote:\n> Can we meet?\n\nMeeting confirmation. See you tomorrow at 10 AM.\n\n- Charlie") }
        },
        labelIds: ['INBOX']
    }
];

export const GmailService = {
    initialize: async () => {
        console.log('[Demo] GmailService initialized (Mock)');
    },
    signIn: async () => {
        console.log('[Demo] Gmail sign in clicked (Disabled)');
        alert('Gmail integration is disabled in Demo mode.');
        throw new Error('Gmail integration disabled in Demo mode');
    },
    signOut: async () => {
        console.log('[Demo] Gmail sign out');
    },
    isSignedIn: () => true, // Return true to show emails immediately
    getUserProfile: async () => ({
        getEmail: () => 'demo@example.com',
        getName: () => 'Demo User',
        getImageUrl: () => ''
    }),
    listMessages: async () => MOCK_EMAILS.map(e => ({ id: e.id, threadId: e.id })),
    getMessage: async (id: string) => {
        const mail = MOCK_EMAILS.find(e => e.id === id);
        return mail || null;
    },
    getHeader: (message: any, name: string) => {
        const header = message.payload.headers.find((h: any) => h.name === name);
        return header ? header.value : '';
    },
    getBody: (message: any) => {
        const data = message.payload.body.data;
        return atob(data);
    },
    sendEmail: async () => {
        console.log('[Demo] Sending email simulated');
        return {};
    }
};
