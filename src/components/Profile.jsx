import Avatar from "./Avatar"
const sizeClasses = {
  sm: 'px-1 text-xl',
  md: 'px-2 text-3xl',
  lg: 'px-4 text-6xl',
};

function Profile({user,textsize="md",...resProps}) {
  return (
    <div className="flex items-center">
        <Avatar {...resProps}/>
        <p className= {`${sizeClasses[textsize]} font-bold `}>{user?.username}</p>
    </div>
  )
}
export default Profile