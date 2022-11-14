import { Session } from '@supabase/auth-helpers-nextjs'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface SessionState {
    session: Session | null
    setSession: (session: Session | null) => void
}

const useSessionStore = create<SessionState>()(
    devtools(
        persist(
            (set) => ({
                session: null,
                setSession: (session) => set({ session }),
            }),{
                name: 'session-storage',
            }

        )
    )
)

export default useSessionStore

