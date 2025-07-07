import { Outlet, useNavigate, useParams } from "react-router";
import Header from "../components/Header";
import { useEffect } from "react";
import useCommuStore from "../stores/communityStore";
import useUserStore from "../stores/userStore";
 function Communitylayouts ()  {
  const {communityname} = useParams()
  const fecthinfo = useCommuStore(state=>state.actionfecthinfo)
  const community = useCommuStore(state=>state.community)
  const navitgate = useNavigate()
  const token = useUserStore(state=>state.token)
  useEffect( ()=>{
     fecthinfo(communityname,token)
     
  },[communityname])
 
  if(!community){
      navitgate("/", { replace: true })
    }

  return (
    <>
    <Header/>
    <Outlet />
    </> 
  )
}
export default Communitylayouts