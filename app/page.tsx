'use client'
import { useState, useEffect } from 'react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Home() {
	const session = useSession()
	const supabase = useSupabaseClient()

	return (
		<div>
			<div className=" bg-primary h-[100vh] w-full p-4">
				{!session ? (
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
				) : (
					<>
						<button
							onClick={() => {
								supabase.auth.signOut()
							}}
						>
							Sign Out
						</button>
						<h1>You are signed in! {session.user.email}</h1>
					</>
				)}
			</div>
		</div>
	)
}
