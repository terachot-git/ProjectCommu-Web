import React from 'react';


const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-36 h-36',
};

const ringClasses = {
  none: 'hover:ring-0',
  active: 'hover:ring-2',
  
};



 const Avatar = ({ src, alt = 'Avatar', size = 'md' ,ring='none'}) => {
  
  if(!src)
  {
    src='https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png'
  }

  
 

  return (
    <div
      className={`
        relative shrink-0 rounded-full bg-gray-200 text-gray-600 
        ${sizeClasses[size]} ${ringClasses[ring]}
      `}
    >
     
    
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover rounded-full"
        />
      
    </div>
  );
};

export default Avatar