import useCommuStore from "../stores/communityStore"
import Button from "./Button"
import ProfilecCommu from "./ProfileCommu"
import CommunitySidebar from "./sidebar/CommunitySidebar"
import useUserStore from "../stores/userStore"
import { userApi } from "../api/userapi"
import { useNavigate, useParams } from "react-router"
import Modal from 'react-modal';
import PostcontainInCommu from "./forPost/PostcontainInCommu"
import { useState } from "react"
import CreatePostForm from "./form/CreatePostForm"
function CommunityMaincontain() {
  const community = useCommuStore(state => state.community)
  const member = useCommuStore(state => state.member)
  const memberrole = useCommuStore(state => state.memberrole)
  const user = useUserStore(state => state.user)
  const token = useUserStore(state => state.token)
  const fecthCommu = useUserStore(state => state.actionfecthCommu)
  const fecthcommuinfo = useCommuStore(state => state.actionfecthinfo)
  const { communityname } = useParams()
  const navigate = useNavigate()
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  console.log(memberrole)

  const hdlJoin = async (usertoken) => {
    console.log(token)
    await userApi.post(`/community/${communityname}`, null, {
      headers: {
        Authorization: `Bearer ${usertoken}`,
      }
    })
    await fecthCommu()

  }
  const hdlUnjoin = async (usertoken) => {
    await userApi.delete(`/community/${communityname}`, {
      headers: {
        Authorization: `Bearer ${usertoken}`,
      }
    })
    await fecthCommu()

  }
  const hdlmod = () => {
    navigate(`/mod/members/${communityname}`)
  }


  return (
    <div  >
      <div className=" xl:left-3/16 top-[50px] relative  w-12/16 h-full xl:mx-0 mx-auto">
        <div
          className='top-10 left-6 z-10 relative shrink-0  bg-gray-200 text-gray-600  h-[250px]'
        >


          {community?.communityBanner && <img
            src={community?.communityBanner}
            alt="banner"
            className="h-full w-full object-cover "
          />}

        </div>
        <div className="pt-6 px-10 flex items-center justify-between ">

          <ProfilecCommu size="lg" community={community} textsize="lg" src={community?.communityIcon} />


          <div className="relative top-1  ">
            {(memberrole == "ADMIN" || memberrole == "MODERATOR") && <Button onClick={hdlmod}>
              Moderation
            </Button>}
            {(user && memberrole != "GUEST") && <Button onClick={openModal}>
              + post
            </Button>}
            {user && (memberrole != "GUEST" && memberrole != "ADMIN") && <Button onClick={() => hdlUnjoin(token)}>
              Joined
            </Button>}
            {user && (memberrole == "GUEST" && memberrole != "ADMIN") && <Button onClick={() => hdlJoin(token)}>
              Join
            </Button>}
          </div>
        </div>
        <div className="border-t border-gray-300 my-4 "></div>

        <div className="flex justify-center">

          <PostcontainInCommu />
          <CommunitySidebar /> </div>



      </div>


      <Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
			  shouldCloseOnOverlayClick={false}
        contentLabel="Create Post Process"
				ariaHideApp={false}
				overlayClassName="fixed  backdrop-blur-sm inset-0   flex justify-center items-center z-30"
			
				className="bg-white rounded-lg shadow-xl p-6 pb-20 w-full max-w-md outline-none backdrop-blur-sm flex flex-col"
			>
				<div className='self-end  mb-4'>
					<Button onClick={closeModal} bgColor='#FF0004' size='sm'>
						ปิด
					</Button>
				</div>
				
          <CreatePostForm closeModal={closeModal}/>  
              
			</Modal>
    </div>
  )
}
export default CommunityMaincontain