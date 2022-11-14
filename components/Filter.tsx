'use client'
import { Session } from '@supabase/auth-helpers-nextjs'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BsArrowDownShort } from 'react-icons/bs'
import useFilterStore from '../stores/filterStore'
import useSessionStore from '../stores/sessionStore'

const Filter = () => {
	const sessionState = useSessionStore((state) => state.session)
	const selectedGame = useFilterStore((state) => state.selectedGame)
	const setSelectedGame = useFilterStore((state) => state.setSelectedGame)
	const selectedPlatform = useFilterStore((state) => state.selectedPlatform)
	const setSelectedPlatform = useFilterStore(
		(state) => state.setSelectedPlatform
	)

	const [game, setGame] = useState('')
	const [platform, setPlatform] = useState('')
	const [region, setRegion] = useState('')

	const selectedRegion = useFilterStore((state) => state.selectedRegion)
	const setSelectedRegion = useFilterStore((state) => state.setSelectedRegion)
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

	const handleOptionClick = (option: string) => {
		if (filter === 'game') {
			setSelectedGame(option)
		} else if (filter === 'platform') {
			setSelectedPlatform(option)
		} else if (filter === 'region') {
			setSelectedRegion(option)
		}
		setClicked(false)
	}

	const handleFilter = (filterType: string) => {
		if (filterType === 'game') {
			return (
				<div className="flex flex-row">
					{games.map((game, idx) => (
						<div
							key={idx}
							className="flex flex-col items-center p-2 text-tertiary"
							onClick={() => {
								handleOptionClick(game)
							}}
						>
							<div className="flex items-center justify-center w-20 h-20 m-2 border-2 border-gray-200 rounded-md"></div>
							<h1 className="text-md font-semibold">{game}</h1>
						</div>
					))}
				</div>
			)
		} else if (filterType === 'region') {
			return (
				<div className="flex flex-row gap-2">
					{regions.map((region, idx) => (
						<div
							key={idx}
							className="flex items-center p-2 border-2 bg-gray-200 border-tertiary hover:border-secondary rounded-md cursor-pointer text-tertiary"
							onClick={() => {
								handleOptionClick(region)
							}}
						>
							<h1 className="text-md font-semibold">{region}</h1>
						</div>
					))}
				</div>
			)
		} else if (filterType === 'platform') {
			return (
				<div className="flex flex-row gap-2">
					{platforms.map((platform, idx) => (
						<div
							key={idx}
							className="flex items-center p-2 border-2 bg-gray-200 border-tertiary hover:border-secondary rounded-md cursor-pointer text-tertiary"
							onClick={() => {
								handleOptionClick(platform)
							}}
						>
							<h1 className="text-md font-semibold">
								{platform}
							</h1>
						</div>
					))}
				</div>
			)
		}
	}
	const [localSession, setLocalSession] = useState<Session | null>(null)

	useEffect(() => {
		if (sessionState) {
			setLocalSession(sessionState)
		} else {
			setLocalSession(null)
		}
	}, [sessionState])

	useEffect(() => {
		if (sessionState) {
			setGame(selectedGame)
			setRegion(selectedRegion)
			setPlatform(selectedPlatform)
		}
	})

	return (
		<>
			{localSession && (
				<>
					<div className="flex flex-row border-b border-tertiary h-32 bg-secondary text-xl">
						<div
							onClick={() => handleClick('game')}
							className="flex flex-1 flex-row border-r border-tertiary h-full items-center justify-between p-4 gap-2 cursor-pointer"
						>
							<h1 className="whitespace-nowrap">
								{game ? game : 'Select your game'}
							</h1>
							<motion.div
								animate={{
									rotate:
										clicked && filter === 'game' ? -180 : 0,
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
							<h1 className="whitespace-nowrap">
								{region ? region : 'Select Region'}
							</h1>
							<motion.div
								animate={{
									rotate:
										clicked && filter === 'region'
											? -180
											: 0,
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
							<h1 className="whitespace-nowrap">
								{platform ? platform : 'Select Platform'}
							</h1>
							<motion.div
								animate={{
									rotate:
										clicked && filter === 'platform'
											? -180
											: 0,
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
									{(filter === 'game' &&
										handleFilter(filter)) ||
										(filter === 'region' &&
											handleFilter(filter)) ||
										(filter === 'platform' &&
											handleFilter(filter))}
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>
				</>
			)}
		</>
	)
}

export default Filter
