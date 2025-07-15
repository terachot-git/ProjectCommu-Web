import useUserStore from "../stores/userStore"
import { Weblogo } from "../icons"
import Avatar from "./Avatar"
import AvataDropdown from "./AvataDropdown"
import SearchBar from "./SearchBar"

function Header () {
  
    const user = useUserStore(state=>state.user)
  
  return (
    <>
    <div className="z-30 flex justify-items-center justify-between px-4 py-1 bg-violet-50 w-full fixed ">
      <Weblogo className="w-49 h-16"/>
      <SearchBar/>
      {user&& <AvataDropdown src={user.profileImage} ring="active"/>} 
     
    
   
    </div>

    </>
  )
}
export default  Header