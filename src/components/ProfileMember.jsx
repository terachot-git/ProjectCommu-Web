import Avatar from "./Avatar"
import useUserStore from "../stores/userStore";

const sizeClasses = {
   sm: 'px-1 text-md',
  md: 'px-2 text-xl',
  lg: 'px-4 text-3xl',
};

const shadowActive = {
  active : "text-shadow-[-2px_-2px_0_white,2px_-2px_0_white,-2px_2px_0_white,2px_2px_0_white]", 
  none : ""
}
function ProfilecMember({community,textsize="md",shadow='none',member,...resProps}) {
  const user = useUserStore(state=>state.user)
  let src
  // console.log(member)
  // console.log(community)
  if (member?.memberImage){
    src = member?.memberImage
  }
  else{
    src = community?.membersImage
  }
  // console.log(member?.membername )
  return (
    <div className="flex items-center z-20">
        <Avatar {...resProps} src={src}/>
       
        {user? member?.membername ?<p className= {`${sizeClasses[textsize]} font-bold ${shadowActive[shadow]} ml-2 `}>{member?.membername}</p>:
        <p className= {`${sizeClasses[textsize]} font-bold ${shadowActive[shadow]} ml-2 `}>{`${community?.membersname} ${member?.joinOrder?`No.${member?.joinOrder}`:""}`}</p>:
        <p className= {`${sizeClasses[textsize]} font-bold ${shadowActive[shadow]} ml-2 `}>{`${community?.membersname}`}</p>
        }
        
    </div>
  )
}
export default ProfilecMember