import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Sparkles, Shield, Trophy, Activity, ArrowRight, Dices } from 'lucide-react';
import DiceRoller from './DiceRoller';
import { simulatePlaytestStep } from '../lib/api';

export default function PlaytestCanvas({ game }) {
  const layout = game?.layoutConfig || {};
  const [boardTiles, setBoardTiles] = useState([]);
  const [pieces, setPieces] = useState([]);
  const [selectedPieceId, setSelectedPieceId] = useState(null);
  const [activePlayer, setActivePlayer] = useState(1);
  const [turnCount, setTurnCount] = useState(1);
  const [lastDiceRoll, setLastDiceRoll] = useState(null);
  const [gameLogs, setGameLogs] = useState([
    `Game initialized: "${game?.title || 'Ancient Game'}". Ready for Turn 1.`
  ]);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAiConsulting, setIsAiConsulting] = useState(false);

  // Initialize board tiles and pieces from layoutConfig or generate a 4x4 default grid
  useEffect(() => {
    if (layout.tiles && layout.tiles.length > 0) {
      setBoardTiles(layout.tiles);
    } else {
      // Default 4x4 grid
      const defaultTiles = [];
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          let type = 'track';
          let color = '#F4F1DE';
          if (r === 0 && c === 0) { type = 'start'; color = '#C1A456'; }
          else if (r === 3 && c === 3) { type = 'goal'; color = '#2A9D8F'; }
          else if ((r + c) % 3 === 0) { type = 'rosette'; color = '#E29374'; }
          defaultTiles.push({
            id: `t_${r}_${c}`,
            label: `Zone ${r + 1}-${c + 1}`,
            x: r,
            y: c,
            type,
            color
          });
        }
      }
      setBoardTiles(defaultTiles);
    }

    if (layout.pieces && layout.pieces.length > 0) {
      setPieces(layout.pieces.map(p => ({ ...p, currentX: p.startX, currentY: p.startY })));
    } else {
      setPieces([
        { id: 'p1_1', name: 'Player 1 Unit', player: 1, startX: 0, startY: 0, currentX: 0, currentY: 0, color: '#C85A32', icon: '👑' },
        { id: 'p2_1', name: 'Player 2 Unit', player: 2, startX: 3, startY: 0, currentX: 3, currentY: 0, color: '#264653', icon: '🦅' }
      ]);
    }
  }, [game]);

  const handleTileClick = (tile) => {
    if (!selectedPieceId) {
      // Check if there is a piece on this tile belonging to active player
      const pieceOnTile = pieces.find(p => p.currentX === tile.x && p.currentY === tile.y && p.player === activePlayer);
      if (pieceOnTile) {
        setSelectedPieceId(pieceOnTile.id);
        addLog(`Selected ${pieceOnTile.name}. Click an adjacent tile to move.`);
      }
      return;
    }

    // Move selected piece to this tile
    const movedPiece = pieces.find(p => p.id === selectedPieceId);
    if (!movedPiece) return;

    setPieces(prev => prev.map(p => p.id === selectedPieceId ? { ...p, currentX: tile.x, currentY: tile.y } : p));
    addLog(`Player ${activePlayer} moved ${movedPiece.name} to ${tile.label || `(${tile.x}, ${tile.y})`}${tile.type === 'rosette' ? ' [Rosette Sanctuary Sanctuary!]' : ''}.`);
    setSelectedPieceId(null);

    // Switch turn
    setActivePlayer(prev => prev === 1 ? 2 : 1);
    setTurnCount(prev => prev + 1);
  };

  const handleDiceRollComplete = (rollValue) => {
    setLastDiceRoll(rollValue);
    addLog(`Player ${activePlayer} rolled ${rollValue}.`);
  };

  const addLog = (msg) => {
    setGameLogs(prev => [msg, ...prev.slice(0, 15)]);
  };

  const resetBoard = () => {
    if (layout.pieces) {
      setPieces(layout.pieces.map(p => ({ ...p, currentX: p.startX, currentY: p.startY })));
    }
    setSelectedPieceId(null);
    setActivePlayer(1);
    setTurnCount(1);
    setLastDiceRoll(null);
    setAiAnalysis(null);
    setGameLogs([`Playtester reset. Turn 1 starting.`]);
  };

  const consultAiPlaytest = async () => {
    setIsAiConsulting(true);
    try {
      const response = await simulatePlaytestStep({
        gameId: game.id,
        gameState: {
          turnNumber: turnCount,
          activePlayer,
          boardState: layout.boardType,
          piecePositions: pieces.reduce((acc, p) => ({ ...acc, [p.id]: [p.currentX, p.currentY] }), {}),
          diceRoll: lastDiceRoll
        },
        actionRequested: 'ai_opponent_turn'
      });

      if (response.success && response.data) {
        setAiAnalysis(response.data);
        if (response.data.turnLog) {
          addLog(`🤖 AI Arbiter: ${response.data.turnLog}`);
        }
      }
    } catch (err) {
      addLog(`AI Arbiter: ${err.message}`);
    } finally {
      setIsAiConsulting(false);
    }
  };

  // Compute grid bounds
  const maxRows = Math.max(...boardTiles.map(t => t.x), 3) + 1;
  const maxCols = Math.max(...boardTiles.map(t => t.y), 3) + 1;

  return (
    <div className="heritage-card rounded-2xl p-6 border-2 border-heritage-300 space-y-6">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-heritage-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-terracotta-600" />
            <h3 className="font-heritage text-xl font-bold text-lapis-900">
              Interactive 2D Playtest Simulator
            </h3>
          </div>
          <p className="text-xs text-lapis-600">
            Click your pieces to move, roll ancient casting randomizers, and consult the AI tactical arbiter.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-heritage-100 border border-heritage-300 text-xs font-bold text-lapis-800">
            <span>Turn {turnCount}</span>
            <span>•</span>
            <span className={activePlayer === 1 ? 'text-terracotta-600' : 'text-lapis-600'}>
              Player {activePlayer}'s Move
            </span>
          </div>

          <button
            onClick={resetBoard}
            className="p-2 rounded-lg bg-heritage-100 hover:bg-heritage-200 text-lapis-700 border border-heritage-300 transition-colors"
            title="Reset Board"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Board Canvas Area */}
        <div className="lg:col-span-8 bg-sand-100/90 rounded-2xl p-6 border-2 border-dashed border-heritage-300 flex flex-col items-center justify-center min-h-[380px] relative">
          <div
            className="grid gap-2 p-4 bg-heritage-50 rounded-xl shadow-inner border border-heritage-300 max-w-full overflow-auto"
            style={{
              gridTemplateColumns: `repeat(${maxCols}, minmax(50px, 1fr))`,
              gridTemplateRows: `repeat(${maxRows}, minmax(50px, 1fr))`
            }}
          >
            {boardTiles.map((tile) => {
              const pieceHere = pieces.find(p => p.currentX === tile.x && p.currentY === tile.y);
              const isSelected = pieceHere && pieceHere.id === selectedPieceId;

              return (
                <button
                  key={tile.id}
                  onClick={() => handleTileClick(tile)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex flex-col items-center justify-center p-1 relative border-2 transition-all transform hover:scale-105 ${
                    isSelected
                      ? 'ring-4 ring-terracotta-500 scale-105'
                      : 'hover:border-terracotta-400'
                  }`}
                  style={{
                    backgroundColor: tile.color || '#FDFBF7',
                    borderColor: tile.type === 'rosette' ? '#C1A456' : tile.type === 'goal' ? '#2A9D8F' : tile.type === 'hazard' ? '#BA4924' : '#E1D3A9'
                  }}
                >
                  {/* Tile Type Badge */}
                  <span className="text-[9px] font-bold text-lapis-700 truncate max-w-full px-1">
                    {tile.type === 'rosette' ? '⭐ Sanctuary' : tile.type === 'goal' ? '🏆 Goal' : tile.type === 'hazard' ? '⚠️ Hazard' : tile.label || `(${tile.x},${tile.y})`}
                  </span>

                  {/* Piece Representation */}
                  {pieceHere && (
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md font-bold mt-1 animate-float ${
                        pieceHere.player === 1 ? 'bg-terracotta-500 text-white' : 'bg-lapis-600 text-white'
                      }`}
                    >
                      {pieceHere.icon || (pieceHere.player === 1 ? '1' : '2')}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-4 text-xs text-lapis-600 font-semibold">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-400"></span> Rosette Sanctuary</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500"></span> Goal Terminal</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-terracotta-500"></span> Player 1 Unit</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-lapis-600"></span> Player 2 Unit</span>
          </div>
        </div>

        {/* Playtest Sidebar: Dice & AI Arbiter */}
        <div className="lg:col-span-4 space-y-4">
          {/* Authentic Dice Casting */}
          <DiceRoller
            diceType={layout.diceType || 'd6'}
            diceCount={layout.diceCount || 1}
            onRollComplete={handleDiceRollComplete}
          />

          {/* AI Turn Arbiter & Historical Tactic Consultant */}
          <div className="bg-heritage-100/90 rounded-xl p-4 border border-heritage-300">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-terracotta-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-lapis-900">
                  AI Tactical Arbiter
                </span>
              </div>
            </div>

            <p className="text-xs text-lapis-600 mb-3">
              Ask the AI cultural historian to assess your turn move or simulate an opponent response based on historical game theory.
            </p>

            <button
              onClick={consultAiPlaytest}
              disabled={isAiConsulting}
              className="w-full py-2.5 rounded-lg bg-lapis-700 hover:bg-lapis-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow transition-all disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isAiConsulting ? 'animate-spin' : ''}`} />
              <span>{isAiConsulting ? 'Analyzing Ancient Tactics...' : 'Consult Tactical Arbiter'}</span>
            </button>

            {aiAnalysis && (
              <div className="mt-3 p-3 bg-white rounded-lg border border-heritage-300 text-xs space-y-2">
                <div>
                  <span className="font-bold text-terracotta-700 block">Historical Tactic Rationale:</span>
                  <p className="text-lapis-700 text-[11px] leading-relaxed">{aiAnalysis.historicalTacticExplanation}</p>
                </div>
                <div>
                  <span className="font-bold text-lapis-800 block">Recommended Next Step:</span>
                  <p className="text-lapis-600 text-[11px] leading-relaxed">{aiAnalysis.recommendedNextMove}</p>
                </div>
              </div>
            )}
          </div>

          {/* Live Game Action Logs */}
          <div className="bg-white rounded-xl p-4 border border-heritage-300">
            <span className="text-xs font-bold uppercase tracking-wider text-lapis-600 block mb-2">
              Turn Action Log
            </span>
            <div className="h-32 overflow-y-auto space-y-1.5 text-xs text-lapis-700 font-mono pr-1">
              {gameLogs.map((log, index) => (
                <div key={index} className="text-[11px] leading-tight border-b border-heritage-100 pb-1">
                  • {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
