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
	const session = useSession()
	const user = useUser()

	return (
		<>
			<div className="flex bg-primary h-[100vh] w-full p-4">
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
					<div className="flex mx-auto self-center">
						<h1 className="text-white text-2xl">{user?.id}</h1>
						<button onClick={() => {}}>Update me</button>
					</div>
				)}
			</div>
		</>
	)
}
