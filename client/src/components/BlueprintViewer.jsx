import React, { useState } from 'react';
import { Box, Layers, Hammer, FileText, Download, Printer, CheckCircle, Cpu, Sliders } from 'lucide-react';
import CostEstimator from './CostEstimator';

export default function BlueprintViewer({ game }) {
  const [activeTab, setActiveTab] = useState('fabrication');
  const blueprint = game?.fabricationBlueprint || {
    primaryFabricationMethod: "3D Printing (PLA) + Laser Cut Plywood",
    recommendedFilamentOrStock: "Wood-Fill PLA (20% wood fibres) / 3mm Birch Plywood",
    totalEstimatedWeightGrams: 220,
    estimatedPrintTimeHours: 5.5,
    estimatedManufacturingCostUsd: 7.80,
    tolerancesMm: 0.2,
    assemblyInstructions: [
      "1. Print main board chassis with 15% gyroid infill for structural strength.",
      "2. Laser-cut player tokens from 3mm hardwood or 3D print in dual-colors.",
      "3. Deburr and sand all interlocking edges to ensure smooth tactile sliding.",
      "4. Apply natural beeswax or non-toxic oil finish to highlight grain."
    ],
    stlPartFilesSuggested: [
      { partName: "Base_Plate_Chassis.stl", dimensionsMm: "260 x 180 x 18 mm", infillPercentage: 15, description: "Main structural tray with carved tile sockets" },
      { partName: "Artisan_Token_Set_x12.stl", dimensionsMm: "22 x 22 x 30 mm", infillPercentage: 25, description: "Ergonomic ancient player markers" },
      { partName: "Historical_Dice_Cast.stl", dimensionsMm: "18 x 18 x 18 mm", infillPercentage: 40, description: "Weighted randomizer tokens" }
    ]
  };

  const components = game?.components || [];

  return (
    <div className="heritage-card rounded-2xl p-6 sm:p-8 border-2 border-heritage-300 space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-heritage-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Box className="w-6 h-6 text-terracotta-600" />
            <h3 className="font-heritage text-xl sm:text-2xl font-bold text-lapis-900">
              3D & Physical Blueprint Studio
            </h3>
          </div>
          <p className="text-xs text-lapis-600 font-medium">
            CAD/STL specifications, fabrication tolerances, components list, and manufacturing costs
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-heritage-100 rounded-xl border border-heritage-300">
          <button
            onClick={() => setActiveTab('fabrication')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'fabrication'
                ? 'bg-terracotta-500 text-white shadow-sm'
                : 'text-lapis-700 hover:bg-heritage-200'
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>3D STL Manifest</span>
          </button>

          <button
            onClick={() => setActiveTab('components')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'components'
                ? 'bg-terracotta-500 text-white shadow-sm'
                : 'text-lapis-700 hover:bg-heritage-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Components ({components.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('costs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'costs'
                ? 'bg-terracotta-500 text-white shadow-sm'
                : 'text-lapis-700 hover:bg-heritage-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Cost Calculator</span>
          </button>
        </div>
      </div>

      {/* Tab 1: 3D Fabrication Blueprint */}
      {activeTab === 'fabrication' && (
        <div className="space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-heritage-100 border border-heritage-200">
              <span className="text-[10px] font-bold text-lapis-600 block uppercase">Primary Method</span>
              <span className="text-xs sm:text-sm font-bold text-terracotta-700 truncate block">
                {blueprint.primaryFabricationMethod}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-heritage-100 border border-heritage-200">
              <span className="text-[10px] font-bold text-lapis-600 block uppercase">Estimated Print Time</span>
              <span className="text-xs sm:text-sm font-bold text-lapis-900 block">
                ~{blueprint.estimatedPrintTimeHours} Hours
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-heritage-100 border border-heritage-200">
              <span className="text-[10px] font-bold text-lapis-600 block uppercase">Filament Weight</span>
              <span className="text-xs sm:text-sm font-bold text-lapis-900 block">
                ~{blueprint.totalEstimatedWeightGrams} Grams
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-heritage-100 border border-heritage-200">
              <span className="text-[10px] font-bold text-lapis-600 block uppercase">Tolerances</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-700 block">
                ±{blueprint.tolerancesMm || 0.2} mm
              </span>
            </div>
          </div>

          {/* Suggested STL Files Manifest */}
          <div className="space-y-3">
            <h4 className="font-heritage text-xs font-bold uppercase tracking-wider text-lapis-800 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-terracotta-600" />
              <span>Recommended STL 3D Part Files</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {blueprint.stlPartFilesSuggested?.map((part, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-heritage-300 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Box className="w-4 h-4 text-terracotta-500" />
                      <span className="font-mono text-xs font-bold text-lapis-900 truncate">
                        {part.partName}
                      </span>
                    </div>
                    <div className="text-[11px] text-terracotta-700 font-semibold mb-2">
                      Dimensions: {part.dimensionsMm} • Infill: {part.infillPercentage}%
                    </div>
                    <p className="text-xs text-lapis-600 leading-relaxed font-medium">
                      {part.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-heritage-100 flex items-center justify-between text-[10px] text-lapis-500 font-bold">
                    <span>3D CAD Ready</span>
                    <span className="text-terracotta-600">FDM / SLA Compatible</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assembly Instructions */}
          <div className="space-y-3">
            <h4 className="font-heritage text-xs font-bold uppercase tracking-wider text-lapis-800 flex items-center gap-1.5">
              <Hammer className="w-4 h-4 text-amber-600" />
              <span>Step-by-Step Maker & Assembly Guide</span>
            </h4>
            <div className="space-y-2">
              {blueprint.assemblyInstructions?.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-heritage-100/70 border border-heritage-200 text-xs sm:text-sm text-lapis-800 font-medium leading-relaxed"
                >
                  <CheckCircle className="w-4 h-4 text-terracotta-600 flex-shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Components List */}
      {activeTab === 'components' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {components.map((comp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-heritage-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h5 className="font-heritage text-sm font-bold text-lapis-900">
                      {comp.name}
                    </h5>
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-terracotta-100 text-terracotta-800 border border-terracotta-200">
                      Qty: {comp.quantity}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-terracotta-600 mb-2">
                    Material: {comp.material} {comp.dimensions ? `• ${comp.dimensions}` : ''}
                  </div>
                  <p className="text-xs text-lapis-700 leading-relaxed font-medium">
                    {comp.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-heritage-100 flex items-center justify-between text-xs text-lapis-600 font-medium">
                  <span>Method: {comp.fabricationMethod || '3D Print / Cut'}</span>
                  <span className="font-bold text-lapis-900">
                    Est. Unit: ${comp.estimatedUnitCostUsd || '2.50'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Manufacturing Cost Estimator */}
      {activeTab === 'costs' && (
        <CostEstimator blueprint={blueprint} components={components} />
      )}
    </div>
  );
}
