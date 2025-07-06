const sizeClasses = {
  sm: 'py-1 px-3 text-sm',
  md: 'py-2 px-4 text-base',
  lg: 'py-3 px-6 text-lg',
};


const Button = ({ children, bgColor = '#5E00FF', textColor = '#ffffff', onClick ,size='md'}) => {


  const buttonStyles = {
    '--btn-bg-color': bgColor,
    '--btn-text-color': textColor,
    '--btn-hover-bg-color': textColor,
    '--btn-hover-text-color': bgColor,
  };

  
  const buttonClasses = `
    font-bold 
    ${sizeClasses[size]} 
    shadow-md 
    focus:ring-2
    w-fit
    mx-2
    hover:cursor-pointer
    focus:ring-opacity-75
    transition-colors
    bg-[var(--btn-bg-color)]
    text-[var(--btn-text-color)]
    hover:bg-[var(--btn-hover-bg-color)]
    hover:text-[var(--btn-hover-text-color)]
  `;

  return (
    <button
      type="button"
      className={buttonClasses.trim()}
      style={buttonStyles}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;