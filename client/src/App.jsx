import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import StudioPage from './pages/StudioPage';
import GameDetailPage from './pages/GameDetailPage';
import GalleryPage from './pages/GalleryPage';
import DashboardPage from './pages/DashboardPage';
import ChallengePage from './pages/ChallengePage';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-heritage-50 parchment-bg selection:bg-terracotta-500 selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/game/:id" element={<GameDetailPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/challenge" element={<ChallengePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
