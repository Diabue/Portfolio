// Supabase stub - portfolio demo version (no live connection)
export const supabase = {
    from: () => ({ select: () => Promise.resolve({ data: [], count: 0 }), insert: () => Promise.resolve({ data: null, error: null }) })
} as any;
