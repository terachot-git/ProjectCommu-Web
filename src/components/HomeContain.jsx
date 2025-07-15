import { useEffect, useState } from "react"

import useUserStore from "../stores/userStore"
import PostItem from "../components/forPost/PostItem"
import { userApi } from "../api/userapi"
import PostItemInHome from "./forPost/PostItemInHome"

const shuffleArray = (array) => {

  const newArray = [...array]; 
  // 2. วนลูปจากสมาชิกตัวสุดท้ายกลับมาตัวแรก
  for (let i = newArray.length - 1; i > 0; i--) {
    // 3. สุ่มตำแหน่ง (j) ที่มีค่าน้อยกว่าหรือเท่ากับตำแหน่งปัจจุบัน (i)
    const j = Math.floor(Math.random() * (i + 1));
    // 4. สลับค่าระหว่างตำแหน่ง i และ j
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  // 5. คืนค่า Array ที่สลับลำดับเรียบร้อยแล้ว
  return newArray;
};


function HomeContain() {
  const token = useUserStore(state => state.token)
  const [allPosts,SetAllPosts] = useState([])
  const fecthApprovedPosts = async () => {
    const allpostsinfo =  await userApi.get(`/posts/community`, {
      params: {
        poststatus: 'APPROVED'
      },
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    // console.log(allpostsinfo.data.posts)
     const originalPosts = allpostsinfo.data.posts;
       const shuffledPosts = shuffleArray(originalPosts);
    SetAllPosts(shuffledPosts)

  }
  useEffect(()=>{
  fecthApprovedPosts()
  },[])

    // console.log(allPosts)
  return (
    <div className=" xl:left-3/16 top-[90px] relative  w-12/16  xl:mx-0 mx-auto  h-full flex flex-col gap-4">

   {
    allPosts.length>0 && allPosts.map(el => (
          <PostItemInHome key={el.id} post={el} fetchPost={fecthApprovedPosts} />
        ))
    }


    </div>
  )
}
export default HomeContain