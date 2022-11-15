'use client'
import { AiOutlineHome } from 'react-icons/ai'
import { TbTournament } from 'react-icons/tb'
import Link from 'next/link'
import useSessionStore from '../stores/sessionStore'
import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

const Sidebar = () => {
	const supabase = useSupabaseClient()
	const sessionState = useSessionStore((state) => state.session)
	const [localSession, setLocalSession] = useState<Session | null>(null)

	useEffect(() => {
		if (sessionState) {
			setLocalSession(sessionState)
		} else {
			setLocalSession(null)
		}
	}, [sessionState])

	return (
		<div className="relative flex flex-col w-60 bg-tertiary ">
			<h1 className="p-4 text-3xl">BattleZone</h1>

			<section className="relative flex flex-col text-base mt-4 font-semibold">
				<Link
					href="/"
					className="flex gap-3 items-end w-full flex-row p-6 border-b border-t"
				>
					<AiOutlineHome className="text-2xl" />
					<h1>Home</h1>
				</Link>
				<Link
					href="/create-tournament"
					className="flex gap-2 w-full flex-row p-6 whitespace-nowrap border-b"
				>
					<TbTournament className="text-3xl" />
					<h1>Create Tournaments</h1>
				</Link>
				{localSession && (
					<button
						className="bg-quaternary border-solid border-12 border-primary p-2 m-12 rounded-md"
						onClick={() => {
							supabase.auth.signOut()
						}}
					>
						Sign Out
					</button>
				)}
			</section>
		</div>
	)
}

export default Sidebar
