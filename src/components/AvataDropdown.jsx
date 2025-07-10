import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import Avatar from "./Avatar"
import useUserStore from "../stores/userStore"
import { Link,  } from "react-router"
function AvataDropdown({...resProps}) {
  
    const logout = useUserStore(state=>state.logout)
    return (
        <Menu as="div" className="relative inline-block text-left top-2 right-2">

            <MenuButton className="hover:cursor-pointer focus:outline-none ">
                <Avatar {...resProps} />
            </MenuButton>



            <MenuItems className="absolute  right-0 mt-2 w-56  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                <div className="py-1">
                    <MenuItem className="hover:bg-gray-200">

                        <Link  to="/me" className='text-gray-700 block px-4 py-2 text-sm' >
                            My Profile
                        </Link>

                    </MenuItem>
                   
                    <div className="border-t border-gray-100 my-1"></div>
                    <MenuItem className="hover:bg-gray-200" >
                        <div className='text-gray-700 block px-4 py-2 text-sm' onClick={logout}>
                            Logout
                        </div>
                    </MenuItem>
                </div>
            </MenuItems>

        </Menu>
    )
}
export default AvataDropdown