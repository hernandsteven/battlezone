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
			<section className="m-4 grid grid-cols-2 grid-flow-dense gap-12">
				<TournamentCard title="Halo Infinite HCS FFA Tournament" />
				<TournamentCard title="Halo Infinite HCS FFA Tournament" />
				<TournamentCard title="Halo Infinite HCS FFA Tournament" />
				<TournamentCard title="Halo Infinite HCS FFA Tournament" />
				<TournamentCard title="Halo Infinite HCS FFA Tournament" />
				<TournamentCard title="Halo Infinite HCS FFA Tournament" />
				<TournamentCard title="Halo Infinite HCS FFA Tournament" />
				<TournamentCard title="Halo Infinite HCS FFA Tournament" />
				<TournamentCard title="Halo Infinite HCS FFA Tournament" />
			</section>
		</div>
	)
}
