import useCommuStore from "../stores/communityStore"
import Button from "./Button"
import ProfilecCommu from "./ProfileCommu"
import CommunitySidebar from "./sidebar/CommunitySidebar"
import useUserStore from "../stores/userStore"
import { userApi } from "../api/userapi"
import { useParams } from "react-router"
function ModMemberMaincontain() {
const community = useCommuStore(state=>state.community)
const member = useCommuStore(state=>state.member)
const memberrole = useCommuStore(state=>state.memberrole)
const user = useUserStore(state=>state.user)
const token = useUserStore(state=>state.token)
const fecthCommu = useUserStore(state=>state.actionfecthCommu)
const {communityname} = useParams()
console.log(community)
console.log(member)
console.log(memberrole)

const hdlJoin =async (usertoken)=> {
  console.log(token)
  await userApi.post(`/community/${communityname}`,null,{
			headers: {
				Authorization: `Bearer ${usertoken}`,
			}
		})
  await fecthCommu()
}
const hdlUnjoin =async (usertoken)=> {
  await userApi.delete(`/community/${communityname}`,{
			headers: {
				Authorization: `Bearer ${usertoken}`,
			}
		})
 await fecthCommu()
} 



  return (
    <div className="h-[400vh]">
    <div className=" left-3/16 top-[50px] relative  w-12/16   h-full">
         <div
                        className='top-10 left-6 z-10 relative shrink-0  bg-gray-200 text-gray-600  h-[250px]'
                    >


                      { community?.communityBanner && <img
                            src={community?.communityBanner}
                            alt="banner"
                            className="h-full w-full object-cover "
                        />}

                    </div>
        <div className="pt-6 px-10 flex items-center justify-between  ">
          <ProfilecCommu size="lg" community={community} textsize="lg" src={community?.communityIcon} />
          <div className="relative top-1 ">
          <p className="relative top-2 text-2xl font-bold">Mod Members</p>
          </div>
        </div>
        <div className="border-t border-gray-300 my-4 "></div>
    
      </div>
    </div>
  )
}
export default ModMemberMaincontain