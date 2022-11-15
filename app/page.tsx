'use client'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import {
	Session,
	useSession,
	useSupabaseClient,
	useUser,
} from '@supabase/auth-helpers-react'
import useSessionStore from '../stores/sessionStore'
import { useEffect, useState } from 'react'

export default function Home() {
	const supabase = useSupabaseClient()
	const setSession = useSessionStore((state) => state.setSession)
	const session = useSession()
	const [localSession, setLocalSession] = useState<Session | null>(null)
	const [displayName, setDisplayName] = useState<string | null>(null)

	useEffect(() => {
		if (session) {
			setSession(session)
			setLocalSession(session)
		} else {
			setSession(null)
			setLocalSession(null)
		}
	}, [session])

	useEffect(() => {
		setName()
	}, [])

	const updateUser = async () => {
		const { data, error } = await supabase.auth.updateUser({
			data: { displayName: 'Slick' },
		})

		setName()
	}

	const setName = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser()

		if (user) {
			setDisplayName(user.user_metadata.displayName)
		}
	}

	return (
		<>
			<div className="flex bg-primary h-[100vh] w-full p-4">
				{!localSession && (
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
				)}
				{localSession && (
					<div className="flex mx-auto self-center">
						<h1 className="text-white text-2xl">
							Welcome {displayName}
						</h1>
						<button
							onClick={() => {
								updateUser()
							}}
						>
							Update me
						</button>
					</div>
				)}
			</div>
		</>
	)
}
