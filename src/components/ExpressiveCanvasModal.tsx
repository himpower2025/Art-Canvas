import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  X, Download, RotateCcw, Sparkles, Paintbrush, 
  Eraser, Flame, Send, CheckCircle2, Sliders, Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StudentArtwork } from '../types';

interface ExpressiveCanvasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onArtworkSubmitted: (artwork: StudentArtwork) => void;
  initialPromptTitle?: string;
}

type BrushMode = 'charcoal' | 'ink' | 'watercolor' | 'splatter' | 'eraser';

const COLOR_PALETTES = [
  { name: 'Charcoal Black', hex: '#1E1B18', description: 'Burnt wood chulha dust' },
  { name: 'Laliguras Crimson', hex: '#E05A47', description: 'National flower of wild bloom' },
  { name: 'Marigold Ochre', hex: '#E69F24', description: 'Sunlit temple garland' },
  { name: 'Himalayan Indigo', hex: '#2B4C7E', description: 'High altitude prayer flag blue' },
  { name: 'Pine Moss', hex: '#3E6047', description: 'Valley pine forest' },
  { name: 'Terracotta Earth', hex: '#A0522D', description: 'Bhaktapur clay earth' },
  { name: 'Snow Cream', hex: '#FAF8F5', description: 'Himalayan dawn light' },
];

export const ExpressiveCanvasModal: React.FC<ExpressiveCanvasModalProps> = ({
  isOpen,
  onClose,
  onArtworkSubmitted,
  initialPromptTitle = 'Express Your Truth: Creative Self-Expression'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [brushMode, setBrushMode] = useState<BrushMode>('charcoal');
  const [currentColor, setCurrentColor] = useState<string>('#1E1B18');
  const [brushSize, setBrushSize] = useState<number>(14);
  const [brushOpacity, setBrushOpacity] = useState<number>(0.85);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  // Mobile active tool tab ('brushes' | 'colors' | 'settings')
  const [mobileToolTab, setMobileToolTab] = useState<'brushes' | 'colors' | 'settings'>('brushes');

  // Submission Form State
  const [showSubmitForm, setShowSubmitForm] = useState<boolean>(false);
  const [artistName, setArtistName] = useState<string>('');
  const [studentGrade, setStudentGrade] = useState<string>('Grade 9');
  const [studentCity, setStudentCity] = useState<string>('Kathmandu');
  const [artTitle, setArtTitle] = useState<string>('');
  const [artStory, setArtStory] = useState<string>('');

  // Setup canvas resolution and background
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High DPI scaling using container dimensions
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(280, Math.floor(rect.width));
    const height = Math.max(240, Math.floor(rect.height));

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Warm artisanal textured paper base
    ctx.fillStyle = '#F8F5EE';
    ctx.fillRect(0, 0, width, height);

    // Subtle paper fiber specks
    ctx.fillStyle = 'rgba(210, 200, 185, 0.25)';
    for (let i = 0; i < 600; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const size = Math.random() * 1.5;
      ctx.fillRect(rx, ry, size, size);
    }

    // Save initial state to history
    const initialData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([initialData]);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // Initialize after DOM stabilizes
    const timer = setTimeout(() => {
      initCanvas();
    }, 120);

    return () => clearTimeout(timer);
  }, [isOpen, initCanvas]);

  // ResizeObserver on canvas container element for responsive adaptability across devices
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (!entry.target || !canvasRef.current) continue;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;

        const dpr = window.devicePixelRatio || 1;
        const newWidth = Math.max(280, Math.floor(entry.contentRect.width));
        const newHeight = Math.max(240, Math.floor(entry.contentRect.height));

        if (Math.abs(canvas.width - newWidth * dpr) > 10 || Math.abs(canvas.height - newHeight * dpr) > 10) {
          // Temporarily save current content
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = canvas.width;
          tempCanvas.height = canvas.height;
          const tempCtx = tempCanvas.getContext('2d');
          if (tempCtx && canvas.width > 0 && canvas.height > 0) {
            tempCtx.drawImage(canvas, 0, 0);
          }

          canvas.width = newWidth * dpr;
          canvas.height = newHeight * dpr;
          ctx.scale(dpr, dpr);

          // Redraw previous content scaled to fit
          ctx.fillStyle = '#F8F5EE';
          ctx.fillRect(0, 0, newWidth, newHeight);
          if (tempCanvas.width > 0 && tempCanvas.height > 0) {
            ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, newWidth, newHeight);
          }
        }
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [isOpen]);

  const saveHistorySnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-15), current]);
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop(); // Remove current
    const previous = newHistory[newHistory.length - 1];
    if (previous) {
      ctx.putImageData(previous, 0, 0);
      setHistory(newHistory);
    }
  };

  const handleClear = () => {
    initCanvas();
  };

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const coords = getCoordinates(e);
    lastPosRef.current = coords;

    if (brushMode === 'splatter') {
      triggerSplatter(coords.x, coords.y);
    } else {
      drawStroke(coords.x, coords.y);
    }
  };

  const drawStroke = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const last = lastPosRef.current || { x, y };

    ctx.save();

    if (brushMode === 'eraser') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = '#F8F5EE';
      ctx.fillStyle = '#F8F5EE';
      ctx.lineWidth = brushSize * 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (brushMode === 'charcoal') {
      // Visceral textured dry charcoal stroke with jitter
      ctx.globalAlpha = brushOpacity;
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Multiple light dry dust strands
      for (let i = 0; i < 3; i++) {
        const jx = (Math.random() - 0.5) * (brushSize * 0.4);
        const jy = (Math.random() - 0.5) * (brushSize * 0.4);
        ctx.beginPath();
        ctx.moveTo(last.x + jx, last.y + jy);
        ctx.lineTo(x + jx, y + jy);
        ctx.stroke();
      }

      // Charcoal grit particles
      if (Math.random() > 0.4) {
        ctx.fillStyle = currentColor;
        for (let p = 0; p < 4; p++) {
          const px = x + (Math.random() - 0.5) * brushSize * 1.5;
          const py = y + (Math.random() - 0.5) * brushSize * 1.5;
          ctx.beginPath();
          ctx.arc(px, py, Math.random() * 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (brushMode === 'ink') {
      // Fluid Mithila bamboo nib - clean tapered stroke
      ctx.globalAlpha = brushOpacity;
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushSize * 0.7;
      ctx.lineCap = 'square';
      ctx.lineJoin = 'miter';
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (brushMode === 'watercolor') {
      // Soft translucent watercolor wash
      ctx.globalAlpha = brushOpacity * 0.25;
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushSize * 2.2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    ctx.restore();
    lastPosRef.current = { x, y };
  };

  const triggerSplatter = (cx: number, cy: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.globalAlpha = brushOpacity;
    ctx.fillStyle = currentColor;

    const count = 18 + Math.floor(Math.random() * 20);
    const maxRadius = brushSize * 3.5;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.pow(Math.random(), 2) * maxRadius;
      const sx = cx + Math.cos(angle) * dist;
      const sy = cy + Math.sin(angle) * dist;
      const dotSize = Math.max(0.6, (1 - dist / maxRadius) * (brushSize * 0.45));

      ctx.beginPath();
      ctx.arc(sx, sy, dotSize, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const coords = getCoordinates(e);

    if (brushMode === 'splatter') {
      // Frequent splatter on drag
      if (Math.random() > 0.7) {
        triggerSplatter(coords.x, coords.y);
      }
    } else {
      drawStroke(coords.x, coords.y);
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      lastPosRef.current = null;
      saveHistorySnapshot();
    }
  };

  const handleDownloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `choi-art-studio-expressive-art-${Date.now()}.png`;
    link.href = image;
    link.click();
  };

  const handleSubmitArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');

    const newArtwork: StudentArtwork = {
      id: `student-sub-${Date.now()}`,
      title: artTitle.trim() || 'My Inner Release',
      artist: artistName.trim() || 'Young Artist',
      age: studentGrade.includes('10') ? 16 : studentGrade.includes('12') ? 18 : 13,
      grade: studentGrade,
      location: studentCity.trim() || 'Nepal',
      medium: `${brushMode === 'charcoal' ? 'Digital Charcoal & Smoke' : brushMode === 'ink' ? 'Bamboo Ink Line' : 'Watercolor Wash'} on artisanal paper`,
      story: artStory.trim() || 'Drawn during a moment of academic pause to connect with my true voice.',
      imageUrl: dataUrl,
      colors: [currentColor, '#F8F5EE'],
      likes: 1,
      date: 'Just now',
      tags: ['Live Canvas', 'Student Voice', studentGrade]
    };

    onArtworkSubmitted(newArtwork);
    setSubmissionSuccess(true);

    // Festive confetti celebratory burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E05A47', '#E69F24', '#2B4C7E', '#3E6047']
    });

    setTimeout(() => {
      setSubmissionSuccess(false);
      setShowSubmitForm(false);
      onClose();
    }, 2200);
  };

  if (!isOpen) return null;

  return (
    <div
      id="expressive-canvas-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-stone-900/60 backdrop-blur-xs transition-all duration-300 animate-in fade-in"
    >
      <div className="relative w-full max-w-6xl xl:max-w-7xl h-[94vh] max-h-[980px] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden text-left">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 border-b border-stone-200 bg-stone-50/90">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#C84B31] text-white flex items-center justify-center font-display-custom font-bold text-base sm:text-lg shrink-0 shadow-xs">
              C
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3 className="font-display-custom font-semibold text-xs sm:text-sm md:text-base text-stone-900 truncate">
                  CHOI Drawing Canvas
                </h3>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#C84B31]/10 text-[#C84B31] border border-[#C84B31]/20 whitespace-nowrap">
                  Free Creative Studio
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-stone-500 truncate font-serif-custom italic">
                "{initialPromptTitle}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              id="canvas-undo-btn"
              onClick={handleUndo}
              disabled={history.length <= 1}
              className="p-2 rounded-xl text-stone-500 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center"
              title="Undo last stroke"
              aria-label="Undo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              id="canvas-download-btn"
              onClick={handleDownloadPNG}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 transition-all shadow-2xs min-h-[36px]"
              title="Download your painting as PNG"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Save Image</span>
            </button>

            <button
              id="canvas-submit-trigger-btn"
              onClick={() => setShowSubmitForm(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-white bg-[#C84B31] hover:bg-[#B33E26] transition-all shadow-xs active:scale-95 min-h-[36px]"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share to Gallery</span>
              <span className="sm:hidden">Share</span>
            </button>

            <button
              id="canvas-close-btn"
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-all ml-0.5 flex items-center justify-center"
              aria-label="Close Canvas Studio"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Workspace */}
        <div className="flex-1 relative flex flex-col md:flex-row overflow-hidden">
          {/* Main Drawing Canvas Area */}
          <div 
            ref={containerRef}
            className="flex-1 relative bg-stone-100/90 flex items-center justify-center p-2 sm:p-4 overflow-hidden min-h-[220px]"
          >
            <div className="relative w-full h-full max-w-4xl max-h-[640px] rounded-2xl shadow-lg border border-stone-200/90 overflow-hidden cursor-crosshair touch-none">
              <canvas
                id="interactive-catharsis-canvas"
                ref={canvasRef}
                className="w-full h-full block touch-none select-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={(e) => {
                  e.preventDefault();
                  startDrawing(e);
                }}
                onTouchMove={(e) => {
                  e.preventDefault();
                  draw(e);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  stopDrawing();
                }}
              />
            </div>
          </div>

          {/* Tool Palette (Responsive: Compact tabs on mobile, full sidebar on desktop) */}
          <div className="w-full md:w-72 bg-stone-50/95 border-t md:border-t-0 md:border-l border-stone-200 p-3 sm:p-4 flex flex-col justify-between gap-3 sm:gap-4 overflow-y-auto max-h-[200px] md:max-h-none shrink-0">
            {/* Mobile Tab Switcher (< md) */}
            <div className="flex md:hidden items-center justify-between gap-1 p-1 bg-stone-200/60 rounded-xl border border-stone-200">
              <button
                onClick={() => setMobileToolTab('brushes')}
                className={`flex-1 py-1 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  mobileToolTab === 'brushes' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600'
                }`}
              >
                <Paintbrush className="w-3.5 h-3.5" />
                <span>Brushes</span>
              </button>
              <button
                onClick={() => setMobileToolTab('colors')}
                className={`flex-1 py-1 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  mobileToolTab === 'colors' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600'
                }`}
              >
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: currentColor }} />
                <span>Pigments</span>
              </button>
              <button
                onClick={() => setMobileToolTab('settings')}
                className={`flex-1 py-1 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  mobileToolTab === 'settings' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Settings</span>
              </button>
            </div>

            {/* Brushes Section */}
            <div className={`${mobileToolTab === 'brushes' ? 'block' : 'hidden'} md:block`}>
              <div className="hidden md:flex text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2.5 items-center gap-1.5">
                <Paintbrush className="w-3.5 h-3.5" />
                <span>Brushes & Tools</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-2 gap-1.5">
                {[
                  { id: 'charcoal', label: 'Charcoal', desc: 'Soft burnt wood strokes', icon: Flame },
                  { id: 'ink', label: 'Mithila Ink', desc: 'Clean bamboo dip pen lines', icon: Paintbrush },
                  { id: 'watercolor', label: 'Tea Wash', desc: 'Soft, gentle water shades', icon: Sparkles },
                  { id: 'splatter', label: 'Paint Drops', desc: 'Playful splatter marks', icon: Sparkles },
                  { id: 'eraser', label: 'Eraser', desc: 'Gently reveal paper light', icon: Eraser },
                ].map((b) => {
                  const Icon = b.icon;
                  const isActive = brushMode === b.id;
                  return (
                    <button
                      key={b.id}
                      id={`brush-select-${b.id}`}
                      onClick={() => setBrushMode(b.id as BrushMode)}
                      className={`text-left p-2 rounded-xl border text-xs transition-all min-h-[42px] ${
                        isActive
                          ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                          : 'bg-white text-stone-800 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-medium">
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C84B31]' : 'text-stone-400'}`} />
                        <span className="truncate">{b.label}</span>
                      </div>
                      <div className={`text-[10px] mt-0.5 line-clamp-1 hidden sm:block ${isActive ? 'text-stone-300' : 'text-stone-500'}`}>
                        {b.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colors Section */}
            <div className={`${mobileToolTab === 'colors' ? 'block' : 'hidden'} md:block`}>
              <div className="hidden md:block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2.5">
                Himalayan Natural Pigments
              </div>
              <div className="grid grid-cols-7 md:grid-cols-4 gap-1.5 sm:gap-2">
                {COLOR_PALETTES.map((color) => {
                  const isSelected = currentColor === color.hex && brushMode !== 'eraser';
                  return (
                    <button
                      key={color.hex}
                      id={`color-swatch-${color.name.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => {
                        setCurrentColor(color.hex);
                        if (brushMode === 'eraser') setBrushMode('charcoal');
                      }}
                      className={`group relative h-8 sm:h-9 rounded-xl border flex items-center justify-center transition-all ${
                        isSelected ? 'ring-2 ring-stone-900 ring-offset-2 scale-105' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex, borderColor: color.hex === '#FAF8F5' ? '#D6D3D1' : color.hex }}
                      title={`${color.name}: ${color.description}`}
                    >
                      {isSelected && (
                        <div
                          className={`w-2 h-2 rounded-full ${
                            color.hex === '#FAF8F5' ? 'bg-stone-900' : 'bg-white'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stroke Controls */}
            <div className={`${mobileToolTab === 'settings' ? 'block' : 'hidden'} md:block space-y-2.5 bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs`}>
              <div className="flex items-center justify-between text-xs font-medium text-stone-700">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-stone-400" />
                  Stroke Weight
                </span>
                <span className="text-stone-500 font-mono text-xs">{brushSize}px</span>
              </div>
              <input
                id="brush-size-slider"
                type="range"
                min="4"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#D95338]"
              />

              <div className="flex items-center justify-between text-xs font-medium text-stone-700 pt-1">
                <span>Pigment Density</span>
                <span className="text-stone-500 font-mono text-xs">{Math.round(brushOpacity * 100)}%</span>
              </div>
              <input
                id="brush-opacity-slider"
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={brushOpacity}
                onChange={(e) => setBrushOpacity(Number(e.target.value))}
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#D95338]"
              />
            </div>

            {/* Clear Canvas Action */}
            <div className="pt-0.5">
              <button
                id="canvas-clear-action-btn"
                onClick={handleClear}
                className="w-full py-2 text-xs font-medium text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-xl border border-dashed border-stone-200 transition-colors min-h-[36px]"
              >
                Clear Paper (Fresh Start)
              </button>
            </div>
          </div>
        </div>

        {/* Share To Gallery Dialog Overlay */}
        {showSubmitForm && (
          <div className="absolute inset-0 z-20 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 text-left relative">
              {submissionSuccess ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                  <h4 className="font-display-custom text-xl font-bold text-stone-900">
                    Artwork Added to the Gallery!
                  </h4>
                  <p className="text-sm text-stone-600">
                    Your drawing is now on display in the Student Gallery to inspire friends and classmates across Nepal.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitArtwork} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <div>
                      <h4 className="font-display-custom font-bold text-lg text-stone-900">
                        Share with the Student Gallery
                      </h4>
                      <p className="text-xs text-stone-500">
                        Show your creative voice and inspire other students.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowSubmitForm(false)}
                      className="text-stone-400 hover:text-stone-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Artwork Title
                    </label>
                    <input
                      id="submit-art-title-input"
                      type="text"
                      required
                      placeholder="e.g. Morning Light on the Hills"
                      value={artTitle}
                      onChange={(e) => setArtTitle(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C84B31]/30 focus:border-[#C84B31]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Your Name (or Nickname)
                      </label>
                      <input
                        id="submit-artist-name-input"
                        type="text"
                        required
                        placeholder="e.g. Aayush M."
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C84B31]/30 focus:border-[#C84B31]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        School Grade
                      </label>
                      <select
                        id="submit-grade-select"
                        value={studentGrade}
                        onChange={(e) => setStudentGrade(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C84B31]/30 focus:border-[#C84B31]"
                      >
                        <option value="Grade 4 (Primary)">Grade 4 (Primary)</option>
                        <option value="Grade 5 (Primary)">Grade 5 (Primary)</option>
                        <option value="Grade 7 (Middle)">Grade 7 (Middle)</option>
                        <option value="Grade 8 (Middle)">Grade 8 (Middle)</option>
                        <option value="Grade 9 (High)">Grade 9 (High School)</option>
                        <option value="Grade 10 (High)">Grade 10 (High School)</option>
                        <option value="Grade 11 (High)">Grade 11 (High School)</option>
                        <option value="Grade 12 (High)">Grade 12 (High School)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      City / District in Nepal
                    </label>
                    <input
                      id="submit-city-input"
                      type="text"
                      required
                      placeholder="e.g. Kathmandu, Pokhara, Janakpur, Dang"
                      value={studentCity}
                      onChange={(e) => setStudentCity(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C84B31]/30 focus:border-[#C84B31]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Tell the story behind your drawing
                    </label>
                    <textarea
                      id="submit-story-input"
                      rows={3}
                      placeholder="e.g. I was inspired by the morning mist over the valley and wanted to capture the warm sunlight."
                      value={artStory}
                      onChange={(e) => setArtStory(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C84B31]/30 focus:border-[#C84B31] resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowSubmitForm(false)}
                      className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      Back to Canvas
                    </button>
                    <button
                      id="submit-confirm-artwork-btn"
                      type="submit"
                      className="px-5 py-2 rounded-xl text-xs font-medium text-white bg-[#C84B31] hover:bg-[#B33E26] transition-all shadow-xs"
                    >
                      Publish to Gallery
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
