import { Outlet, useParams } from "react-router";
import Header from "../components/Header";
import { useEffect } from "react";
import useCommuStore from "../stores/communityStore";
 function Communitylayouts ()  {
  const {communityname} = useParams()
  const fecthinfo = useCommuStore(state=>state.actionfecthinfo)
  const community = useCommuStore(state=>state.community)
  
  useEffect( ()=>{
    fecthinfo(communityname)
  },[])

  console.log(community)

  return (
    <>
    <Header/>
    <Outlet />
	 
    </> 
  )
}
export default Communitylayouts