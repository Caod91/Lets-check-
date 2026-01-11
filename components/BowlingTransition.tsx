
import React, { useEffect } from 'react';

interface BowlingTransitionProps {
  onComplete: () => void;
  color?: 'red' | 'white';
}

const BowlingTransition: React.FC<BowlingTransitionProps> = ({ onComplete, color = 'red' }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[1000] pointer-events-none flex items-center justify-center overflow-hidden bg-black/40 backdrop-blur-sm">
      <div className="bowling-ball-anim relative w-48 h-48 md:w-80 md:h-80">
        <div className={`w-full h-full rounded-full border-[8px] border-black shadow-[10px_10px_0_0_black] ${color === 'red' ? 'bg-[#D41B1B]' : 'bg-[#FFFFFF]'}`}>
           {/* Realistic-ish Seams */}
           <div className="absolute top-1/2 left-0 w-full h-3 bg-black/30 translate-y-[-1.5px]" />
           <div className="absolute top-[48%] left-0 w-full h-[2px] bg-black/50" />
           <div className="absolute top-[52%] left-0 w-full h-[2px] bg-black/50" />
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-[80%] h-[2px] bg-white/20 rotate-45"></div>
           </div>
        </div>
      </div>
      {/* Whiz effect lines */}
      <div className="absolute top-1/2 left-0 w-full h-24 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -translate-y-1/2 opacity-30"></div>
    </div>
  );
};

export default BowlingTransition;
