'use client'
import Filter from '../components/Filter'
import Sidebar from '../components/Sidebar'
import './globals.css'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			{/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
			<head />
			<body>
				<div className="flex h-full ">
					<Sidebar />
					<div className="flex flex-col w-full">
						<Filter />
						<div className="overflow-y-auto">{children}</div>
					</div>
				</div>
			</body>
		</html>
	)
}
