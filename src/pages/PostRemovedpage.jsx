import { useEffect, useState } from "react"
import { communityApi } from "../api/communityapi"
import useUserStore from "../stores/userStore"
import PostItemRemoved from "../components/forPost/PostItemRemoved"
import { useParams } from "react-router"


function PostRemovedpage() {
  const token = useUserStore(state => state.token)
    const { communityname } = useParams()
  const [allPosts,SetAllPosts] = useState([])
  const fecthPendingPosts = async () => {
    const allpostsinfo =  await communityApi.get(`/posts/${communityname}`, {
      params: {
        poststatus: 'REMOVED'
      },
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    // console.log(allpostsinfo.data.posts)
    SetAllPosts(allpostsinfo.data.posts)

  }
  useEffect(()=>{
  fecthPendingPosts()
  },[])

    // console.log(allPosts)
  return (
    <div className="    h-fit flex flex-col gap-4">

   {
    allPosts.length>0 && allPosts.map(el => (
          <PostItemRemoved key={el.id} post={el} fetchPost={fecthPendingPosts} />
        ))
    }


    </div>
  )
}
export default PostRemovedpage