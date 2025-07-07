import useCommuStore from "../stores/communityStore"
import Button from "./Button"
import ProfilecCommu from "./ProfileCommu"
import CommunitySidebar from "./sidebar/CommunitySidebar"


function CommunityMaincontain() {
 const community = useCommuStore(state=>state.community)
 const member = useCommuStore(state=>state.member)
  const memberrole = useCommuStore(state=>state.memberrole)
console.log(community)
console.log(member)
console.log(memberrole)
  return (
    <div className="h-[400vh]">
    <div className=" left-1/16 w-12/16 top-[78px] relative   mx-auto h-full">
         <div
                        className='top-10 left-24 z-10 relative shrink-0  bg-gray-200 text-gray-600 w-[1200px] h-[250px]'
                    >


                      { community?.communityBanner && <img
                            src={community?.communityBanner}
                            alt="banner"
                            className="h-full w-full object-cover "
                        />}

                    </div>
        <div className="pt-6 px-28 flex items-center justify-between  ">
          <ProfilecCommu size="lg" community={community} textsize="lg" src={community?.communityIcon} />
          <div className="relative top-1 ">
          <Button>
            Moderation
          </Button>
              <Button>
            + post
          </Button>
              <Button>
            Joined
          </Button>
          </div>
        </div>
        <div className="border-t border-gray-300 my-4 "></div>
        <CommunitySidebar/>
      </div>
    </div>
  )
}
export default CommunityMaincontain