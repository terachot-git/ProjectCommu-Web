import Avatar from "./Avatar"
const sizeClasses = {
  sm: 'px-1 text-md',
  md: 'px-2 text-xl',
  lg: 'px-4 text-3xl',
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