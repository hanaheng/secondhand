import { createClient as createSupabaseClient } from "@supabase/supabase-js"

/**
 * Factory that returns a Supabase client.
 * • In production we create the real client using the env-vars.
 * • In preview/offline mode we fall back to a tiny stub that
 *   imitates the Supabase API so the UI can render without crashing.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // ---------- REAL SUPABASE ----------
  if (url && key) {
    return createSupabaseClient(url, key)
  }

  // ---------- OFFLINE / PREVIEW ----------
  console.warn(
    "[Supabase] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are missing – running in offline mode.",
  )

  // Small helper that mimics the Postgrest query-builder
  function buildQuery() {
    const builder: any = {
      /* chainable methods */
      select: () => builder,
      update: () => builder,
      delete: () => builder,
      eq: () => builder,
      order: () => builder,
      /* primitives that normally return promises */
      insert: () => Promise.resolve({ data: null, error: new Error("offline") }),
      single: () => Promise.resolve({ data: null, error: new Error("offline") }),
      /* allow `await builder` */
      then: (resolve: any) => resolve({ data: [], error: null }),
    }
    return builder
  }

  const stub = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe() {} } },
      }),
      signInWithPassword: async () => ({ data: null, error: new Error("offline") }),
      signUp: async () => ({ data: null, error: new Error("offline") }),
      signOut: async () => ({ error: new Error("offline") }),
    },
    from(): any {
      return buildQuery()
    },
  } as const

  // Cast to the same type that createSupabaseClient returns
  return stub as unknown as ReturnType<typeof createSupabaseClient>
}
