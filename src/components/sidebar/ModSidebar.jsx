import { HomeIcon, PlusIcon, StickyNote, UserRoundPen } from "lucide-react"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"
import CreateCommunityModal from "../modal/CreateCommunityModal";
import useUserStore from "../../stores/userStore";
import ProfilecCommu from "../ProfileCommu";
function ModSidebar() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const user = useUserStore(state => state.user)
	const commu = useUserStore(state => state.commu)
	const { communityname } = useParams()
	// console.log(user)
	// console.log(commu)
	const openModal = (e) => {
		e.stopPropagation();
		setModalIsOpen(true);
	}

	return (
		<>
			<div className='hidden  xl:flex fixed top-[78px] h-full w-3/16  overflow-auto  flex-col  border-r-1 border-gray-200'>
				<Link to="/" className="w-full hover:bg-gray-200 p-2 h-[64]">
					<div className="flex items-center">
						<HomeIcon className="w-12 h-12 " />
						{user ? <p className="font-bold text-2xl px-2">Home</p> : <p className="font-bold text-2xl px-2">login</p>}
					</div>
				</Link>
				<div className="border-t border-gray-300 "></div>
				<div className="w-full  p-2 h-[64]">
					<div className="flex  flex-col items-start">
						<p className="font-bold text-3xl px-2 pb-4">Moderation</p>

						{user && <div onClick={openModal} className="w-full hover:bg-gray-200 p-2 h-[60] hover:cursor-pointer">

							<div className="flex items-center ">
								<PlusIcon className="w-8 h-8 " />
								<p className="font-bold text-xl px-2">Create community</p>
							</div>
						</div>}
						{commu.map(el => {
							if (el.role == 'ADMIN' || el.role == 'MODERATOR') {
								// console.log(el)
								return (
									<div key={el?.community?.id} className="w-full hover:bg-gray-200 p-2 h-[60] hover:cursor-pointer">
										<Link to={`/commu/${el?.community?.communityname}`}>
											<ProfilecCommu src={el?.community?.communityIcon} community={el?.community} size="sm" textsize="md" />
										</Link>
									</div>
								)
							}
						})}
					</div>
				</div>
				<div className="border-t border-gray-300 my-1"></div>

				<div className="w-full  p-2 h-[64]">
					<div className="flex  flex-col items-start">
						<p className="font-bold text-3xl px-2 pb-4">TOOL</p>
							<div className="w-full text-2xl font-bold hover:bg-gray-200 p-2 h-[60] hover:cursor-pointer">
							<Link to={`/mod/posts/${communityname}`}>
								<div className="flex justify-between items-baseline">
									<p>Mod Posts</p>
									<StickyNote /> 
									</div>
							</Link>
						</div>
						<div className="w-full text-2xl font-bold hover:bg-gray-200 p-2 h-[60] hover:cursor-pointer">
							<Link to={`/mod/members/${communityname}`}>
								<div className="flex justify-between items-baseline">
									<p>Mod members</p>
									<UserRoundPen />
									</div>
							</Link>
						</div>
					
					</div>
				</div>
			</div>
			<CreateCommunityModal isModalOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
		</>
	)
}

export default ModSidebar