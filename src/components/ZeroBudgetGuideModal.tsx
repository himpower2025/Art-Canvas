import React from 'react';
import { X, Sparkles, Feather, Coffee, Palette, Compass, CheckCircle2 } from 'lucide-react';

interface ZeroBudgetGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ZeroBudgetGuideModal: React.FC<ZeroBudgetGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const recipes = [
    {
      title: 'Stove Charcoal & Ash',
      subtitle: 'Deep rich blacks without buying drawing charcoal',
      icon: Feather,
      ingredients: ['Cold charcoal piece from a wood stove or fireplace', 'Old soft cloth or rag', 'Small dish with a few drops of water'],
      method: 'Pick a cooled piece of black charcoal from the stove. Wipe away loose white ash. The sharp tip draws clean lines; rubbing the flat side creates gentle mountain shadows.',
      artTip: 'Use a pinch of soft bread to dab away charcoal and make glowing clouds!'
    },
    {
      title: 'Turmeric & Tea Wash',
      subtitle: 'Warm golden yellows and vintage tea backgrounds',
      icon: Coffee,
      ingredients: ['Half a spoon of kitchen turmeric powder', '1 black tea bag or tea leaves', 'A few spoons of warm water'],
      method: 'Brew black tea in warm water for a soft, warm paper tint. Dissolve turmeric in another cup for a bright sunshine yellow. Paint using an old toothbrush, feather, or cloth tip.',
      artTip: 'Paint a second layer of tea once dry to create deeper shadows.'
    },
    {
      title: 'Handmade Bamboo Pen',
      subtitle: 'A traditional pen for smooth, expressive drawing',
      icon: Palette,
      ingredients: ['Dry piece of thin bamboo (about 15 cm long)', 'Small craft knife or sharpener', 'Black ink or diluted soot water'],
      method: 'Shape one end of the bamboo at a slant to form a drawing nib. Cut a tiny slit down the middle to hold ink. Dip into ink to draw smooth, flowing lines.',
      artTip: 'Touch lightly for hair-thin lines, or press down for bold outlines.'
    },
    {
      title: 'River Clay & Earth Terracotta',
      subtitle: 'Hands-on clay sculpting using natural soil and riverbeds',
      icon: Compass,
      ingredients: ['Clean sticky clay from a riverbank or garden', 'A little water to knead', 'Smooth river pebble for polishing'],
      method: 'Find smooth, sticky clay beneath the garden topsoil. Remove any pebbles. Knead until soft and smooth like dough. Shape your favorite animal or bowl, and rub with a smooth river stone for a satin finish.',
      artTip: 'Let your sculpture dry slowly in the shade for three days so it does not crack.'
    }
  ];

  return (
    <div
      id="zero-budget-guide-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-xs transition-all animate-in fade-in"
    >
      <div className="relative w-full max-w-4xl xl:max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden text-left">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-stone-200 bg-stone-50/90">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#C84B31] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display-custom font-bold text-sm sm:text-base md:text-lg text-stone-900 truncate">
                Natural Paints & Materials Guide
              </h3>
              <p className="text-[10px] sm:text-xs text-stone-500 truncate">
                Easy ways to make safe colors with charcoal, tea, and flower petals
              </p>
            </div>
          </div>

          <button
            id="close-zero-budget-guide-btn"
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors flex items-center justify-center shrink-0 ml-1"
            aria-label="Close guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-stone-800 text-xs sm:text-sm leading-relaxed">
            <strong className="text-emerald-900">Colors from Nature:</strong> Nature is full of beautiful colors. You can make rich black paint with charcoal, warm brown with tea, and vibrant red with flower petals. It is safe, fun, and easy for any school classroom.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {recipes.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-stone-300 transition-all space-y-3 flex flex-col justify-between text-left"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-white text-stone-900 border border-stone-200 flex items-center justify-center shrink-0 shadow-2xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-display-custom font-bold text-sm sm:text-base text-stone-900 truncate">
                          {item.title}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-stone-500 truncate">{item.subtitle}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                        What you need:
                      </span>
                      <ul className="text-xs text-stone-600 space-y-0.5 pl-3 list-disc">
                        {item.ingredients.map((ing, i) => (
                          <li key={i}>{ing}</li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed pt-1">
                      {item.method}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-[11px] text-emerald-800 flex items-center gap-1.5 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                    <span><strong>Artist Tip:</strong> {item.artTip}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-stone-50/90 border-t border-stone-200 flex justify-end">
          <button
            id="done-zero-budget-btn"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-[#C84B31] text-white text-xs font-medium transition-colors min-h-[40px] shadow-xs"
          >
            Got It, Let's Create!
          </button>
        </div>
      </div>
    </div>
  );
};
