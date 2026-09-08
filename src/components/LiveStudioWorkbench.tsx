import React, { useRef, useState, useEffect } from 'react';
import { 
  Palette, 
  RotateCcw, 
  Sparkles, 
  Maximize2, 
  Brush, 
  Droplets,
  Award
} from 'lucide-react';

interface LiveStudioWorkbenchProps {
  onOpenFullCanvas: () => void;
  onOpenZeroBudgetGuide: () => void;
}

const PIGMENTS = [
  { id: 'charcoal', name: 'Charcoal Soot', hex: '#1C1917', origin: 'Kitchen Wood Ash / Expressive Gesture' },
  { id: 'rhododendron', name: 'Rhododendron Scarlet', hex: '#C84B31', origin: 'National Flower Petals' },
  { id: 'ochre', name: 'Mustard Clay Ochre', hex: '#D97706', origin: 'Wild Turmeric & Clay' },
  { id: 'lapis', name: 'Himalayan Lapis', hex: '#1E3A8A', origin: 'Deep Alpine Mineral' },
  { id: 'teawash', name: 'Ilam Tea Sepia', hex: '#78350F', origin: 'Steeped Black Tea Wash' },
  { id: 'terracotta', name: 'Bhaktapur Clay', hex: '#C2410C', origin: 'Pottery Clay Soil' },
];

export const LiveStudioWorkbench: React.FC<LiveStudioWorkbenchProps> = ({
  onOpenFullCanvas,
  onOpenZeroBudgetGuide
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(PIGMENTS[1].hex);
  const [brushSize, setBrushSize] = useState<number>(6);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [hasDrawn, setHasDrawn] = useState<boolean>(false);
  const [activePigmentName, setActivePigmentName] = useState<string>(PIGMENTS[1].name);

  // Initialize canvas with smooth studio rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high-DPI resolution
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Initial subtle warm studio paper fill
    ctx.fillStyle = '#FAF8F5';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Initial artistic invitation watermark
    ctx.save();
    ctx.font = 'italic 16px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = 'rgba(120, 113, 108, 0.45)';
    ctx.textAlign = 'center';
    ctx.fillText('Touch or drag across the linen to test the studio pigment...', rect.width / 2, rect.height / 2);
    ctx.restore();
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#FAF8F5';
    ctx.fillRect(0, 0, rect.width, rect.height);
    setHasDrawn(false);
  };

  return (
    <div className="relative bg-white rounded-3xl p-5 sm:p-7 art-matting border border-stone-200/90 transition-all text-left">
      {/* Studio Header Bar */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-stone-200/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1C1917] text-stone-100 flex items-center justify-center font-bold text-xs shadow-2xs">
            <Brush className="w-4 h-4 text-[#C84B31]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display-custom font-bold text-base text-stone-900">
                The Atelier Easel
              </span>
              <span className="flex items-center gap-1 text-[9px] font-mono font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C84B31]" />
                LIVE WORKBENCH
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-sans-custom">
              Active Medium: <strong className="text-stone-900 font-semibold">{activePigmentName}</strong>
            </p>
          </div>
        </div>

        {/* Quick Clear & Fullscreen Actions */}
        <div className="flex items-center gap-2">
          <button
            id="workbench-clear-btn"
            onClick={clearCanvas}
            className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors text-xs flex items-center gap-1"
            title="Clear Easel"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Clear</span>
          </button>

          <button
            id="workbench-fullscreen-btn"
            onClick={onOpenFullCanvas}
            className="px-3 py-1.5 bg-[#1C1917] hover:bg-[#C84B31] text-white rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Full Canvas</span>
          </button>
        </div>
      </div>

      {/* The Live Interactive Canvas Stage */}
      <div className="relative mt-4 aspect-16/10 sm:aspect-16/9 w-full rounded-2xl overflow-hidden border border-stone-300/80 bg-[#FAF8F5] shadow-inner cursor-crosshair group touch-none">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full block"
        />

        {/* Dynamic Studio Stamp */}
        <div className="absolute top-3 left-3 pointer-events-none select-none">
          <span className="px-2.5 py-1 rounded-md bg-stone-900/70 backdrop-blur-xs text-[9px] font-mono text-stone-200 tracking-widest uppercase">
            300 DPI // HANDMADE LOKTA TEXTURE
          </span>
        </div>

        {/* Floating invitation badge if user hasn't drawn yet */}
        {!hasDrawn && (
          <div className="absolute bottom-3 right-3 pointer-events-none select-none bg-white/95 backdrop-blur-xs border border-stone-200/90 px-3 py-1.5 rounded-full shadow-sm text-[11px] font-medium text-stone-700 flex items-center gap-1.5 animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-[#C84B31]" />
            <span className="font-editorial-custom italic text-xs">Touch to make your mark</span>
          </div>
        )}
      </div>

      {/* Pigment Palette Controls */}
      <div className="mt-4 space-y-3.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-stone-900 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider">
            <Droplets className="w-3.5 h-3.5 text-[#C84B31]" />
            Himalayan Natural Pigments:
          </span>
          <button
            onClick={onOpenZeroBudgetGuide}
            className="text-[11px] text-[#C84B31] hover:underline font-medium"
          >
            0-NPR Recipes →
          </button>
        </div>

        {/* Color Palette Chips */}
        <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
          {PIGMENTS.map((pigment) => {
            const isSelected = selectedColor === pigment.hex;
            return (
              <button
                key={pigment.id}
                id={`workbench-pigment-${pigment.id}`}
                onClick={() => {
                  setSelectedColor(pigment.hex);
                  setActivePigmentName(pigment.name);
                }}
                className={`group relative flex flex-col items-center justify-center p-2 rounded-xl transition-all border ${
                  isSelected 
                    ? 'border-[#C84B31] ring-2 ring-[#C84B31]/20 bg-stone-50 shadow-2xs scale-105' 
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div 
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full shadow-2xs transition-transform group-hover:scale-110 flex items-center justify-center border border-black/10"
                  style={{ backgroundColor: pigment.hex }}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-white shadow-xs" />
                  )}
                </div>
                <span className="text-[10px] font-medium text-stone-700 mt-1.5 truncate max-w-full text-center">
                  {pigment.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Brush Stroke Weight Bar & Direct Launch */}
        <div className="pt-2 flex items-center justify-between gap-3 border-t border-stone-200/70">
          <div className="flex items-center gap-1 bg-[#F2ECE1]/80 p-1 rounded-xl border border-stone-200/80">
            {[
              { label: 'Fine', size: 3 },
              { label: 'Medium', size: 7 },
              { label: 'Wash', size: 14 }
            ].map((brush) => (
              <button
                key={brush.size}
                onClick={() => setBrushSize(brush.size)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  brushSize === brush.size
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {brush.label}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenFullCanvas}
            className="flex-1 py-2 px-3.5 rounded-xl bg-[#C84B31] hover:bg-[#B33E26] text-white text-xs font-medium flex items-center justify-center gap-1.5 shadow-2xs hover:shadow-md transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Studio Canvas</span>
          </button>
        </div>
      </div>
    </div>
  );
};
