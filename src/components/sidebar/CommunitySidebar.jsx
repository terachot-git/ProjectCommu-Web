import useCommuStore from "../../stores/communityStore"
import Button from "../Button"
import ProfilecMember from "../ProfileMember"
import useUserStore from "../../stores/userStore"
function CommunitySidebar() {
  const community = useCommuStore(state => state.community)
  const member = useCommuStore(state => state.member)
  const memberrole = useCommuStore(state => state.memberrole)
  const user = useUserStore(state=>state.user)
  return (
    <>
      <div className='left-14/16 sticky top-[78px] h-fit rounded-xl p-4 w-4/16 bg-violet-100 overflow-auto flex flex-col  min-w-[220px]  border-r-1 border-gray-200  break-words gap-2'>
        <p className="text-2xl font-bold text-violet-500">{community?.communityname}</p>
        <p className="text-md break-words text-violet-500">{community?.communitydetail}</p>
        <div className="border-t border-gray-400 my-4 "></div>
        <p className="text-2xl font-bold text-violet-500">Membersname</p>
        <div className="flex justify-between text-violet-500">

          <ProfilecMember member={member} community={community} size="sm" textsize="sm" />
          { user && memberrole!="GUEST" && <Button>
            Edit
          </Button>
          }
        </div>
        <div className="border-t border-gray-400 my-4 "></div>
      </div>

    </>
  )
}
export default CommunitySidebar