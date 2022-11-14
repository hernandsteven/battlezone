'use client'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import {
	Session,
	useSession,
	useSupabaseClient,
} from '@supabase/auth-helpers-react'
import useSessionStore from '../stores/sessionStore'
import { useEffect, useState } from 'react'

export default function Home() {
	const supabase = useSupabaseClient()
	const setSession = useSessionStore((state) => state.setSession)
	const sessionState = useSessionStore((state) => state.session)
	const session = useSession()
	const [localSession, setLocalSession] = useState<Session | null>(null)

	useEffect(() => {
		if (session) {
			setSession(session)
			setLocalSession(session)
		} else {
			setSession(null)
			setLocalSession(null)
		}
	}, [session])
	return (
		<>
			<div className="flex bg-primary h-[100vh] w-full p-4">
				{!localSession ? (
					<div className="flex mx-auto self-center">
						<Auth
							supabaseClient={supabase}
							appearance={{
								theme: ThemeSupa,
								style: {
									button: {
										background: 'orange',
										borderColor: 'orange',
									},
								},
							}}
							theme="dark"
						/>
					</div>
				) : (
					<h1>User is authenticated</h1>
				)}
			</div>
		</>
	)
}
