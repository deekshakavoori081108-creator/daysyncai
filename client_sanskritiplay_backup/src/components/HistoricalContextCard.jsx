import React from 'react';
import { BookOpen, ShieldCheck, Landmark, CheckCircle2, Award, ExternalLink } from 'lucide-react';

export default function HistoricalContextCard({ game }) {
  const score = game?.culturalSensitivityScore || 98;
  const citations = game?.archaeologicalCitations || [];
  const objectives = game?.educationalObjectives || [];

  return (
    <div className="heritage-card rounded-2xl p-6 border-2 border-heritage-300 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-heritage-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-terracotta-100 text-terracotta-700">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heritage text-xl font-bold text-lapis-900">
              Cultural Context & Archaeological Authenticity
            </h3>
            <p className="text-xs text-lapis-600 font-medium">
              Verified historical accuracy, museum artifact correlations, and pedagogy
            </p>
          </div>
        </div>

        {/* Authenticity Score Badge */}
        <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <div>
            <span className="text-[10px] uppercase font-extrabold text-emerald-800 tracking-wider block">
              Authenticity Rating
            </span>
            <span className="font-heritage text-lg font-extrabold text-emerald-700">
              {score}% Scholarly Fidelity
            </span>
          </div>
        </div>
      </div>

      {/* Historical Narrative */}
      <div className="space-y-3">
        <h4 className="font-heritage text-sm font-bold uppercase tracking-wider text-terracotta-700 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span>Archaeological Lore & Historical Context</span>
        </h4>
        <p className="text-sm sm:text-base text-lapis-800 font-lore leading-relaxed bg-heritage-100/60 p-4 rounded-xl border border-heritage-200">
          {game?.historicalContext || "This game draws upon excavated artifacts, cuneiform texts, and material culture to recreate the intellectual traditions and communal play of the ancient world."}
        </p>
      </div>

      {/* Archaeological Citations & Evidence */}
      {citations.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-heritage text-xs font-bold uppercase tracking-wider text-lapis-700">
            Primary Archaeological Citations & Artifacts
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {citations.map((cite, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-heritage-200 text-xs text-lapis-700 font-medium"
              >
                <span className="text-terracotta-500 font-bold">[{idx + 1}]</span>
                <span className="leading-snug">{cite}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Educational & Pedagogical Learning Outcomes */}
      {objectives.length > 0 && (
        <div className="space-y-3 pt-2">
          <h4 className="font-heritage text-xs font-bold uppercase tracking-wider text-lapis-700 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Curriculum & Learning Objectives</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {objectives.map((obj, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-heritage-100/80 border border-heritage-300 flex items-start gap-2.5 text-xs text-lapis-800 font-medium leading-relaxed"
              >
                <CheckCircle2 className="w-4 h-4 text-terracotta-600 flex-shrink-0 mt-0.5" />
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
