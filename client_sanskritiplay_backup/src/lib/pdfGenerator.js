import { jsPDF } from 'jspdf';

export function generateGameRulebookPDF(game) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 18;
  const contentWidth = pageWidth - (margin * 2);
  let yPos = 22;

  // Background Header Banner
  doc.setFillColor(38, 70, 83); // Lapis Blue
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setFillColor(200, 90, 50); // Terracotta Accent Bar
  doc.rect(0, 28, pageWidth, 3, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text("SANSKRITIPLAY • CULTURAL HERITAGE GAME BLUEPRINT", margin, 18);

  yPos = 42;

  // Game Title & Tagline
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text(game.title || 'Untitled Ancient Game', margin, yPos);
  yPos += 8;

  doc.setTextColor(193, 73, 36);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(11);
  const splitTagline = doc.splitTextToSize(game.tagline || '', contentWidth);
  doc.text(splitTagline, margin, yPos);
  yPos += (splitTagline.length * 5) + 6;

  // Metadata Pill Box
  doc.setFillColor(244, 241, 222);
  doc.setDrawColor(225, 211, 169);
  doc.roundedRect(margin, yPos, contentWidth, 14, 2, 2, 'FD');

  doc.setTextColor(38, 70, 83);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(`CIVILIZATION: ${game.civilization?.toUpperCase()}`, margin + 5, yPos + 6);
  doc.text(`CATEGORY: ${game.gameType?.toUpperCase()}`, margin + 65, yPos + 6);
  doc.text(`TARGET AGE: ${game.targetAge}`, margin + 120, yPos + 6);
  doc.text(`COMPLEXITY: ${game.complexity || 'Intermediate'}`, margin + 5, yPos + 11);
  doc.text(`AUTHENTICITY SCORE: ${game.culturalSensitivityScore || 98}%`, margin + 65, yPos + 11);

  yPos += 22;

  // Section: Historical Lore & Archaeological Evidence
  doc.setTextColor(38, 70, 83);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text("1. HISTORICAL CONTEXT & ARCHAEOLOGICAL EVIDENCE", margin, yPos);
  yPos += 6;

  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  const splitHistory = doc.splitTextToSize(game.historicalContext || '', contentWidth);
  doc.text(splitHistory, margin, yPos);
  yPos += (splitHistory.length * 4.5) + 5;

  if (game.archaeologicalCitations && game.archaeologicalCitations.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.text("Archaeological Citations & Museum Records:", margin, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'italic');
    for (const citation of game.archaeologicalCitations) {
      doc.text(`• ${citation}`, margin + 4, yPos);
      yPos += 4.5;
    }
    yPos += 3;
  }

  // Section: Components & Fabrication Specs
  if (yPos > 240) { doc.addPage(); yPos = 20; }
  doc.setTextColor(38, 70, 83);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text("2. COMPONENTS & FABRICATION SPECIFICATIONS", margin, yPos);
  yPos += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  if (game.components && Array.isArray(game.components)) {
    game.components.forEach((comp, idx) => {
      if (yPos > 260) { doc.addPage(); yPos = 20; }
      doc.setFillColor(247, 243, 232);
      doc.rect(margin, yPos, contentWidth, 12, 'F');
      doc.setTextColor(30, 41, 59);
      doc.setFont('helvetica', 'bold');
      doc.text(`${idx + 1}. ${comp.name} (Qty: ${comp.quantity})`, margin + 3, yPos + 4.5);
      doc.setFont('helvetica', 'normal');
      doc.text(`Material: ${comp.material} | Dim: ${comp.dimensions || 'Standard'} | Method: ${comp.fabricationMethod || '3D Print / Cut'}`, margin + 3, yPos + 9);
      yPos += 14;
    });
  }

  // Section: Rules of Play
  if (yPos > 230) { doc.addPage(); yPos = 20; }
  doc.setTextColor(38, 70, 83);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text("3. OFFICIAL RULES OF PLAY", margin, yPos);
  yPos += 6;

  if (game.ruleset) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text("Game Objective:", margin, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const splitObj = doc.splitTextToSize(game.ruleset.objective || '', contentWidth);
    doc.text(splitObj, margin, yPos);
    yPos += (splitObj.length * 4.5) + 5;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text("Setup:", margin, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const splitSetup = doc.splitTextToSize(game.ruleset.setup || '', contentWidth);
    doc.text(splitSetup, margin, yPos);
    yPos += (splitSetup.length * 4.5) + 5;

    if (game.ruleset.turnStructure && Array.isArray(game.ruleset.turnStructure)) {
      if (yPos > 240) { doc.addPage(); yPos = 20; }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text("Turn Structure:", margin, yPos);
      yPos += 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      game.ruleset.turnStructure.forEach((step, idx) => {
        const splitStep = doc.splitTextToSize(`${idx + 1}. ${step}`, contentWidth - 4);
        doc.text(splitStep, margin + 2, yPos);
        yPos += (splitStep.length * 4.5) + 2;
      });
      yPos += 4;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text("Winning Conditions:", margin, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const splitWin = doc.splitTextToSize(game.ruleset.winningConditions || '', contentWidth);
    doc.text(splitWin, margin, yPos);
    yPos += (splitWin.length * 4.5) + 5;
  }

  // 3D Fabrication Blueprint page
  if (game.fabricationBlueprint) {
    doc.addPage();
    yPos = 20;
    doc.setTextColor(38, 70, 83);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text("4. 3D PRINTING & FABRICATION GUIDE", margin, yPos);
    yPos += 8;

    doc.setFillColor(244, 241, 222);
    doc.roundedRect(margin, yPos, contentWidth, 24, 2, 2, 'FD');
    doc.setFontSize(9);
    doc.text(`Primary Method: ${game.fabricationBlueprint.primaryFabricationMethod}`, margin + 5, yPos + 6);
    doc.text(`Recommended Filament/Stock: ${game.fabricationBlueprint.recommendedFilamentOrStock}`, margin + 5, yPos + 11);
    doc.text(`Est. Print Time: ${game.fabricationBlueprint.estimatedPrintTimeHours} hours`, margin + 5, yPos + 16);
    doc.text(`Est. Unit Material Cost: $${game.fabricationBlueprint.estimatedManufacturingCostUsd || '6.50'}`, margin + 90, yPos + 16);
    doc.text(`Est. Weight: ${game.fabricationBlueprint.totalEstimatedWeightGrams || 200} grams`, margin + 90, yPos + 11);
    yPos += 30;

    doc.setFont('helvetica', 'bold');
    doc.text("Suggested STL 3D Part Files:", margin, yPos);
    yPos += 6;
    if (game.fabricationBlueprint.stlPartFilesSuggested) {
      game.fabricationBlueprint.stlPartFilesSuggested.forEach(part => {
        doc.setFont('helvetica', 'bold');
        doc.text(`⚙️ ${part.partName} (${part.dimensionsMm})`, margin + 4, yPos);
        yPos += 4.5;
        doc.setFont('helvetica', 'normal');
        doc.text(`   Infill: ${part.infillPercentage}% | ${part.description}`, margin + 4, yPos);
        yPos += 6;
      });
    }
  }

  // Footer on all pages
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(8);
    doc.text(`SanskritiPlay Cultural Innovation Studio • Page ${i} of ${pageCount}`, margin, 290);
  }

  const filename = `${(game.title || 'SanskritiPlay_Game').replace(/[^a-zA-Z0-9]/g, '_')}_Rulebook.pdf`;
  doc.save(filename);
}
