import React, { useState } from 'react';
import { X, FileText, Download, Printer, Box, Check, Sparkles } from 'lucide-react';
import { generateGameRulebookPDF } from '../lib/pdfGenerator';

export default function PrintableExportModal({ isOpen, onClose, game }) {
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadedJson, setDownloadedJson] = useState(false);

  if (!isOpen || !game) return null;

  const handleDownloadPdf = () => {
    setDownloadingPdf(true);
    try {
      generateGameRulebookPDF(game);
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(game, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${(game.title || 'SanskritiPlay').replace(/[^a-zA-Z0-9]/g, '_')}_package.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setDownloadedJson(true);
    setTimeout(() => setDownloadedJson(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-lapis-900/60 backdrop-blur-sm animate-fade-in">
      <div className="heritage-card rounded-2xl max-w-xl w-full p-6 sm:p-8 border-2 border-heritage-300 shadow-2xl relative space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-heritage-200 text-lapis-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🏺</span>
            <h3 className="font-heritage text-2xl font-bold text-lapis-900">
              Fabrication & Export Center
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-lapis-600 font-medium">
            Export printable papercraft rulebooks, 3D printing STL manifests, and raw schema packages for <strong>"{game.title}"</strong>.
          </p>
        </div>

        {/* Export Options Grid */}
        <div className="space-y-3">
          {/* Option 1: PDF Rulebook */}
          <div className="p-4 rounded-xl bg-white border border-heritage-200 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-terracotta-100 text-terracotta-700">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heritage text-sm font-bold text-lapis-900">
                  Publication-Grade Rulebook PDF
                </h4>
                <p className="text-xs text-lapis-600">
                  Includes full gameplay rules, archaeological citations, and 3D fabrication guide.
                </p>
              </div>
            </div>
            <button
              onClick={handleDownloadPdf}
              disabled={downloadingPdf}
              className="px-4 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all flex-shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>{downloadingPdf ? 'Generating...' : 'Download PDF'}</span>
            </button>
          </div>

          {/* Option 2: JSON Package */}
          <div className="p-4 rounded-xl bg-white border border-heritage-200 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-lapis-100 text-lapis-700">
                <Box className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heritage text-sm font-bold text-lapis-900">
                  Complete Project Package (JSON)
                </h4>
                <p className="text-xs text-lapis-600">
                  Full dataset containing 3D parameters, ruleset, and layout coordinates.
                </p>
              </div>
            </div>
            <button
              onClick={handleDownloadJson}
              className="px-4 py-2.5 rounded-xl bg-lapis-700 hover:bg-lapis-800 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all flex-shrink-0"
            >
              {downloadedJson ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
              <span>{downloadedJson ? 'Downloaded!' : 'Export JSON'}</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 border-t border-heritage-200 flex items-center justify-between text-xs text-lapis-500">
          <span>Open Educational Creative Commons Attribution</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-heritage-100 hover:bg-heritage-200 text-lapis-700 font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
