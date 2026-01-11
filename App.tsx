
import React, { useState, useEffect } from 'react';
import { AppView, MatchFormat } from './types';
import BrutalistButton from './components/BrutalistButton';
import TournamentManager from './components/TournamentManager';
import BowlingTransition from './components/BowlingTransition';
import ImageEditor from './components/ImageEditor';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('HOME');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingView, setPendingView] = useState<AppView | null>(null);
  const [showTagline, setShowTagline] = useState(false);
  const [titleTyped, setTitleTyped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTagline(true), 1200);
    const typeTimer = setTimeout(() => setTitleTyped(true), 100);
    return () => {
      clearTimeout(timer);
      clearTimeout(typeTimer);
    };
  }, []);

  const triggerTransition = (target: AppView) => {
    setPendingView(target);
    setIsTransitioning(true);
  };

  const completeTransition = () => {
    if (pendingView) setView(pendingView);
    setIsTransitioning(false);
    setPendingView(null);
    window.scrollTo(0, 0);
  };

  const renderHome = () => (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative mt-12 mb-40 transform -rotate-1 animate-fade-up">
        <div className="bg-white border-[12px] border-black p-8 md:p-16 shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] relative z-10 overflow-hidden">
          {/* Background Asymmetry */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#FFFF00]/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-56 h-56 flex-shrink-0 animate-bounce-in">
              <img 
                src="https://i.ibb.co/ccdq3Ct9/file-00000000743071f488fdc3b85eadcd3d.png" 
                alt="CAD Logo" 
                className="w-full h-full object-contain hover:scale-110 transition-transform cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <div className="mb-8">
                <h1 className="heading-font text-5xl md:text-8xl leading-[0.85] tracking-tighter">
                  {titleTyped && <span className="typing-effect">CRICKET ASSOCIATION</span>}<br/>
                  <span className="bg-[#D41B1B] text-white px-2 italic">OF DISCORD</span>
                </h1>
              </div>
              
              <div className={`transition-all duration-1000 ${showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                <div className="flex flex-wrap gap-4 items-center mb-8">
                  <span className="text-3xl md:text-5xl font-black border-4 border-black px-4 py-1 bg-[#00FF00] hover:bg-white transition-colors cursor-default">COMPETE.</span>
                  <span className="text-3xl md:text-5xl font-black border-4 border-black px-4 py-1 bg-[#0000FF] text-white hover:bg-black transition-colors cursor-default">MANAGE.</span>
                  <span className="text-3xl md:text-5xl font-black border-4 border-black px-4 py-1 bg-[#FFFF00] hover:bg-black hover:text-white transition-colors cursor-default">CONNECT.</span>
                </div>
                
                <p className="text-2xl md:text-3xl font-mono font-bold uppercase underline decoration-[6px] decoration-[#D41B1B]">
                  Everything cricket, right here on Discord.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Anti-design Floating Elements */}
        <div className="absolute -top-16 -right-8 w-48 h-48 bg-[#00FF00] -z-0 border-8 border-black transform rotate-12 hidden md:block"></div>
        <div className="absolute -bottom-16 -left-12 w-80 h-32 bg-[#0000FF] -z-0 border-8 border-black transform -rotate-6 hidden md:block"></div>
      </section>

      {/* Main Actions - Grid of 2 Asymmetrical Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Discord CTA - Staggered 1 */}
        <div className="animate-fade-up stagger-1 flex flex-col justify-between group border-[6px] border-black bg-[#5865F2] p-10 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all duration-300">
          <div className="mb-12">
            <h2 className="heading-font text-5xl text-white mb-6 uppercase leading-none">Join Our<br/>Community</h2>
            <p className="text-white text-2xl font-bold border-l-8 border-white pl-6">
              Connect with 5,000+ players, get real-time simulation updates, and claim your place in the hall of fame.
            </p>
          </div>
          <BrutalistButton 
            variant="discord" 
            fullWidth 
            showDiscordIcon
            onClick={() => {
              // Confetti effect logic could go here
              window.open('https://discord.gg/AhBkPPQshK', '_blank');
            }}
          >
            Launch Discord App
          </BrutalistButton>
        </div>

        {/* AI Studio CTA - Staggered 2 */}
        <div className="animate-fade-up stagger-2 flex flex-col justify-between border-[6px] border-black bg-[#FFFF00] p-10 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
           <div className="mb-12">
             <h2 className="heading-font text-5xl mb-6 uppercase leading-none">Cricket<br/>Photo Studio</h2>
             <p className="text-2xl font-bold border-l-8 border-black pl-6">
               Transform your action shots using Gemini 2.5 AI. Apply night filters, stadium lights, or vintage retro vibes.
             </p>
           </div>
           <BrutalistButton 
            variant="secondary" 
            fullWidth 
            onClick={() => triggerTransition('IMAGE_EDITOR')}
           >
             Open Photo Studio
           </BrutalistButton>
        </div>
      </div>

      {/* Tournament Manager Section - Staggered 3 */}
      <div className="animate-fade-up stagger-3">
        <TournamentManager onSelect={() => triggerTransition('TOURNAMENT')} />
      </div>

      {/* Footer Branding */}
      <footer className="pt-32 pb-20 border-t-8 border-black text-center flex flex-col items-center gap-6">
        <div className="w-16 h-16 bg-black text-white flex items-center justify-center heading-font text-2xl">CAD</div>
        <p className="heading-font text-3xl uppercase tracking-widest bg-black text-white px-8 py-2">Official Discord Cricket Federation</p>
        <div className="font-mono text-sm font-black uppercase opacity-60">
          [ SYSTEM_ACTIVE ] // [ VERSION_2.5.0 ] // [ PROTOCOL_STABLE ]
        </div>
      </footer>
    </div>
  );

  return (
    <div className="min-h-screen p-6 md:p-16 relative overflow-x-hidden">
      {/* Background decoration - Large floating text */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] -z-10 overflow-hidden select-none">
        <div className="absolute top-0 left-0 w-full heading-font text-[25vw] whitespace-nowrap leading-none">
          SIMULATE SIMULATE SIMULATE
        </div>
        <div className="absolute top-[40%] left-0 w-full heading-font text-[25vw] whitespace-nowrap leading-none text-right">
          TOURNAMENT TOURNAMENT
        </div>
        <div className="absolute bottom-0 left-0 w-full heading-font text-[25vw] whitespace-nowrap leading-none">
          CAD CAD CAD CAD CAD
        </div>
      </div>

      <nav className="fixed top-8 right-8 z-[100] flex gap-4">
        {view !== 'HOME' && (
          <BrutalistButton variant="accent" onClick={() => triggerTransition('HOME')}>
            ← Return Home
          </BrutalistButton>
        )}
      </nav>

      <main className="max-w-[1400px] mx-auto">
        {view === 'HOME' && renderHome()}
        {view === 'IMAGE_EDITOR' && <ImageEditor />}
        {view === 'TOURNAMENT' && (
           <div className="bg-white border-[8px] border-black p-12 shadow-[20px_20px_0_0_black] animate-fade-up">
              <h1 className="heading-font text-6xl md:text-9xl mb-8 tracking-tighter">TOURNAMENT HUB</h1>
              <div className="inline-block bg-[#00FF00] px-6 py-2 border-4 border-black text-2xl font-black mb-16 rotate-1">
                 STATUS: READY_FOR_SIMULATION
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                 <div className="border-[6px] border-black p-8 bg-[#FFD1DC] shadow-[10px_10px_0_0_black]">
                    <h3 className="heading-font text-3xl mb-8 border-b-4 border-black pb-2">ACTIVE_QUEUE</h3>
                    <ul className="font-mono text-xl space-y-6">
                      <li className="flex justify-between items-center group cursor-pointer">
                        <span className="font-bold underline group-hover:bg-black group-hover:text-white px-2">PRO_SERIES_#09</span>
                        <span className="bg-black text-white px-2 text-sm">LIVE</span>
                      </li>
                      <li className="flex justify-between items-center group cursor-pointer">
                        <span className="font-bold underline group-hover:bg-black group-hover:text-white px-2">BLITZ_OPEN_S3</span>
                        <span className="bg-blue-600 text-white px-2 text-sm">STARTING</span>
                      </li>
                      <li className="flex justify-between items-center group cursor-pointer">
                        <span className="font-bold underline group-hover:bg-black group-hover:text-white px-2">ASHES_REDUX</span>
                        <span className="bg-red-600 text-white px-2 text-sm">ENROLL</span>
                      </li>
                    </ul>
                 </div>
                 
                 <div className="lg:col-span-2 border-[6px] border-black p-8 bg-blue-50 shadow-[10px_10px_0_0_black]">
                    <h3 className="heading-font text-3xl mb-8 border-b-4 border-black pb-2">WEEKLY_METRICS</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="bg-white border-4 border-black p-10 flex flex-col items-center justify-center transform hover:scale-105 transition-transform">
                          <p className="text-8xl heading-font leading-none mb-2">512/2</p>
                          <p className="text-xl font-black uppercase bg-yellow-300 px-4">Peak Innings Score</p>
                       </div>
                       <div className="bg-white border-4 border-black p-10 flex flex-col items-center justify-center transform hover:scale-105 transition-transform">
                          <p className="text-8xl heading-font leading-none mb-2">8/12</p>
                          <p className="text-xl font-black uppercase bg-green-300 px-4">Best Bowling Figure</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        )}
      </main>

      {isTransitioning && <BowlingTransition onComplete={completeTransition} />}
    </div>
  );
};

export default App;
