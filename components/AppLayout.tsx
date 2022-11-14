import { Session, useSession } from '@supabase/auth-helpers-react'
import React, { useEffect } from 'react'
import { Provider } from '../app/provider'
import useSessionStore from '../stores/sessionStore'
import Filter from './Filter'
import Sidebar from './Sidebar'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<div className="flex h-full">
				<Sidebar />
				<div className="flex flex-col w-full">
					<Filter />
					<div className="overflow-y-auto">{children}</div>
				</div>
			</div>
		</>
	)
}

export default AppLayout
