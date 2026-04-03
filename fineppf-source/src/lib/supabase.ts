// Supabase stub - portfolio demo version (no live connection)
export const supabase = {
    from: (_table: string) => ({
        insert: (_data: any) => Promise.resolve({ data: null, error: null }),
        select: (_cols?: string) => Promise.resolve({ data: [], error: null, count: 0 }),
    }),
    functions: {
        invoke: (_fn: string, _opts?: any) => Promise.resolve({ data: null, error: null })
    }
} as any;
