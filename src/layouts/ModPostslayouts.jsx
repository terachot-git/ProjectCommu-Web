import { NavLink, Outlet, useNavigate, useParams } from "react-router";
import Header from "../components/Header";
import { useEffect } from "react";
import useCommuStore from "../stores/communityStore";
import useUserStore from "../stores/userStore";

import ProfilecCommu from "../components/ProfileCommu";
import ModSidebar from "../components/sidebar/ModSidebar";



function ModPostslayouts() {
  const { communityname } = useParams()
  const fecthinfo = useCommuStore(state => state.actionfecthinfo)
  const community = useCommuStore(state => state.community)
  const navitgate = useNavigate()
  const commu = useUserStore(state => state.commu)
  const token = useUserStore(state => state.token)
  const memberrole = useCommuStore(state => state.memberrole)
  useEffect(() => {
    fecthinfo(communityname, token)

  }, [communityname, commu])

  if (!community) {
    return null;
  }

  if (!community || (memberrole != "ADMIN" && memberrole != "MODERATOR")) {

    navitgate("/", { replace: true })
    return null;
  }
 const navLinkClass = "px-4 py-2 rounded-md text-sm font-medium ";
  const activeLinkClass = "bg-violet-500 text-white";
  const inactiveLinkClass = "text-gray-500 hover:bg-pink-200 hover:text-black";
  return (
    <div className="w-full">
      <Header />
      <ModSidebar />
      <div >
        <div className=" xl:left-3/16 top-[50px] relative  w-12/16  xl:mx-0 mx-auto  h-full">
          <div
            className='top-10 left-6 z-10  relative shrink-0  bg-gray-200 text-gray-600  h-[250px]'
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
              <p className="relative top-2 text-2xl font-bold">Mod Posts</p>
            </div>
          </div>
          <div className="border-t border-gray-300 my-4 "></div>
         <div className="px-10 flex gap-4 mb-4 justify-center">
            <NavLink
              to="pending"
              className={({ isActive }) =>
                `${navLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`
              }
            >
              Pending
            </NavLink>
            <NavLink
              to="approve"
              className={({ isActive }) =>
                `${navLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`
              }
            >
              Approved
            </NavLink>
            <NavLink
              to="removed"
              className={({ isActive }) =>
                `${navLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`
              }
            >
              Removed
            </NavLink>
          </div>
          <Outlet />
        </div>
      </div>

    </div>
  )
}
export default ModPostslayouts