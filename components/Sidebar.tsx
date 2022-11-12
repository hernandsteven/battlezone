import { AiOutlineHome } from 'react-icons/ai'
import { TbTournament } from 'react-icons/tb'
import Link from 'next/link'

const Sidebar = () => {
	return (
		<div className="flex flex-col top-0 w-60 bg-tertiary mb-0 h-screen">
			<h1 className="p-4 text-3xl">BattleZone</h1>

			<div className="pl-2 pr-2">
				<div className="h-[0.1px] w-full bg-primary"></div>
			</div>

			<section className="flex flex-col text-base mt-4">
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
			</section>
		</div>
	)
}

export default Sidebar
