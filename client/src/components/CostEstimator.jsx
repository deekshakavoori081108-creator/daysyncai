import React, { useState } from 'react';
import { DollarSign, Sliders, Package, Layers, Printer, Sparkles } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

export default function CostEstimator({ blueprint, components = [] }) {
  const [batchSize, setBatchSize] = useState(1);
  const [filamentPricePerKg, setFilamentPricePerKg] = useState(22); // $22/kg PLA
  const [laserWoodCostPerSheet, setLaserWoodCostPerSheet] = useState(6.50); // $6.50 birch sheet
  const [packagingType, setPackagingType] = useState('paper_tuck_box'); // 'none', 'paper_tuck_box', 'wooden_chest'

  const packagingCosts = {
    none: 0,
    paper_tuck_box: 1.50,
    wooden_chest: 5.00
  };

  const weightGrams = blueprint?.totalEstimatedWeightGrams || 200;
  const printHours = blueprint?.estimatedPrintTimeHours || 5;

  // Material calculation
  const rawFilamentCost = (weightGrams / 1000) * filamentPricePerKg;
  const energyCost = (printHours * 0.15 * 0.14); // 150W * $0.14/kWh
  const hardwareAndDowels = 1.20; // magnets/dowels/glue
  const packagingCost = packagingCosts[packagingType];

  const baseUnitCost = rawFilamentCost + energyCost + hardwareAndDowels + packagingCost;

  // Batch Volume Discount (economies of scale for classroom kits)
  const discountMultiplier = batchSize >= 30 ? 0.75 : batchSize >= 10 ? 0.85 : 1.0;
  const discountedUnitCost = baseUnitCost * discountMultiplier;
  const totalBatchCost = discountedUnitCost * batchSize;

  return (
    <div className="heritage-card rounded-xl p-6 border border-heritage-200">
      <div className="flex items-center justify-between gap-2 mb-6 border-b border-heritage-200 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-terracotta-100 text-terracotta-700">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heritage text-lg font-bold text-lapis-900">
              Manufacturing & Fab-Lab Cost Estimator
            </h3>
            <p className="text-xs text-lapis-600">
              Calculates material, power, hardware, and batch volume costs for classroom prototyping
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs uppercase font-bold tracking-wider text-lapis-500 block">Unit Cost</span>
          <span className="font-heritage text-2xl font-extrabold text-terracotta-600">
            {formatCurrency(discountedUnitCost)}
          </span>
        </div>
      </div>

      {/* Cost Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-heritage-100/70 p-3 rounded-lg border border-heritage-200">
          <span className="text-[11px] font-bold text-lapis-600 block uppercase">Raw Material</span>
          <span className="text-base font-bold text-lapis-900">{formatCurrency(rawFilamentCost)}</span>
          <span className="text-[10px] text-lapis-500 block">{weightGrams}g PLA @ ${filamentPricePerKg}/kg</span>
        </div>

        <div className="bg-heritage-100/70 p-3 rounded-lg border border-heritage-200">
          <span className="text-[11px] font-bold text-lapis-600 block uppercase">Machine Power</span>
          <span className="text-base font-bold text-lapis-900">{formatCurrency(energyCost)}</span>
          <span className="text-[10px] text-lapis-500 block">{printHours} hrs print time</span>
        </div>

        <div className="bg-heritage-100/70 p-3 rounded-lg border border-heritage-200">
          <span className="text-[11px] font-bold text-lapis-600 block uppercase">Hardware / Finish</span>
          <span className="text-base font-bold text-lapis-900">{formatCurrency(hardwareAndDowels)}</span>
          <span className="text-[10px] text-lapis-500 block">Pins, dowels & sealant</span>
        </div>

        <div className="bg-heritage-100/70 p-3 rounded-lg border border-heritage-200">
          <span className="text-[11px] font-bold text-lapis-600 block uppercase">Packaging & Box</span>
          <span className="text-base font-bold text-lapis-900">{formatCurrency(packagingCost)}</span>
          <span className="text-[10px] text-lapis-500 block">{packagingType.replace('_', ' ')}</span>
        </div>
      </div>

      {/* Interactive Sliders */}
      <div className="space-y-4 bg-white/60 p-4 rounded-xl border border-heritage-200">
        <div>
          <div className="flex justify-between text-xs font-bold text-lapis-800 mb-1.5">
            <span>Classroom Batch Size (Prototyping Run):</span>
            <span className="text-terracotta-600 font-extrabold">{batchSize} {batchSize === 1 ? 'Kit' : 'Kits'}</span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            step="1"
            value={batchSize}
            onChange={(e) => setBatchSize(Number(e.target.value))}
            className="w-full accent-terracotta-500 h-2 bg-heritage-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-lapis-500 mt-1">
            <span>Single Student (1)</span>
            <span>Study Group (10 - 15% off)</span>
            <span>Full Class (30+ - 25% off)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-lapis-700 mb-1">
              Filament / Stock Price ($/kg):
            </label>
            <input
              type="number"
              min="10"
              max="60"
              value={filamentPricePerKg}
              onChange={(e) => setFilamentPricePerKg(Number(e.target.value))}
              className="w-full text-xs font-semibold px-3 py-2 rounded-lg border border-heritage-300 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-lapis-700 mb-1">
              Packaging Format:
            </label>
            <select
              value={packagingType}
              onChange={(e) => setPackagingType(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 rounded-lg border border-heritage-300 bg-white"
            >
              <option value="none">No Packaging (Loose Components)</option>
              <option value="paper_tuck_box">Cardstock Printed Tuck Box (+$1.50)</option>
              <option value="wooden_chest">Laser-Cut Wooden Sliding Chest (+$5.00)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Batch Summary Footer */}
      <div className="mt-5 p-3.5 bg-terracotta-50 rounded-lg border border-terracotta-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-terracotta-600" />
          <span className="text-xs sm:text-sm font-bold text-terracotta-900">
            Total Production Run for {batchSize} {batchSize === 1 ? 'Kit' : 'Kits'}:
          </span>
        </div>
        <span className="font-heritage text-lg sm:text-xl font-extrabold text-terracotta-700">
          {formatCurrency(totalBatchCost)}
        </span>
      </div>
    </div>
  );
}
