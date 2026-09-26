import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Sparkles, Save, Share2, Download, RotateCcw, Edit3, Play, Box, Scroll, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import ConceptWizard from '../components/ConceptWizard';
import BlueprintViewer from '../components/BlueprintViewer';
import RulebookCard from '../components/RulebookCard';
import PlaytestCanvas from '../components/PlaytestCanvas';
import HistoricalContextCard from '../components/HistoricalContextCard';
import PrintableExportModal from '../components/PrintableExportModal';
import { saveGameConcept, updateGameConcept } from '../lib/api';

export default function StudioPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const presetFromUrl = searchParams.get('preset');

  const [activeView, setActiveView] = useState('wizard'); // 'wizard' | 'studio'
  const [studioTab, setStudioTab] = useState('playtest'); // 'playtest' | 'rulebook' | 'blueprint' | 'history'
  const [currentConcept, setCurrentConcept] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const handleConceptGenerated = (conceptData) => {
    setCurrentConcept(conceptData);
    setActiveView('studio');
    setStudioTab('playtest');
  };

  const handleSaveToWorkspace = async (isPublic = true) => {
    if (!currentConcept) return;
    setIsSaving(true);
    setSaveSuccessMsg(null);

    try {
      const payload = {
        ...currentConcept,
        isPublic
      };

      let result;
      if (currentConcept.id && currentConcept.id >= 100) {
        result = await updateGameConcept(currentConcept.id, payload);
      } else {
        result = await saveGameConcept(payload);
      }

      if (result.success && result.data) {
        setCurrentConcept(result.data);
        setSaveSuccessMsg(isPublic ? 'Game published to Community Gallery!' : 'Saved to Workspace drafts.');
        setTimeout(() => setSaveSuccessMsg(null), 4000);
      }
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save game: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Studio Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-heritage-200 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🏺</span>
            <h1 className="font-heritage text-3xl sm:text-4xl font-extrabold text-lapis-900">
              AI Toy & Game Studio
            </h1>
            <span className="text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-terracotta-100 text-terracotta-700 border border-terracotta-200">
              Gemini 2.5 Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-lapis-600 font-medium mt-1">
            Synthesize historical research into printable 3D blueprints, game mechanics, and interactive board simulations.
          </p>
        </div>

        {/* Action Controls when in Studio View */}
        {activeView === 'studio' && currentConcept && (
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveView('wizard')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-heritage-100 hover:bg-heritage-200 text-lapis-700 text-xs font-bold transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>New Concept</span>
            </button>

            <button
              onClick={() => setExportModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-heritage-50 text-lapis-800 border border-heritage-300 text-xs font-bold shadow-sm transition-all"
            >
              <Download className="w-4 h-4 text-terracotta-500" />
              <span>Export (PDF/3D)</span>
            </button>

            <button
              onClick={() => handleSaveToWorkspace(true)}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-bold shadow-md transition-all disabled:opacity-50"
            >
              <Share2 className="w-4 h-4" />
              <span>{isSaving ? 'Publishing...' : 'Publish to Gallery'}</span>
            </button>
          </div>
        )}
      </div>

      {saveSuccessMsg && (
        <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* VIEW 1: Concept Generator Wizard */}
      {activeView === 'wizard' && (
        <ConceptWizard
          onConceptGenerated={handleConceptGenerated}
          initialPresetName={presetFromUrl}
        />
      )}

      {/* VIEW 2: Interactive Studio & Blueprint Workspace */}
      {activeView === 'studio' && currentConcept && (
        <div className="space-y-8">
          {/* Concept Headline Card */}
          <div className="heritage-card-gold rounded-2xl p-6 sm:p-8 border-2 border-amber-300 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-terracotta-600 text-white">
                {currentConcept.civilization}
              </span>
              <span className="text-xs font-bold text-lapis-600 bg-white px-3 py-1 rounded-full border border-heritage-200">
                {currentConcept.gameType} • Target Age: {currentConcept.targetAge} • {currentConcept.complexity}
              </span>
            </div>

            <h2 className="font-heritage text-2xl sm:text-3xl font-extrabold text-lapis-900 mt-2">
              {currentConcept.title}
            </h2>
            <p className="text-sm sm:text-base text-terracotta-700 font-lore italic font-medium mt-1">
              "{currentConcept.tagline}"
            </p>
          </div>

          {/* Studio Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-heritage-200 pb-2 overflow-x-auto">
            {[
              { id: 'playtest', name: '2D Playtest Simulator', icon: Play },
              { id: 'rulebook', name: 'Codified Rulebook', icon: Scroll },
              { id: 'blueprint', name: '3D Fabrication & Costs', icon: Box },
              { id: 'history', name: 'Archaeology & Lore', icon: BookOpen }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = studioTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setStudioTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-terracotta-500 text-white shadow-sm'
                      : 'bg-heritage-100 text-lapis-700 hover:bg-heritage-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Content */}
          <div className="animate-fade-in">
            {studioTab === 'playtest' && (
              <PlaytestCanvas game={currentConcept} />
            )}

            {studioTab === 'rulebook' && (
              <RulebookCard ruleset={currentConcept.ruleset} title={currentConcept.title} />
            )}

            {studioTab === 'blueprint' && (
              <BlueprintViewer game={currentConcept} />
            )}

            {studioTab === 'history' && (
              <HistoricalContextCard game={currentConcept} />
            )}
          </div>
        </div>
      )}

      {/* Export Modal */}
      {currentConcept && (
        <PrintableExportModal
          isOpen={exportModalOpen}
          onClose={() => setExportModalOpen(false)}
          game={currentConcept}
        />
      )}
    </div>
  );
}
