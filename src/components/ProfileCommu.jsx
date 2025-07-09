import Avatar from "./Avatar"
const sizeClasses = {
  sm: 'px-1 text-md',
  md: 'px-2 text-xl',
  lg: 'px-4 text-3xl',
};
const shadowActive = {
  active : "text-shadow-[-2px_-2px_0_white,2px_-2px_0_white,-2px_2px_0_white,2px_2px_0_white]", 
  none : ""
}
function ProfilecCommu({community,textsize="md",shadow='none',...resProps}) {
  return (
    <div className="flex items-center z-20">
        <Avatar {...resProps}/>
        <p className= {`${sizeClasses[textsize]} font-bold ${shadowActive[shadow]}  `}>{community?.communityname}</p>
    </div>
  )
}
export default ProfilecCommu