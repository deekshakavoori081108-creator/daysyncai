import React from 'react';
import { Scroll, Flag, CheckCircle, Flame, ShieldAlert, Sparkles } from 'lucide-react';

export default function RulebookCard({ ruleset, title }) {
  if (!ruleset) return null;

  return (
    <div className="heritage-card rounded-2xl p-6 sm:p-8 border-2 border-heritage-300 space-y-6 parchment-bg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-heritage-300 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-terracotta-500 text-white shadow-sm">
            <Scroll className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heritage text-xl sm:text-2xl font-bold text-lapis-900">
              Official Rulebook of Play
            </h3>
            <p className="text-xs text-lapis-600 font-medium">
              Codified historical game mechanics & victory conditions
            </p>
          </div>
        </div>
      </div>

      {/* Core Objective */}
      <div className="bg-heritage-100/90 p-4 rounded-xl border border-heritage-300">
        <h4 className="font-heritage text-xs font-bold uppercase tracking-wider text-terracotta-700 mb-1 flex items-center gap-1.5">
          <Flag className="w-4 h-4 text-terracotta-600" />
          <span>Primary Game Objective</span>
        </h4>
        <p className="text-sm text-lapis-900 font-semibold leading-relaxed">
          {ruleset.objective}
        </p>
      </div>

      {/* Board Setup */}
      <div className="space-y-2">
        <h4 className="font-heritage text-xs font-bold uppercase tracking-wider text-lapis-800">
          Board & Piece Setup
        </h4>
        <div className="text-xs sm:text-sm text-lapis-700 bg-white/80 p-4 rounded-xl border border-heritage-200 leading-relaxed font-medium">
          {ruleset.setup}
        </div>
      </div>

      {/* Turn Structure Phases */}
      {ruleset.turnStructure && ruleset.turnStructure.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-heritage text-xs font-bold uppercase tracking-wider text-lapis-800">
            Turn-by-Turn Play Order
          </h4>
          <div className="space-y-2.5">
            {ruleset.turnStructure.map((phase, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-white/90 border border-heritage-200 shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-lapis-600 text-white font-heritage text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="text-xs sm:text-sm text-lapis-800 leading-relaxed font-medium">
                  {phase}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Winning Conditions & Special Sanctuary Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
          <h4 className="font-heritage text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1.5 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Winning Condition</span>
          </h4>
          <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
            {ruleset.winningConditions}
          </p>
        </div>

        {ruleset.historicalMechanicNote && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <h4 className="font-heritage text-xs font-bold uppercase tracking-wider text-amber-800 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Cultural Mechanic Note</span>
            </h4>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
              {ruleset.historicalMechanicNote}
            </p>
          </div>
        )}
      </div>

      {ruleset.specialRules && ruleset.specialRules.length > 0 && (
        <div className="space-y-2 pt-1">
          <h4 className="font-heritage text-xs font-bold uppercase tracking-wider text-lapis-700 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-terracotta-600" />
            <span>Special Rules & Sanctuary Sanctions</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-lapis-700 list-disc list-inside font-medium bg-white/70 p-3 rounded-lg border border-heritage-200">
            {ruleset.specialRules.map((rule, idx) => (
              <li key={idx} className="leading-relaxed">{rule}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
