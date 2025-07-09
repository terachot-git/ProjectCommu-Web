import useCommuStore from "../stores/communityStore"
import Button from "./Button"
import ProfilecCommu from "./ProfileCommu"
import CommunitySidebar from "./sidebar/CommunitySidebar"
import useUserStore from "../stores/userStore"
import { userApi } from "../api/userapi"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import { modApi } from "../api/modapi"
import Members from "../pages/Members"
import ProfilecMember from "./ProfileMember"
import Profile from "./Profile"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react"
import { Ellipsis } from "lucide-react"
function ModMemberMaincontain() {
  const community = useCommuStore(state => state.community)
  const member = useCommuStore(state => state.member)
  const memberrole = useCommuStore(state => state.memberrole)
  const user = useUserStore(state => state.user)
  const token = useUserStore(state => state.token)
  const fecthCommu = useUserStore(state => state.actionfecthCommu)
  const { communityname } = useParams()
  // console.log(community)
  // console.log(member)
  // console.log(memberrole)
  const [allmember, SetAllmember] = useState([])

  const fetchData = async () => {
    try {
      const result = await modApi.get(`/members/${communityname}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      const newdata = result.data.members.map(el => {
        return {
          ...el,
          isChange: false
        };
      })

      SetAllmember(newdata);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {

    fetchData();

  }, [])
  const ALL_ROLES = [
    { id: 'MODERATOR', name: 'MODERATOR' },
    { id: 'MEMBER', name: 'MEMBER' },
  ];
  const handleRoleChange = (memberIndex, newRole) => {
    SetAllmember(currentMembers => {
      currentMembers[memberIndex].role = newRole
      currentMembers[memberIndex].isChange = true
      return [...currentMembers]
    }

    );

  };

  return (
    <div className="h-[400vh]">
      <div className=" left-3/16 top-[50px] relative  w-12/16   h-full">
        <div
          className='top-10 left-6 z-10 relative shrink-0  bg-gray-200 text-gray-600  h-[250px]'
        >

          {community?.communityBanner && <img
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
        <div className="flex flex-col ml-12 gap-7 mt-8">
          <div className="flex">
            <p className="left-10 relative basis-2/6 font-bold">Name in commununity</p>
            <p className="left-8 relative basis-2/6 font-bold">Username</p>
            <p className=" left-6 relative font-bold">Role</p>
          </div>

          {allmember.map((el, index) => {
            if (el.role == "ADMIN") {
              return (
                <div key={index}>
                  <div className="flex">
                    <div className="basis-2/6">
                      <ProfilecMember member={el} community={community} />
                    </div>

                    <div className="basis-2/6">
                      <Profile src={el.user.profileImage} user={el.user} />
                    </div>
                    <div className="relative top-2 font-bold text-2xl text-violet-500">{el.role}</div>
                  </div>
                  <div className="border-t border-gray-300 my-4 "></div>
                </div>
              )
            }
            return (
              <div key={index}>
                <div className="flex">

                  <div className="basis-2/6">
                    <ProfilecMember member={el} community={community} />
                  </div>

                  <div className="basis-2/6">
                    <Profile src={el.user.profileImage} user={el.user} />
                  </div>
                  <div className="relative  font-bold right-2 ">
                    <Listbox value={el.role} onChange={(newrole) => {
                      console.log(newrole)
                      handleRoleChange(index, newrole)
                    }}>
                      <div className="relative  ">
                        <ListboxButton className="relative w-32 cursor-pointer rounded-lg text-violet-500 bg-violet-200 py-2 px-2  text-center shadow-md hover:bg-violet-500 hover:text-violet-200 ">
                          <div>{el.role}</div>
                        </ListboxButton>

                        <ListboxOptions className="absolute z-10 mt-1  max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg font-md ">
                          {ALL_ROLES.map((role) => (
                            <ListboxOption
                              key={role.id}
                              className="my-2 cursor-pointer p-2 hover:bg-gray-300"
                              value={role.id}
                            >
                              <p>{role.id}</p>
                            </ListboxOption>
                          ))}
                        </ListboxOptions>

                      </div>
                    </Listbox>

                  </div>
                  <div className="relative  self-end left-1/12 bottom-2">

                    <Button>Delete</Button>
                    {el.isChange &&
                      <Button>Save</Button>

                    }
                    
                  </div>
                </div>

                <div className="border-t border-gray-300 my-4 "></div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default ModMemberMaincontain