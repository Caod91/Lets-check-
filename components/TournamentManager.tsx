
import React, { useState } from 'react';
import BrutalistButton from './BrutalistButton';
import { MatchFormat } from '../types';

interface TournamentManagerProps {
  onSelect: (format: MatchFormat) => void;
}

const TournamentManager: React.FC<TournamentManagerProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      {/* Decorative background element for asymmetry */}
      <div className="absolute -inset-4 bg-[#FF00FF] -z-10 border-4 border-black transition-transform group-hover:rotate-1"></div>
      
      <div className="border-4 border-black bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-8 transition-all hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
        <div 
          className="cursor-pointer flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div>
            <h2 className="heading-font text-4xl mb-2 tracking-tighter">TOURNAMENT MANAGER</h2>
            <p className="text-xl border-l-4 border-black pl-4">Create, manage, or join cricket tournaments.</p>
          </div>
          <div className={`text-6xl transition-transform duration-500 ease-out ${isOpen ? 'rotate-180 scale-125' : 'rotate-0'}`}>
            ↯
          </div>
        </div>

        <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? 'max-h-[800px] mt-12 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="border-t-[6px] border-black pt-10 space-y-10">
            <h3 className="heading-font text-3xl uppercase bg-black text-white px-4 py-2 inline-block">Select Match Format</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Test Cricket Option */}
              <div 
                onClick={() => onSelect(MatchFormat.TEST)}
                className="group/item cursor-pointer border-4 border-black p-8 bg-[#f9f9f9] hover:bg-[#D41B1B] hover:text-white transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute -top-4 -right-4 text-8xl opacity-10 font-black group-hover/item:opacity-30 group-hover/item:scale-110 transition-all">05</div>
                <div className="flex items-center gap-6 mb-6">
                   <div className="w-16 h-16 rounded-full bg-[#D41B1B] border-4 border-black flex items-center justify-center text-white shadow-[4px_4px_0_0_black] group-hover/item:bg-white group-hover/item:text-[#D41B1B] transition-colors">
                     <span className="text-3xl">●</span>
                   </div>
                   <h4 className="heading-font text-3xl">TEST CRICKET</h4>
                </div>
                <p className="text-lg font-bold">The ultimate test of endurance. Multi-day strategic simulations for the true purists.</p>
                <div className="mt-8 border-2 border-current px-4 py-1 inline-block font-black">
                  [ START_SIMULATION ]
                </div>
              </div>

              {/* Limited Overs Option */}
              <div 
                onClick={() => onSelect(MatchFormat.LIMITED_OVERS)}
                className="group/item cursor-pointer border-4 border-black p-8 bg-[#f9f9f9] hover:bg-[#0000FF] hover:text-white transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute -top-4 -right-4 text-8xl opacity-10 font-black group-hover/item:opacity-30 group-hover/item:scale-110 transition-all">50</div>
                <div className="flex items-center gap-6 mb-6">
                   <div className="w-16 h-16 rounded-full bg-white border-4 border-black flex items-center justify-center text-black shadow-[4px_4px_0_0_black] group-hover/item:bg-black group-hover/item:text-white transition-colors">
                     <span className="text-3xl">○</span>
                   </div>
                   <h4 className="heading-font text-3xl">LIMITED OVERS</h4>
                </div>
                <p className="text-lg font-bold">Fast-paced, high-intensity action. Perfect for quick tournaments and explosive scoring.</p>
                <div className="mt-8 border-2 border-current px-4 py-1 inline-block font-black">
                  [ START_SIMULATION ]
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentManager;
