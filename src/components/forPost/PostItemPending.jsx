import ProfilecMember from "../ProfileMember"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { Ellipsis } from 'lucide-react';
import useUserStore from "../../stores/userStore";
import { modApi } from "../../api/modapi";
import { useParams } from "react-router";
function PostItemPending({ post , fetchPost }) {
  const user = useUserStore(state => state.user)
  const token = useUserStore(state => state.token)
   const { communityname } = useParams()
  console.log(post)
  const hdlApprove = async (postid) => {
   const res = await modApi.patch(`/posts/${communityname}`,{postid:postid,poststatus:"APPROVED"}, {headers: {
        Authorization: `Bearer ${token}`,
      }})
      console.log(res)
      fetchPost()
  }
   const hdlRemove = async (postid) => {
   const res = await modApi.patch(`/posts/${communityname}`,{postid:postid,poststatus:"REMOVED"}, {headers: {
        Authorization: `Bearer ${token}`,
      }})
      console.log(res)
      fetchPost()
  }
  return (
    <div className="w-[600px] px-4 py-4 text-violet-500 bg-pink-50  border-gray-300 border-1 mx-auto rounded-xl shadow-xl space-y-3 "  >
      <div className="flex justify-start gap-4">
        <ProfilecMember member={post?.authorMembership} community={post?.authorMembership?.community} size="sm" textsize="sm" />
        <p className="self-center flex-1 text-gray-400">Wait for approve</p>
        <Menu as="div" className="relative inline-block text-left  ">
          <MenuButton className="hover:cursor-pointer focus:outline-none hover:scale-125 ">
            <Ellipsis />
          </MenuButton>
          <MenuItems className="absolute  right-0 mt-2 w-fit  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none   ">
            <div className="py-1 ">
              <MenuItem className="hover:bg-gray-200 cursor-pointer ">
                <div className='text-gray-700 block px-4 py-2 text-xs' onClick={()=>hdlApprove(post.id)}>
                  Approve
                </div>
              </MenuItem>

              <MenuItem className="hover:bg-gray-200 cursor-pointer">
                <div className='text-gray-700 block px-4 py-2 text-xs' onClick={()=>hdlRemove(post.id)}>
                  Remove
                </div>
              </MenuItem>

              {(user?.id == post?.authorUserId) && <MenuItem className="hover:bg-gray-200 cursor-pointer">
                <div className='text-gray-700 block px-4 py-2 text-xs' >
                  Edit
                </div>
              </MenuItem>

              }


              {(user?.id == post?.authorUserId) && <MenuItem className="hover:bg-gray-200 cursor-pointer" >
                <div className='text-gray-700 block px-4 py-2 text-xs' >
                  Delete
                </div>
              </MenuItem>}
            </div>
          </MenuItems>

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
export default PostItemPending