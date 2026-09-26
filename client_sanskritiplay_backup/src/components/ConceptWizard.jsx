import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, CheckCircle2, Landmark, Compass, Award, Box, Flame, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateConceptAI } from '../lib/api';
import { STUDIO_PRESETS } from '../lib/presets';
import {
  CivilizationsList,
  GameCategoriesList,
  AgeGroupsList,
  ComplexityLevelsList,
  MaterialConstraintsList,
  EducationalPillarsList
} from '@shared/schema.js';

export default function ConceptWizard({ onConceptGenerated, initialPresetName }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    civilization: 'Ancient Mesopotamia',
    category: 'Board Game',
    ageGroup: '9-12',
    complexity: 'Intermediate',
    materialConstraint: 'Wood & Laser Cut Timber',
    theme: 'Sumerian Astronomy and Inanna’s Seven Gateways of the Cosmos',
    archaeologicalInspiration: 'British Museum Royal Game of Ur inlaid shell board & cuneiform eclipse tablets',
    playerCount: '2-4 Players',
    duration: '25-45 mins',
    educationalPillar: 'History & Archaeological Evidence'
  });

  // Handle Preset Load
  useEffect(() => {
    if (initialPresetName) {
      const match = STUDIO_PRESETS.find(p => p.civilization.toLowerCase().includes(initialPresetName.toLowerCase()) || p.title.toLowerCase().includes(initialPresetName.toLowerCase()));
      if (match) {
        applyPreset(match);
      }
    }
  }, [initialPresetName]);

  const applyPreset = (preset) => {
    setFormData(prev => ({
      ...prev,
      civilization: preset.civilization,
      category: preset.category,
      ageGroup: preset.ageGroup,
      complexity: preset.complexity,
      materialConstraint: preset.materialConstraint,
      theme: preset.theme,
      archaeologicalInspiration: preset.archaeologicalInspiration
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationError(null);

    try {
      const result = await generateConceptAI(formData);
      if (result.success && result.data) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {}

        if (onConceptGenerated) {
          onConceptGenerated(result.data);
        }
      } else {
        throw new Error(result.error || 'Failed to generate concept');
      }
    } catch (err) {
      console.error('Generation failed:', err);
      setGenerationError(err.message || 'An error occurred while generating the game concept.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="heritage-card rounded-2xl p-6 sm:p-10 border-2 border-heritage-300 shadow-xl space-y-8">
      {/* Wizard Step Progress Tracker */}
      <div className="border-b border-heritage-200 pb-6">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {[
            { step: 1, title: 'Civilization', icon: Landmark },
            { step: 2, title: 'Format & Materials', icon: Box },
            { step: 3, title: 'Age & Pedagogy', icon: Award },
            { step: 4, title: 'Lore & Theme', icon: Sparkles }
          ].map((item) => {
            const Icon = item.icon;
            const isCompleted = currentStep > item.step;
            const isCurrent = currentStep === item.step;
            return (
              <div key={item.step} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    isCurrent
                      ? 'bg-terracotta-500 text-white shadow-md ring-4 ring-terracotta-100 scale-110'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-heritage-200 text-lapis-600'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className={`text-[11px] font-bold mt-1.5 hidden sm:block ${isCurrent ? 'text-terracotta-600' : 'text-lapis-600'}`}>
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preset Quick Inspiration Bar */}
      <div className="bg-heritage-100/70 p-4 rounded-xl border border-heritage-200">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-terracotta-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-lapis-900">
            Quick Historical Presets & Challenge Prompts:
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {STUDIO_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(preset)}
              className="px-3 py-1 rounded-lg text-xs font-semibold bg-white hover:bg-terracotta-50 text-lapis-800 border border-heritage-300 hover:border-terracotta-400 transition-all flex items-center gap-1.5"
            >
              <span>{preset.icon}</span>
              <span>{preset.title.split(':')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: Civilization Selection */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-left">
            <h3 className="font-heritage text-xl font-bold text-lapis-900">
              Step 1: Choose Your Historical Civilization
            </h3>
            <p className="text-xs text-lapis-600">
              Select the historical culture whose archaeology, folklore, and mathematical games will inspire your design.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CivilizationsList.map((civ) => {
              const isSelected = formData.civilization === civ;
              return (
                <button
                  key={civ}
                  type="button"
                  onClick={() => setFormData({ ...formData, civilization: civ })}
                  className={`p-4 rounded-xl text-left border-2 transition-all flex items-start justify-between ${
                    isSelected
                      ? 'bg-terracotta-50 border-terracotta-500 shadow-md ring-2 ring-terracotta-200'
                      : 'bg-white hover:bg-heritage-50 border-heritage-200 hover:border-heritage-300'
                  }`}
                >
                  <div>
                    <span className="font-heritage text-sm font-bold text-lapis-900 block">
                      {civ}
                    </span>
                    <span className="text-[11px] text-lapis-600 font-medium">
                      Authentic archaeological mechanics
                    </span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-terracotta-600 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: Game Category, Complexity & Material */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="text-left">
            <h3 className="font-heritage text-xl font-bold text-lapis-900">
              Step 2: Game Category, Complexity & Materials
            </h3>
            <p className="text-xs text-lapis-600">
              Define the physical form factor and fab-lab material constraints for prototyping.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-lapis-700 mb-2">
                Toy / Game Category:
              </label>
              <div className="space-y-2">
                {GameCategoriesList.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat })}
                    className={`w-full p-2.5 rounded-lg text-xs font-bold text-left border transition-all ${
                      formData.category === cat
                        ? 'bg-terracotta-500 text-white border-terracotta-600 shadow-sm'
                        : 'bg-white text-lapis-800 border-heritage-200 hover:bg-heritage-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-lapis-700 mb-2">
                Strategic Complexity:
              </label>
              <div className="space-y-2">
                {ComplexityLevelsList.map((comp) => (
                  <button
                    key={comp}
                    type="button"
                    onClick={() => setFormData({ ...formData, complexity: comp })}
                    className={`w-full p-2.5 rounded-lg text-xs font-bold text-left border transition-all ${
                      formData.complexity === comp
                        ? 'bg-lapis-600 text-white border-lapis-700 shadow-sm'
                        : 'bg-white text-lapis-800 border-heritage-200 hover:bg-heritage-50'
                    }`}
                  >
                    {comp}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-lapis-700 mb-2">
                Physical Material Constraint:
              </label>
              <div className="space-y-2">
                {MaterialConstraintsList.map((mat) => (
                  <button
                    key={mat}
                    type="button"
                    onClick={() => setFormData({ ...formData, materialConstraint: mat })}
                    className={`w-full p-2.5 rounded-lg text-[11px] font-bold text-left border transition-all truncate ${
                      formData.materialConstraint === mat
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                        : 'bg-white text-lapis-800 border-heritage-200 hover:bg-heritage-50'
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Target Age & Pedagogical Pillars */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="text-left">
            <h3 className="font-heritage text-xl font-bold text-lapis-900">
              Step 3: Age Group & Core Learning Objectives
            </h3>
            <p className="text-xs text-lapis-600">
              Tailor game mechanics to appropriate developmental cognitive milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-lapis-700 mb-2">
                Target Age Group:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {AgeGroupsList.map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => setFormData({ ...formData, ageGroup: age })}
                    className={`p-3 rounded-lg text-xs font-bold text-center border transition-all ${
                      formData.ageGroup === age
                        ? 'bg-terracotta-500 text-white border-terracotta-600 shadow-sm'
                        : 'bg-white text-lapis-800 border-heritage-200 hover:bg-heritage-50'
                    }`}
                  >
                    {age} {age !== 'All Ages' ? 'Years' : ''}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-lapis-700 mb-2">
                Primary Pedagogical Pillar:
              </label>
              <div className="space-y-2">
                {EducationalPillarsList.map((pillar) => (
                  <button
                    key={pillar}
                    type="button"
                    onClick={() => setFormData({ ...formData, educationalPillar: pillar })}
                    className={`w-full p-2.5 rounded-lg text-xs font-bold text-left border transition-all ${
                      formData.educationalPillar === pillar
                        ? 'bg-lapis-600 text-white border-lapis-700 shadow-sm'
                        : 'bg-white text-lapis-800 border-heritage-200 hover:bg-heritage-50'
                    }`}
                  >
                    {pillar}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Lore, Theme & Custom Prompts */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <div className="text-left">
            <h3 className="font-heritage text-xl font-bold text-lapis-900">
              Step 4: Archaeological Artifact Lore & Core Theme
            </h3>
            <p className="text-xs text-lapis-600">
              Provide context or specific archaeological artifacts you'd like the AI to integrate.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-lapis-700 mb-1.5">
                Core Narrative / Historical Theme:
              </label>
              <input
                type="text"
                value={formData.theme}
                onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                placeholder="e.g. Navigating seasonal monsoon floods and terracotta cart trade"
                className="w-full text-sm font-semibold p-3.5 rounded-xl border border-heritage-300 bg-white focus:ring-2 focus:ring-terracotta-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-lapis-700 mb-1.5">
                Archaeological Artifact / Museum Inspiration (Optional):
              </label>
              <textarea
                rows={3}
                value={formData.archaeologicalInspiration}
                onChange={(e) => setFormData({ ...formData, archaeologicalInspiration: e.target.value })}
                placeholder="e.g. British Museum BM 120830, Tutankhamun tomb KV62 gaming chest, Lothal dockyard anchor stones"
                className="w-full text-sm font-semibold p-3.5 rounded-xl border border-heritage-300 bg-white focus:ring-2 focus:ring-terracotta-400 focus:outline-none"
              />
            </div>
          </div>

          {generationError && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
              {generationError}
            </div>
          )}
        </div>
      )}

      {/* Wizard Footer Navigation */}
      <div className="flex items-center justify-between border-t border-heritage-200 pt-6">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={isGenerating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-heritage-100 hover:bg-heritage-200 text-lapis-800 text-xs font-bold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>
        ) : (
          <div></div>
        )}

        {currentStep < 4 ? (
          <button
            type="button"
            onClick={() => setCurrentStep(prev => prev + 1)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-bold shadow-md transition-all"
          >
            <span>Continue to Step {currentStep + 1}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-terracotta-500 via-terracotta-600 to-terracotta-700 hover:from-terracotta-600 hover:to-terracotta-800 text-white font-bold text-sm shadow-xl transition-all disabled:opacity-50"
          >
            <Sparkles className={`w-5 h-5 text-heritage-200 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Synthesizing Historical Game...' : 'Generate Full Game Blueprint'}</span>
          </button>
        )}
      </div>

      {/* Live AI Generation Spinner Overlay */}
      {isGenerating && (
        <div className="p-6 rounded-2xl bg-heritage-100/90 border-2 border-dashed border-terracotta-400 text-center space-y-3 animate-pulse-slow">
          <div className="flex justify-center">
            <RefreshCw className="w-8 h-8 text-terracotta-600 animate-spin" />
          </div>
          <h4 className="font-heritage text-base font-bold text-lapis-900">
            Gemini 2.5 AI is consulting historical archives & game theory matrices...
          </h4>
          <p className="text-xs text-lapis-600 max-w-md mx-auto">
            Structuring rulesets, balancing turn probability, verifying archaeological citations, and generating 3D STL manufacturing blueprints.
          </p>
        </div>
      )}
    </div>
  );
}
