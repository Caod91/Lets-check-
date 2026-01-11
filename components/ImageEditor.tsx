
import React, { useState, useRef } from 'react';
import BrutalistButton from './BrutalistButton';
import { geminiService } from '../services/geminiService';

const ImageEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const base64 = readerEvent.target?.result as string;
        setImage(base64);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!image || !prompt) return;
    setLoading(true);
    const base64Data = image.split(',')[1];
    const edited = await geminiService.editImage(base64Data, prompt);
    if (edited) {
      setResult(edited);
    } else {
      alert("Failed to edit image. Try another prompt.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="bg-[#FFFF00] border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="heading-font text-4xl mb-4">CRICKET PHOTO STUDIO</h2>
        <p className="text-xl">Use Gemini 2.5 AI to transform your cricket photos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="heading-font text-xl mb-4">UPLOAD ASSET</h3>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
              accept="image/*"
            />
            <BrutalistButton 
              fullWidth 
              variant="accent"
              onClick={() => fileInputRef.current?.click()}
            >
              {image ? 'Change Photo' : 'Choose Photo'}
            </BrutalistButton>

            {image && (
              <div className="mt-4 border-4 border-black bg-black">
                <img src={image} alt="Source" className="w-full h-auto opacity-80" />
              </div>
            )}
          </div>

          <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="heading-font text-xl mb-4">TRANSFORMATION PROMPT</h3>
            <textarea
              className="w-full border-4 border-black p-4 text-lg font-mono focus:outline-none focus:bg-yellow-50 h-32"
              placeholder="e.g., 'Add a retro film grain', 'Make it look like a night match', 'Add stadium floodlights'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="mt-4">
              <BrutalistButton 
                fullWidth 
                variant="primary" 
                onClick={handleEdit}
                className={loading ? 'animate-pulse cursor-wait' : ''}
              >
                {loading ? 'GENERATING...' : 'APPLY AI MAGIC'}
              </BrutalistButton>
            </div>
          </div>
        </div>

        <div className="border-4 border-black bg-[#0000FF] p-1 flex flex-col shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-white border-b-4 border-black p-2 flex justify-between items-center">
             <span className="heading-font px-2">OUTPUT_RENDER.PNG</span>
             <div className="flex gap-1">
               <div className="w-4 h-4 border-2 border-black bg-red-500"></div>
               <div className="w-4 h-4 border-2 border-black bg-yellow-500"></div>
               <div className="w-4 h-4 border-2 border-black bg-green-500"></div>
             </div>
          </div>
          <div className="flex-1 bg-white relative min-h-[400px] flex items-center justify-center p-4">
             {loading ? (
                <div className="text-center animate-bounce">
                  <div className="w-20 h-20 rounded-full border-4 border-black bg-[#D41B1B] mx-auto mb-4"></div>
                  <p className="heading-font">AI PROCESSING...</p>
                </div>
             ) : result ? (
                <img src={result} alt="Result" className="w-full h-auto border-4 border-black" />
             ) : (
                <p className="text-black/30 font-bold text-2xl uppercase rotate-[-5deg]">Result will appear here</p>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
