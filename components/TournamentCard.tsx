interface TournamentCardProps {
	title: string
	image?: string
}

export default function TournamentCard({ title, image }: TournamentCardProps) {
	return (
		<div className="h-96 rounded cursor-pointer w-96">
			<div className="h-4/6 bg-white bg-opacity-20 backdrop-blur-lg rounded-t-md p-1 ">
				<div
					style={{
						backgroundImage:
							"url('https://nhygifndfvbiyhouicmk.supabase.co/storage/v1/object/public/images/games/halo-infinite.jpg?t=2022-11-15T03%3A14%3A29.994Z')",
					}}
					className="bg-no-repeat bg-cover bg-center w-full h-full rounded-t-md"
				></div>
			</div>
			<div className="h-2/6 mt-1 bg-quaternary bg-opacity-70 backdrop-blur-lg rounded-b-md ">
				<h1>{title}</h1>
			</div>
		</div>
	)
}
