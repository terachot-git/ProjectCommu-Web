
import { createBrowserRouter, Navigate, RouterProvider, } from 'react-router'
import Login from '../pages/Login'
import useUserStore from '../stores/userStore'
import Homelayouts from '../layouts/Homelayouts'
import Me from '../pages/Me'
import Home from '../pages/Home'
import Communitylayouts from '../layouts/Communitylayouts'
import Community from '../pages/Community'
import Memberslayouts from '../layouts/Memberslayouts'
import Members from '../pages/Members'
import PostPendingpage from '../pages/PostPendingpage'
import PostAppovepage from '../pages/PostApprovepage'
import ModPostslayouts from '../layouts/ModPostslayouts'


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
	{
		path: '/mod/members/:communityname',
		element: <Memberslayouts />,
		children: [
			{ index: true, element: <Members /> }
		]

	},
	 {
                path: '/mod/posts/:communityname',
                element: <ModPostslayouts />,
                children: [
                    { index: true, element: <Navigate to="pending" replace /> },
                    { path: 'pending', element: <PostPendingpage /> },
                    { path: 'approve', element: <PostAppovepage /> },
                ],
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