import { createClient as createSupabaseClient } from "@supabase/supabase-js"

/**
 * Return a Supabase client.
 * • If the required env-vars exist we use them.
 * • If they are missing (e.g. inside the v0 preview sandbox) we create a
 *   placeholder client that safely no-ops every method so the UI can render
 *   without crashing.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (url && key) {
    return createSupabaseClient(url, key)
  }

  // ------- development / preview fallback -------
  console.warn(
    "[Supabase] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY " + "are missing – running in offline mode.",
  )

  /**
   * A tiny mock that mimics the supabase-js query-builder so that chained calls
   * like `.select().eq().order().single()` won’t throw in the preview sandbox.
   * Each call just returns the same builder; when the builder is awaited it
   * resolves to a safe default `{ data: [], error: null }`.
   */
  const buildQuery = () => {
    const builder: any = {
      select: () => builder,
      insert: () => Promise.resolve({ data: null, error: new Error("offline") }),
      update: () => builder,
      delete: () => builder,
      eq: () => builder,
      order: () => builder,
      single: () =>
        Promise.resolve({
          data: null,
          error: new Error("offline"),
        }),
      // allow `await builder`
      then: (onFulfilled: any) => onFulfilled({ data: [], error: null }), // default empty data
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

  return stub as unknown as ReturnType<typeof createSupabaseClient>
}
