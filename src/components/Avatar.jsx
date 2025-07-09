import React from 'react';


const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-32 h-32',
};

const ringClasses = {
  none: 'hover:ring-0',
  active: 'hover:ring-5',
  
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
          className="h-full w-full object-cover rounded-full ring-2 ring-white"
        />
      
    </div>
  );
};

export default Avatar