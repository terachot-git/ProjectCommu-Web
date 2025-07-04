import { useState } from "react"
import Button from "../components/Button"
import Modal from 'react-modal';
import Profile from "../components/Profile"
import SidebarUser from "../components/SidebarUser"
import useUserStore from "../stores/userStore"
import EditUserProfileForm from "../components/EditUserProfileForm";
function Me() {
  const user = useUserStore(state => state.user)
    const [modalIsOpen, setModalIsOpen] = useState(false);
     
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
  return (
    
    <>
      <SidebarUser />
      <div className="w-10/16 top-[78px] relative h-50  mx-auto h-full ">
        <div className="pt-6 px-28 flex items-center justify-between">
          <Profile size="lg" user={user} textsize="lg" src={user.profileImage} />
          <div className="w-46 relative top-1 ">
            <Button onClick={openModal}>
            Edit Profile IMG
          </Button>
          
          </div>
        </div>
        <div className="border-t border-gray-300 my-4 "></div>
      </div>


      <Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
			    shouldCloseOnOverlayClick={false}

				overlayClassName="fixed  backdrop-blur-sm inset-0   flex justify-center items-center z-50"
			
				className="bg-white rounded-lg shadow-xl p-6 pb-20 w-full max-w-md outline-none backdrop-blur-sm flex flex-col"
			>
				<div className='self-end  mb-4'>
					<Button onClick={closeModal} bgColor='#FF0004' size='sm'>
						ปิด
					</Button>
				</div>
				
          <EditUserProfileForm closeModal={closeModal}/>  
              
			</Modal>

    </>
    
  )
}
export default Me