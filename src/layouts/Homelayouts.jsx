import { Outlet } from "react-router";
import Header from "../components/Header";

function Homelayouts() {
  return (
    <>
    <Header/>
    <Outlet />
	 
    </> 
  )
}
export default Homelayouts