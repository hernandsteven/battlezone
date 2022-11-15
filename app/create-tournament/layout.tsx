import React from 'react'

interface TournamentLayoutProps {
	children: React.ReactNode
}

const CreateTournamentLayout = ({ children }: TournamentLayoutProps) => {
	return <div className="bg-red-200 p-4">{children}</div>
}

export default CreateTournamentLayout
