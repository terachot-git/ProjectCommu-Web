
import { createBrowserRouter, Navigate, RouterProvider, } from 'react-router'
import Login from '../pages/Login'
import useUserStore from '../stores/userStore'
import Homelayouts from '../layouts/Homelayouts'
import Me from '../pages/Me'
import Home from '../pages/Home'
import Communitylayouts from '../layouts/Communitylayouts'
import Community from '../pages/Community'


const guestRouter = createBrowserRouter([
	{ path: '/', element: <Login /> },
	{
		path: '/commu/:communityname',
		element: <Communitylayouts />,
		children: [
			{ index: true, element: <Community /> }
		]
	},
	{ path: '*', element: <Navigate to='/' /> },
])

const userRouter = createBrowserRouter([
	{
		path: '/', element: <Homelayouts />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'me', element: <Me /> },

		]

	},
	{
		path: '/commu/:communityname',
		element: <Communitylayouts />,
		children: [
			{ index: true, element: <Community /> }
		]
	},
	{ path: '*', element: <Navigate to='/' /> }


])

function AppRouter() {
	const user = useUserStore(state => state.user)
	const finalRouter = user ? userRouter : guestRouter
	return (

		<RouterProvider router={finalRouter} />

	)
}

export default AppRouter