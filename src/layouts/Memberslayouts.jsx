import { Outlet, useNavigate, useParams } from "react-router";
import Header from "../components/Header";
import { useEffect } from "react";
import useCommuStore from "../stores/communityStore";
import useUserStore from "../stores/userStore";
 function Memberslayouts ()  {
  const {communityname} = useParams()
  const fecthinfo = useCommuStore(state=>state.actionfecthinfo)
  const community = useCommuStore(state=>state.community)
  const navitgate = useNavigate()
  const commu = useUserStore(state=>state.commu)
  const token = useUserStore(state=>state.token)
  const memberrole = useCommuStore(state=>state.memberrole)
  useEffect( ()=>{
     fecthinfo(communityname,token)
     
  },[communityname,commu])
  
   if (!community) {
    return null; 
  }

  if(!community||memberrole!="ADMIN"){
      
      navitgate("/", { replace: true })
       return null; 
    }
 
  return (
    <>
    <Header/>
    <Outlet />
    </> 
  )
}
export default Memberslayouts