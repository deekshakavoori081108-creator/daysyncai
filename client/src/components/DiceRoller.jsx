import React, { useState } from 'react';
import { Dices, RefreshCw, Sparkles, CheckCircle } from 'lucide-react';

export default function DiceRoller({ diceType = 'd6', diceCount = 1, onRollComplete }) {
  const [isRolling, setIsRolling] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [individualValues, setIndividualValues] = useState([]);

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);

    setTimeout(() => {
      let total = 0;
      let values = [];

      if (diceType === 'tetrahedral') {
        // Sumerian Ur dice: 4 tetrahedral dice where each has 2 white tips (probability of 1 is 50%)
        const count = diceCount || 4;
        for (let i = 0; i < count; i++) {
          const val = Math.random() < 0.5 ? 1 : 0;
          values.push(val);
          total += val;
        }
      } else if (diceType === 'cowrie_shells') {
        // Indian Chaupar cowries: 6 shells
        const count = diceCount || 6;
        let mouthsUp = 0;
        for (let i = 0; i < count; i++) {
          const isUp = Math.random() < 0.5;
          values.push(isUp ? 'Mouth' : 'Back');
          if (isUp) mouthsUp++;
        }
        // Chaupar scoring: 1 up = 10, 6 up = 25, others = face count
        total = mouthsUp === 1 ? 10 : mouthsUp === 6 ? 25 : mouthsUp === 0 ? 6 : mouthsUp;
      } else if (diceType === 'binary_sticks') {
        // Egyptian throwing sticks: 4 flat sticks
        const count = diceCount || 4;
        let whiteSides = 0;
        for (let i = 0; i < count; i++) {
          const isLight = Math.random() < 0.5;
          values.push(isLight ? 'Light' : 'Dark');
          if (isLight) whiteSides++;
        }
        total = whiteSides === 0 ? 5 : whiteSides;
      } else if (diceType === 'astragaloi') {
        // Ancient sheep knucklebones: 4 distinct landing faces (values 1, 3, 4, 6)
        const boneFaces = [1, 3, 4, 6];
        const count = diceCount || 4;
        for (let i = 0; i < count; i++) {
          const val = boneFaces[Math.floor(Math.random() * boneFaces.length)];
          values.push(val);
          total += val;
        }
      } else {
        // Standard D6 (Harappan cubic)
        const count = diceCount || 1;
        for (let i = 0; i < count; i++) {
          const val = Math.floor(Math.random() * 6) + 1;
          values.push(val);
          total += val;
        }
      }

      setIndividualValues(values);
      setCurrentResult(total);
      setIsRolling(false);

      if (onRollComplete) {
        onRollComplete(total, values);
      }
    }, 600);
  };

  const getDiceName = () => {
    switch (diceType) {
      case 'tetrahedral': return 'Sumerian Tetrahedral Pyramid Dice (4x)';
      case 'cowrie_shells': return 'Vedic Cowrie Shells (Kauri Casting)';
      case 'binary_sticks': return 'Egyptian Senet Casting Sticks (4x)';
      case 'astragaloi': return 'Greco-Roman Astragaloi (Knucklebones)';
      default: return 'Harappan Excavated Pip Dice (D6)';
    }
  };

  return (
    <div className="bg-heritage-100/90 rounded-xl p-4 border border-heritage-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Dices className="w-5 h-5 text-terracotta-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-lapis-900">
            {getDiceName()}
          </span>
        </div>
        {currentResult !== null && (
          <span className="text-xs font-bold text-terracotta-700 bg-terracotta-100 px-2 py-0.5 rounded border border-terracotta-200">
            Roll Total: {currentResult}
          </span>
        )}
      </div>

      {/* Visual Dice Display */}
      <div className="flex items-center justify-center gap-2.5 my-3 min-h-[50px]">
        {diceType === 'tetrahedral' && (
          <div className="flex gap-2">
            {(individualValues.length ? individualValues : [0, 1, 0, 1]).map((val, idx) => (
              <div
                key={idx}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold border-2 transition-all ${
                  isRolling ? 'animate-dice-roll' : ''
                } ${
                  val === 1
                    ? 'bg-amber-100 border-amber-500 text-amber-900 shadow'
                    : 'bg-stone-200 border-stone-400 text-stone-600'
                }`}
              >
                {val === 1 ? '▲ 1' : '△ 0'}
              </div>
            ))}
          </div>
        )}

        {diceType === 'cowrie_shells' && (
          <div className="flex gap-2 flex-wrap justify-center">
            {(individualValues.length ? individualValues : ['Mouth', 'Back', 'Mouth', 'Back', 'Back', 'Mouth']).map((val, idx) => (
              <div
                key={idx}
                className={`px-2.5 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${
                  isRolling ? 'animate-bounce' : ''
                } ${
                  val === 'Mouth'
                    ? 'bg-amber-100 border-amber-600 text-amber-900 shadow-sm'
                    : 'bg-stone-100 border-stone-400 text-stone-700'
                }`}
              >
                {val === 'Mouth' ? '🐚 Mouth' : '⚪ Back'}
              </div>
            ))}
          </div>
        )}

        {diceType === 'binary_sticks' && (
          <div className="flex gap-2">
            {(individualValues.length ? individualValues : ['Light', 'Dark', 'Light', 'Dark']).map((val, idx) => (
              <div
                key={idx}
                className={`w-8 h-14 rounded flex items-center justify-center text-[10px] font-bold border-2 transition-all ${
                  isRolling ? 'animate-spin' : ''
                } ${
                  val === 'Light'
                    ? 'bg-amber-50 border-amber-400 text-amber-900'
                    : 'bg-stone-800 border-stone-900 text-white'
                }`}
              >
                {val === 'Light' ? '🪵 1' : '⬛ 0'}
              </div>
            ))}
          </div>
        )}

        {diceType !== 'tetrahedral' && diceType !== 'cowrie_shells' && diceType !== 'binary_sticks' && (
          <div className="flex gap-2">
            {(individualValues.length ? individualValues : [4]).map((val, idx) => (
              <div
                key={idx}
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold bg-white border-2 border-terracotta-400 text-terracotta-700 shadow ${
                  isRolling ? 'animate-dice-roll' : ''
                }`}
              >
                {val}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Roll Action Button */}
      <button
        onClick={rollDice}
        disabled={isRolling}
        className="w-full py-2.5 rounded-lg bg-terracotta-500 hover:bg-terracotta-600 active:bg-terracotta-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow transition-all disabled:opacity-50"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isRolling ? 'animate-spin' : ''}`} />
        <span>{isRolling ? 'Casting Ancient Dice...' : 'Cast Ancient Randomizer'}</span>
      </button>
    </div>
  );
}
