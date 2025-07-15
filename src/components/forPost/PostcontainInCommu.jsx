import { useEffect, useState } from "react"
import { communityApi } from "../../api/communityapi"

import useCommuStore from "../../stores/communityStore"

import PostItem from "../../components/forPost/PostItem"
import { useParams } from "react-router"
import PostItemPending from "./PostItemPending"



function PostcontainInCommu() {
  const { communityname } = useParams()
  const memberrole = useCommuStore(state => state.memberrole)
  const [allApprovedPosts, SetAllApprovedPosts] = useState([])
  const [allPendingPosts, SetAllPendingPosts] = useState([])
  const fecthApprovedPosts = async () => {
    const allpostsinfo = await communityApi.get(`/posts/${communityname}`, {
      params: {
        poststatus: 'APPROVED'
      },
    })
    // console.log(allpostsinfo.data.posts)
    SetAllApprovedPosts(allpostsinfo.data.posts)

  }
  const fecthPendingPosts = async () => {
    const allpostsinfo = await communityApi.get(`/posts/${communityname}`, {
      params: {
        poststatus: 'PENDING'
      },
    })
    // console.log(allpostsinfo.data.posts)
    SetAllPendingPosts(allpostsinfo.data.posts)

  }



  useEffect(() => {
    fecthApprovedPosts()
    
      fecthPendingPosts()
  
  }, [communityname])



  return (
    <div className="    h-fit flex flex-col gap-4">
      {
        (allPendingPosts.length > 0 && (memberrole == "ADMIN" || memberrole == "MODERATOR"))&& allPendingPosts.map(el => (
          <PostItemPending key={el.id} post={el} fetchPost={fecthPendingPosts} />
        ))
      }


      {
        allApprovedPosts.length > 0 && allApprovedPosts.map(el => (
          <PostItem key={el.id} post={el} fetchPost={fecthApprovedPosts} />
        ))
      }


    </div>
  )
}
export default PostcontainInCommu