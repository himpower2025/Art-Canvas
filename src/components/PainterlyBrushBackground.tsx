import React from 'react';

/**
 * PainterlyBrushBackground
 * Renders sophisticated, layered painterly brush strokes, dry-brush bristle textures,
 * gouache washes, and subtle paint splatters across the page in fresh pastel mint,
 * sage green, and titanium white tones.
 */
export const PainterlyBrushBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* SVG Definitions for realistic paint bristle and canvas displacement */}
      <svg className="absolute w-0 h-0" width="0" height="0">
        <defs>
          {/* Organic paint edge roughening filter */}
          <filter id="paintRoughen" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04 0.08"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="7"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <filter id="fineBristle" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.15 0.02"
              numOctaves="2"
              result="bristleNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="bristleNoise"
              scale="4"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Gradients for paint transparency and thickness */}
          <linearGradient id="mintWash1" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#C8EBD9" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#A8DFC3" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#D4F3E3" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="mintWash2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B6E4CD" stopOpacity="0.75" />
            <stop offset="40%" stopColor="#87CFAB" stopOpacity="0.45" />
            <stop offset="85%" stopColor="#CEF0DE" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#E6F8EF" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="sageAccent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6EBD97" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#9BD8BA" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C2EDD5" stopOpacity="0.08" />
          </linearGradient>

          <linearGradient id="whiteHighlight" x1="0%" y1="0%" x2="100%" y2="30%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>

          <linearGradient id="terracottaGlaze" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C84B31" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#D97706" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#C84B31" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* =========================================================
          STROKE GROUP 1: TOP LEFT HERO CORNER SWEEPS
          Broad angled brush strokes that frame the header and logo
          ========================================================= */}
      <svg
        className="absolute -top-12 -left-16 w-[420px] sm:w-[620px] lg:w-[820px] h-[350px] sm:h-[450px] lg:h-[550px] opacity-80"
        viewBox="0 0 800 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Broad wet wash */}
        <path
          d="M-20 40 C180 20, 360 90, 520 180 C620 235, 710 320, 760 410 C720 425, 610 370, 480 290 C340 200, 160 130, -30 110 Z"
          fill="url(#mintWash1)"
          filter="url(#paintRoughen)"
        />
        {/* Layer 2: Dry brush bristle streak 1 */}
        <path
          d="M-10 70 C190 55, 380 125, 540 215 C625 265, 730 365, 780 430"
          stroke="#7FCCA3"
          strokeWidth="24"
          strokeLinecap="round"
          strokeOpacity="0.35"
          filter="url(#fineBristle)"
        />
        {/* Layer 3: Dry brush bristle streak 2 */}
        <path
          d="M10 95 C220 75, 410 150, 560 240 C630 280, 710 360, 750 420"
          stroke="#5FAF86"
          strokeWidth="12"
          strokeLinecap="round"
          strokeOpacity="0.22"
          strokeDasharray="450 30 120 20"
        />
        {/* Titanium white light scrape */}
        <path
          d="M40 120 C240 100, 430 170, 580 260 C640 300, 690 355, 720 400"
          stroke="url(#whiteHighlight)"
          strokeWidth="18"
          strokeLinecap="round"
          strokeOpacity="0.55"
        />
        {/* Bristle feather lines */}
        <path
          d="M0 60 C180 45, 350 110, 500 190"
          stroke="#9CD7B7"
          strokeWidth="4"
          strokeOpacity="0.4"
          strokeDasharray="80 15 140 25"
        />
        <path
          d="M15 80 C200 65, 370 135, 520 215"
          stroke="#A6E0C0"
          strokeWidth="5"
          strokeOpacity="0.3"
        />
        {/* Fine paint droplets / splatter */}
        <circle cx="580" cy="180" r="3.5" fill="#6EBD97" fillOpacity="0.35" />
        <circle cx="630" cy="220" r="2" fill="#5FAF86" fillOpacity="0.3" />
        <circle cx="690" cy="310" r="4" fill="#87CFAB" fillOpacity="0.25" />
        <circle cx="740" cy="380" r="2.5" fill="#5FAF86" fillOpacity="0.4" />
        <circle cx="710" cy="450" r="3" fill="#A8DFC3" fillOpacity="0.35" />
      </svg>

      {/* =========================================================
          STROKE GROUP 2: TOP RIGHT HERO & WORKBENCH ACCENT
          A fluid gouache wave stroke framing the interactive canvas
          ========================================================= */}
      <svg
        className="absolute top-24 -right-20 w-[380px] sm:w-[580px] lg:w-[780px] h-[400px] sm:h-[550px] opacity-75"
        viewBox="0 0 750 550"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft wide wash */}
        <path
          d="M800 60 C620 40, 430 110, 270 210 C140 290, 40 400, -10 490 C25 510, 130 460, 260 370 C410 270, 600 180, 800 160 Z"
          fill="url(#mintWash2)"
          filter="url(#paintRoughen)"
        />
        {/* Deep jade-mint core stroke */}
        <path
          d="M780 100 C610 80, 420 150, 280 250 C160 330, 70 430, 20 500"
          stroke="#68B590"
          strokeWidth="32"
          strokeLinecap="round"
          strokeOpacity="0.22"
          filter="url(#fineBristle)"
        />
        {/* White dry-brush scrape */}
        <path
          d="M750 120 C580 105, 400 175, 260 275 C150 350, 80 430, 40 490"
          stroke="url(#whiteHighlight)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeOpacity="0.6"
          strokeDasharray="300 20 180 15"
        />
        {/* Thin energetic bristle traces */}
        <path
          d="M720 85 C550 70, 380 140, 250 235 C140 310, 60 400, 10 460"
          stroke="#55A57E"
          strokeWidth="5"
          strokeOpacity="0.25"
          strokeDasharray="60 12 120 18"
        />
        <path
          d="M760 135 C600 120, 440 185, 310 280"
          stroke="#A8DFC3"
          strokeWidth="7"
          strokeOpacity="0.4"
        />
        {/* Splatters */}
        <circle cx="220" cy="270" r="3" fill="#68B590" fillOpacity="0.3" />
        <circle cx="170" cy="320" r="4.5" fill="#87CFAB" fillOpacity="0.25" />
        <circle cx="110" cy="380" r="2" fill="#5FAF86" fillOpacity="0.35" />
        <circle cx="60" cy="450" r="3.5" fill="#68B590" fillOpacity="0.2" />
      </svg>

      {/* =========================================================
          STROKE GROUP 3: MID-PAGE AMBIENT STROKES (BEHIND CONTENT)
          Horizontal roller and palette-knife strokes with raw texture
          ========================================================= */}
      {/* Mid-Left: Horizontal palette knife swipe */}
      <svg
        className="absolute top-[42%] -left-20 w-[450px] sm:w-[700px] h-[320px] sm:h-[420px] opacity-70"
        viewBox="0 0 700 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-40 180 C120 150, 310 160, 480 200 C580 220, 660 260, 710 300 C680 320, 590 300, 480 260 C320 210, 130 195, -40 240 Z"
          fill="url(#mintWash1)"
          filter="url(#paintRoughen)"
        />
        {/* Palette knife thick scraped edge */}
        <path
          d="M-20 200 C140 170, 330 180, 500 220 C600 240, 670 280, 700 310"
          stroke="#78C69E"
          strokeWidth="28"
          strokeLinecap="round"
          strokeOpacity="0.25"
          filter="url(#fineBristle)"
        />
        {/* White highlights on the paint ridge */}
        <path
          d="M10 195 C170 168, 350 178, 515 218 C595 238, 650 270, 680 295"
          stroke="url(#whiteHighlight)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeOpacity="0.65"
          strokeDasharray="220 30 150 20"
        />
        {/* Dry bristle streaks */}
        <path
          d="M-30 225 C130 190, 310 200, 470 235"
          stroke="#55A57E"
          strokeWidth="4"
          strokeOpacity="0.2"
          strokeDasharray="90 20 160 15"
        />
        {/* Delicate terracotta warm glaze streak */}
        <path
          d="M30 175 C190 150, 370 160, 530 195"
          stroke="url(#terracottaGlaze)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeOpacity="0.8"
        />
      </svg>

      {/* Mid-Right: Dynamic curved brush arch */}
      <svg
        className="absolute top-[58%] -right-16 w-[420px] sm:w-[650px] h-[340px] sm:h-[440px] opacity-70"
        viewBox="0 0 650 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M700 120 C530 140, 360 210, 220 300 C110 370, 30 450, -20 530 C15 540, 105 470, 210 390 C340 300, 500 230, 680 200 Z"
          fill="url(#mintWash2)"
          filter="url(#paintRoughen)"
        />
        <path
          d="M680 150 C520 170, 360 240, 230 330 C130 400, 60 470, 10 530"
          stroke="#68B590"
          strokeWidth="26"
          strokeLinecap="round"
          strokeOpacity="0.22"
          filter="url(#fineBristle)"
        />
        <path
          d="M650 170 C500 190, 350 260, 230 345 C145 410, 85 470, 45 520"
          stroke="url(#whiteHighlight)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeOpacity="0.55"
        />
        {/* Paint drips / dabs */}
        <circle cx="210" cy="320" r="3" fill="#68B590" fillOpacity="0.3" />
        <circle cx="160" cy="370" r="4" fill="#87CFAB" fillOpacity="0.25" />
        <circle cx="120" cy="420" r="2.5" fill="#5FAF86" fillOpacity="0.35" />
      </svg>

      {/* =========================================================
          STROKE GROUP 4: LOWER GALLERY & FOOTER SWEEPS
          Subtle wide anchoring strokes at the bottom of the canvas
          ========================================================= */}
      <svg
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[900px] lg:w-[1300px] h-[300px] opacity-60"
        viewBox="0 0 1300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Long horizontal ground wash */}
        <path
          d="M0 160 C320 120, 640 180, 960 140 C1120 120, 1240 150, 1320 170 C1250 200, 1090 180, 930 200 C610 240, 290 180, -20 220 Z"
          fill="url(#mintWash1)"
          filter="url(#paintRoughen)"
        />
        <path
          d="M50 170 C350 135, 660 190, 970 155 C1110 140, 1220 165, 1280 180"
          stroke="#7FCCA3"
          strokeWidth="20"
          strokeLinecap="round"
          strokeOpacity="0.2"
          filter="url(#fineBristle)"
        />
        <path
          d="M100 185 C380 150, 680 200, 980 170"
          stroke="url(#whiteHighlight)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeOpacity="0.5"
          strokeDasharray="260 40 180 30"
        />
      </svg>
    </div>
  );
};

/**
 * BrushStrokeHighlight
 * An authentic painterly brush stroke placed right behind headings or badges
 * to give that handcrafted art studio look.
 */
interface BrushStrokeHighlightProps {
  className?: string;
  variant?: 'mint' | 'sage' | 'terracotta' | 'white';
}

export const BrushStrokeHighlight: React.FC<BrushStrokeHighlightProps> = ({
  className = '',
  variant = 'mint'
}) => {
  const colorMap = {
    mint: {
      fill: '#B8E7D0',
      stroke1: '#74C59C',
      stroke2: '#4DA67B',
      opacity: '0.65'
    },
    sage: {
      fill: '#9ED8BA',
      stroke1: '#5AA982',
      stroke2: '#3D8C65',
      opacity: '0.55'
    },
    terracotta: {
      fill: '#F4D3CC',
      stroke1: '#E08B77',
      stroke2: '#C84B31',
      opacity: '0.6'
    },
    white: {
      fill: '#FFFFFF',
      stroke1: 'rgba(255, 255, 255, 0.8)',
      stroke2: 'rgba(255, 255, 255, 0.5)',
      opacity: '0.85'
    }
  };

  const c = colorMap[variant];

  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      viewBox="0 0 320 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      {/* Broad painterly wash */}
      <path
        d="M6 26 C45 15, 110 18, 175 22 C235 25, 285 17, 314 21 C308 34, 260 38, 200 36 C130 33, 65 37, 8 36 Z"
        fill={c.fill}
        fillOpacity={c.opacity}
      />
      {/* Core saturated brush bristle mark */}
      <path
        d="M12 25 C55 18, 120 20, 185 24 C245 27, 290 20, 310 23"
        stroke={c.stroke1}
        strokeWidth="7"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />
      {/* Fine dry brush bristle trace */}
      <path
        d="M20 28 C68 22, 130 24, 195 27 C255 30, 285 24, 305 26"
        stroke={c.stroke2}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeOpacity="0.3"
        strokeDasharray="60 12 80 15"
      />
      {/* Subtle white highlight for wet-paint sheen */}
      <path
        d="M30 22 C75 17, 135 19, 195 23 C245 25, 275 20, 295 22"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.75"
        strokeDasharray="40 10 70 15"
      />
    </svg>
  );
};

/**
 * ArtisticPaintDab
 * A cute, stylish dab / palette stroke to accent corners or cards
 */
interface ArtisticPaintDabProps {
  className?: string;
  size?: number;
}

export const ArtisticPaintDab: React.FC<ArtisticPaintDabProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Thick acrylic paint impasto dab */}
      <path
        d="M18 52 C22 34, 42 22, 60 26 C75 30, 85 45, 82 62 C79 78, 62 86, 44 83 C26 80, 15 67, 18 52 Z"
        fill="#A6DFC2"
        fillOpacity="0.5"
      />
      <path
        d="M26 48 C32 36, 48 30, 62 34 C72 37, 78 48, 75 60 C72 71, 58 77, 45 74 C32 72, 22 60, 26 48 Z"
        fill="#72C79D"
        fillOpacity="0.35"
      />
      {/* Wet highlight */}
      <path
        d="M34 42 C40 36, 52 34, 62 38"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
      {/* Tiny paint fleck */}
      <circle cx="86" cy="30" r="3" fill="#5AAF86" fillOpacity="0.4" />
      <circle cx="92" cy="42" r="1.8" fill="#72C79D" fillOpacity="0.35" />
    </svg>
  );
};
