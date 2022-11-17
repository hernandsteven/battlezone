import React from 'react'
import TournamentCard from './TournamentCard'

interface TournamentsProps {
	tournaments: {}
}

export default function Tournaments({ tournaments }: TournamentsProps) {
	return (
		<div className="w-4/6 self-center max-w-fit">
			<h1 className="text-3xl text-center font-semibold underline underline-offset-8 decoration-quaternary p-4">
				Tournaments
			</h1>
			<section className="m-4 grid grid-flow-col grid-cols-2 grid-rows-2 gap-10">
				<TournamentCard title="Fortnite PC Cash Cup" />
				<TournamentCard title="Fortnite PC Cash Cup" />
				<TournamentCard title="Fortnite PC Cash Cup" />
				<TournamentCard title="Fortnite PC Cash Cup" />
			</section>
		</div>
	)
}
