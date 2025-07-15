
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { Ellipsis } from 'lucide-react';
import useUserStore from "../../stores/userStore";
import { modApi } from "../../api/modapi";
import { useParams } from "react-router";
import useCommuStore from "../../stores/communityStore";
import ProfilecCommu from "../ProfileCommu";
import { userApi } from "../../api/userapi";
function PostItemInHome({ post, fetchPost }) {
  const user = useUserStore(state => state.user)
  const token = useUserStore(state => state.token)
  const memberrole = useCommuStore(state => state.memberrole)
  const { communityname } = useParams()
  console.log(post)

 const hdlDelete = async (postid) => {
      await userApi.delete(`/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }, data: { postid: postid }
      })
      await fetchPost()
  
    }
  return (
    <div className="w-[600px] px-4 py-4 text-violet-500 bg-pink-50  border-gray-300 border-1 mx-auto rounded-xl shadow-xl space-y-3 "  >
      <div className="flex justify-between">
        <ProfilecCommu src={post?.authorMembership?.community.communityIcon} community={post?.authorMembership?.community} size="sm" textsize="sm" />
        <Menu as="div" className="relative inline-block text-left  ">
          <MenuButton className="hover:cursor-pointer focus:outline-none hover:scale-125 ">
            <Ellipsis />
          </MenuButton>
          {(user.id == post?.authorUserId) && <MenuItems className="absolute  right-0 mt-2 w-fit  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none   ">
            <div className="py-1 ">


              <MenuItem className="hover:bg-gray-200 cursor-pointer">
                <div className='text-gray-700 block px-4 py-2 text-xs' >
                  Edit
                </div>
              </MenuItem>



              <MenuItem className="hover:bg-gray-200 cursor-pointer" >
                <div className='text-gray-700 block px-4 py-2 text-xs' onClick={()=>hdlDelete(post.id)}>
                  Delete
                </div>
              </MenuItem>
            </div>
          </MenuItems>}

        </Menu>
      </div>


      <p className="text-sm leading-relaxed text-justify hyphens-auto ">{post?.description}</p>
      {post?.postImg && <img
        src={post?.postImg}
        alt="banner"
        className=" max-h-[400px] object-cover mx-auto"
      />}
    </div>

  )
}
export default PostItemInHome