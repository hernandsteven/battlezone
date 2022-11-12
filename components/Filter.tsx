import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { BsArrowDownShort } from 'react-icons/bs'

const Filter = () => {
	const [clicked, setClicked] = useState(false)
	const [filter, setFilter] = useState('')
	const [games, setGames] = useState([
		'CS:GO',
		'Valorant',
		'Apex Legends',
		'Rocket League',
		'Hearthstone',
	])
	const [regions, setRegions] = useState([
		'North America',
		'Europe',
		'Asia',
		'Australia',
		'South America',
	])
	const [platforms, setPlatforms] = useState([
		'PC',
		'Xbox',
		'Playstation',
		'Switch',
	])

	const handleClick = (filterType: string) => {
		if (filterType === '' || filterType === filter) {
			setClicked(!clicked)
			setFilter('')
		} else {
			setClicked(false)
			setTimeout(() => {
				setClicked(true)
			}, 300)
		}

		if (filterType === 'game') {
			setFilter('game')
		} else if (filterType === 'platform') {
			setFilter('platform')
		} else if (filterType === 'region') {
			setFilter('region')
		}
	}

	const handleFilter = (filterType: string) => {
		if (filterType === 'game') {
			return (
				<div className="flex flex-row">
					{games.map((game) => (
						<div className="flex flex-col items-center p-2">
							<div className="flex items-center justify-center w-20 h-20 m-2 bg-gray-200 rounded-md"></div>
							<h1>{game}</h1>
						</div>
					))}
				</div>
			)
		} else if (filterType === 'platform') {
		} else if (filterType === 'region') {
		}
	}
	return (
		<>
			<div className="flex flex-row border-b border-tertiary h-32 bg-secondary text-xl">
				<div
					onClick={() => handleClick('game')}
					className="flex flex-1 flex-row border-r border-tertiary h-full items-center justify-between p-4 gap-2 cursor-pointer"
				>
					<h1 className="flex flex-1">Select your game</h1>
					<motion.div
						animate={{
							rotate: clicked && filter === 'game' ? -180 : 0,
						}}
						transition={{
							duration: 0.3,
						}}
					>
						<BsArrowDownShort className="flex flex-1 text-3xl" />
					</motion.div>
				</div>
				<div
					onClick={() => handleClick('region')}
					className="flex flex-1 flex-row border-r border-tertiary h-full items-center justify-between p-4 gap-2 cursor-pointer"
				>
					<h1 className="">Select Region</h1>
					<motion.div
						animate={{
							rotate: clicked && filter === 'region' ? -180 : 0,
						}}
						transition={{
							duration: 0.3,
						}}
					>
						<BsArrowDownShort className="flex flex-1 text-3xl" />
					</motion.div>
				</div>
				<div
					onClick={() => handleClick('platform')}
					className="flex flex-1 flex-row h-full items-center justify-between p-4 gap-2 cursor-pointer"
				>
					<h1 className="">Select Platform</h1>
					<motion.div
						animate={{
							rotate: clicked && filter === 'platform' ? -180 : 0,
						}}
						transition={{
							duration: 0.3,
						}}
					>
						<BsArrowDownShort className="flex flex-1 text-3xl" />
					</motion.div>
				</div>
			</div>
			<AnimatePresence>
				{clicked && (
					<motion.div
						key="content"
						initial="collapsed"
						animate="open"
						exit="collapsed"
						variants={{
							open: {
								opacity: 1,
								height: 'auto',
							},
							collapsed: {
								opacity: 0,
								height: 0,
							},
						}}
						transition={{
							duration: 0.8,
							ease: [0.04, 0.62, 0.23, 0.98],
						}}
						className="relative z-10 flex flex-row bg-blue-50 h-44"
					>
						<motion.div
							key="filtercontent"
							initial="collapsed"
							animate="open"
							exit="collapsed"
							variants={{
								open: {
									opacity: 1,
								},
								collapsed: {
									opacity: 0,
								},
							}}
							transition={{
								duration: 0.5,
								ease: [0.04, 0.62, 0.23, 0.98],
							}}
							className="p-4 bg-quaternary w-full whitespace-pre-wrap border-b-8 border-tertiary"
						>
							{(filter === 'game' && handleFilter(filter)) ||
								(filter === 'region' && handleFilter(filter)) ||
								(filter === 'platform' && handleFilter(filter))}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}

export default Filter
