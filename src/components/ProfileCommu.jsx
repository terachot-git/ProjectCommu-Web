import Avatar from "./Avatar"
const sizeClasses = {
  sm: 'px-1 text-xl',
  md: 'px-2 text-3xl',
  lg: 'px-4 text-6xl',
};

function ProfilecCommu({community,textsize="md",...resProps}) {
  return (
    <div className="flex items-center">
        <Avatar {...resProps}/>
        <p className= {`${sizeClasses[textsize]} font-bold `}>{community?.communityname}</p>
    </div>
  )
}
export default ProfilecCommu