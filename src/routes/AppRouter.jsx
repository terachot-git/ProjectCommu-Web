
import { createBrowserRouter, Navigate, RouterProvider, } from 'react-router'
import Login from '../pages/Login'
import useUserStore from '../stores/userStore'
import Homelayouts from '../layouts/Homelayouts'
import Me from '../pages/Me'
import Home from '../pages/Home'


const guestRouter = createBrowserRouter([
	{ path: '/', element: <Login /> },
	{ path: '*', element: <Navigate to='/' /> },
])

const userRouter = createBrowserRouter([
	{ path: '/', element: <Homelayouts /> ,
	children: [
			{ index: true, element: <Home /> },
			{ path: 'me', element: <Me /> },
		
		]

	}

	
])

function AppRouter() {
		const user = useUserStore(state => state.user)
	const finalRouter = user ? userRouter : guestRouter
	return (
	
			<RouterProvider  router={finalRouter} />
	
	)
}

export default AppRouter