import { HomeIcon, PlusIcon } from "lucide-react"
import { useEffect, useState } from "react";
import { Link } from "react-router"
import CreateCommunityModal from "../modal/CreateCommunityModal";
import useUserStore from "../../stores/userStore";
import ProfilecCommu from "../ProfileCommu";
function SidebarUser() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const user = useUserStore(state => state.user)
	const token = useUserStore(state => state.token)
	const fecthCommu = useUserStore(state=>state.actionfecthCommu)
	const commu = useUserStore(state => state.commu)
	// console.log(user)
	// console.log(commu)
	const openModal = (e) => {
		e.stopPropagation();
		setModalIsOpen(true);
	}
    useEffect(()=>{fecthCommu(token)},[])
	return (
		<>
			<div className='hidden  xl:flex fixed top-[78px] h-full w-3/16  overflow-auto  flex-col  border-r-1 border-gray-200'>
				<Link to="/" className="w-full hover:bg-gray-200 p-2 h-[64]">
					<div className="flex items-center">
						<HomeIcon className="w-12 h-12 " />
						{user?<p className="font-bold text-2xl px-2">Home</p>:<p className="font-bold text-2xl px-2">login</p>}
					</div>
				</Link>
				<div className="border-t border-gray-300 "></div>
				<div className="w-full  p-2 h-[64]">
					<div className="flex  flex-col items-start">
						<p className="font-bold text-3xl px-2 pb-4">Moderation</p>

						{user&&<div onClick={openModal} className="w-full hover:bg-gray-200 p-2 h-[60] hover:cursor-pointer">
						
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
										<Link  to={`/commu/${el?.community?.communityname}`}>
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
						<p className="font-bold text-3xl px-2 pb-4">Community</p>
						{commu.map(el => {
								 
									// console.log(el)
									return (
										<div key={el?.community?.id} className="w-full hover:bg-gray-200 p-2 h-[60] hover:cursor-pointer">
										<Link to={`/commu/${el?.community?.communityname}`}>
										<ProfilecCommu  src={el.community?.communityIcon} community={el?.community} size="sm" textsize="md" />
										</Link>
										</div>
									)
								
							})}
					</div>
				</div>
			</div>
			<CreateCommunityModal isModalOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
		</>
	)
}

export default SidebarUser