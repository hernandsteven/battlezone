'use client'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import {
	useSession,
	useSupabaseClient,
	useUser,
} from '@supabase/auth-helpers-react'
import useSessionStore from '../stores/sessionStore'
import { useEffect, useState } from 'react'
import Tournaments from '../components/Tournaments'

export default function Home() {
	const supabase = useSupabaseClient()
	const session = useSession()

	return (
		<>
			<div className="flex bg-primary w-full p-4 h-screen">
				{!session && (
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
				{session && (
					<div className="flex flex-col w-full">
						<Tournaments tournaments={{}} />
					</div>
				)}
			</div>
		</>
	)
}
