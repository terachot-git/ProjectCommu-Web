import ProfilecMember from "../ProfileMember"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { Ellipsis } from 'lucide-react';
          function PostItemInCommu() {
            return (
             <div className="w-[600px] px-4 py-4 text-violet-500 bg-pink-50  border-gray-300 border-1 mx-auto rounded-xl shadow-xl space-y-3"  >
            <div className="flex justify-between"> 
              <ProfilecMember  size="sm" textsize="sm" />
            <Menu as="div" className="relative inline-block text-left ">
              <MenuButton className="hover:cursor-pointer focus:outline-none hover:scale-125">
                 <Ellipsis/>
              </MenuButton>
              <MenuItems className="absolute  right-0 mt-2 w-fit  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                <div className="py-1">
                  <MenuItem className="hover:bg-gray-200 cursor-pointer">
                     <div className='text-gray-700 block px-4 py-2 text-xs' >
                      Edit
                    </div>
                  </MenuItem>

                  <div className="border-t border-gray-100 my-1"></div>
                  <MenuItem className="hover:bg-gray-200 cursor-pointer" >
                    <div className='text-gray-700 block px-4 py-2 text-xs' >
                      Delete
                    </div>
                  </MenuItem>
                </div>
              </MenuItems>

            </Menu>
            </div>
            

            <p className="text-sm leading-relaxed text-justify hyphens-auto ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia officiis officia impedit fugit nisi optio dolorem laborum commodi earum nobis suscipit delectus accusantium maxime accusamus dolorum mollitia corporis, architecto laboriosam.</p>
            <img
            src="https://i.redd.it/2a98x6ts60ld1.jpeg"
            alt="banner"
            className=" max-h-[400px] object-cover mx-auto"
          />
          </div>

            )
          }
          export default PostItemInCommu