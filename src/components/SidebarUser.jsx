import { HomeIcon, PlusIcon } from "lucide-react"
import { Link } from "react-router"

function SidebarUser() {

	return (
		<div
			className='fixed top-[78px] h-full w-3/16  overflow-auto flex flex-col  min-w-[220px]  border-r-1 border-gray-200'>
			<Link to="/" className="w-full hover:bg-gray-200 p-2 h-[64]">
				<div className="flex items-center">
					<HomeIcon className="w-12 h-12 " />
					<p className="font-bold text-2xl px-2">Home</p>
				</div>
			</Link>
			<div className="border-t border-gray-300 "></div>
			<div className="w-full  p-2 h-[64]">
				<div className="flex items-center flex-col items-start">
					<p className="font-bold text-3xl px-2 pb-4">Moderation</p>

					<Link to="/" className="w-full hover:bg-gray-200 p-2 h-[60]">
						<div className="flex items-center ">
							<PlusIcon className="w-10 h-10 " />
							<p className="font-bold text-2xl px-2">Create comunity</p>
						</div>
					</Link>
				</div>
			</div>
			<div className="border-t border-gray-300 my-1"></div>
		
			<div className="w-full  p-2 h-[64]">
				<div className="flex items-center flex-col items-start">
					<p className="font-bold text-3xl px-2 pb-4">Community</p>
				
				</div>
			</div>

		</div>
	)
}

export default SidebarUser