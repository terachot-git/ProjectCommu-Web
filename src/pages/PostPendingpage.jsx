import { useEffect, useState } from "react"
import { communityApi } from "../api/communityapi"
import useUserStore from "../stores/userStore"
import PostItemPending from "../components/forPost/PostItemPending"
import { useParams } from "react-router"


function PostPendingpage() {
   const { communityname } = useParams()
  const token = useUserStore(state => state.token)
  const [allPosts,SetAllPosts] = useState([])
  const fecthPendingPosts = async () => {
    const allpostsinfo =  await communityApi.get(`/posts/${communityname}`, {
      params: {
        poststatus: 'PENDING'
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
          <PostItemPending key={el.id} post={el} fetchPost={fecthPendingPosts} />
        ))
    }


    </div>
  )
}
export default PostPendingpage