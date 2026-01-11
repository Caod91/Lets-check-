
import React, { useState } from 'react';

interface BrutalistButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'discord';
  fullWidth?: boolean;
  showDiscordIcon?: boolean;
}

const BrutalistButton: React.FC<BrutalistButtonProps> = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  fullWidth = false,
  showDiscordIcon = false
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const variants = {
    primary: 'bg-[#00FF00] hover:bg-[#33FF33] text-black', 
    secondary: 'bg-[#0000FF] text-white hover:bg-[#3333FF]',
    accent: 'bg-[#FFFF00] text-black hover:bg-[#FFFF33]',
    danger: 'bg-[#D41B1B] text-white hover:bg-[#FF3333]',
    discord: 'bg-[#5865F2] text-white hover:bg-[#7289da] glow-pulse'
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPressed(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    e.currentTarget.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <button
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`
        relative overflow-hidden group
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        border-4 border-black font-bold uppercase py-4 px-8
        transition-all duration-150 ease-in-out
        ${isPressed ? 'scale-[0.97] translate-x-1 translate-y-1 shadow-none' : 'scale-100 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 hover:scale-[1.02]'}
        ${className}
      `}
    >
      <div className="flex items-center justify-center gap-3 relative z-10">
        {showDiscordIcon && (
          <div className="w-0 overflow-hidden group-hover:w-6 transition-all duration-300 ease-out">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.864-.6083 1.2495-1.8448-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1971.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
          </div>
        )}
        <span>{children}</span>
      </div>
    </button>
  );
};

export default BrutalistButton;
