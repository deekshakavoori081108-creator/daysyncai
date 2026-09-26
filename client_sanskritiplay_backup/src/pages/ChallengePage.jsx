import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, BookOpen, Layers, Sparkles, CheckCircle2, Trophy, Users, HelpCircle, ArrowRight } from 'lucide-react';

export default function ChallengePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Challenge Hero */}
      <div className="heritage-card-gold rounded-3xl p-8 sm:p-12 border-2 border-amber-300 shadow-xl relative overflow-hidden text-left">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-terracotta-600 text-white text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>National Student Innovation Challenge 2026</span>
          </div>

          <h1 className="font-heritage text-3xl sm:text-5xl font-extrabold text-lapis-900 leading-tight">
            Conceptualize & Develop Unique Toys & Games Based on Civilization, History & Culture
          </h1>

          <p className="text-sm sm:text-base text-lapis-700 font-medium leading-relaxed">
            A nationwide challenge inviting middle school, high school, and university students to unearth ancient civilizations, folklore, and archaeology to engineer playable board games, strategy sets, and 3D printable mechanical toys.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              to="/studio"
              className="px-6 py-3.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-sm flex items-center gap-2 shadow-lg transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Challenge Concept in Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/gallery"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-heritage-100 text-lapis-800 font-bold text-sm border border-heritage-300 shadow-sm transition-all"
            >
              <span>Explore Benchmark Submissions</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Core Judging Criteria Rubric */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600 bg-terracotta-100 px-3 py-1 rounded-full border border-terracotta-200">
            Evaluation Framework
          </span>
          <h2 className="font-heritage text-3xl font-bold text-lapis-900 mt-2">
            Judging Criteria & Rubric
          </h2>
          <p className="text-xs sm:text-sm text-lapis-600 mt-1">
            Submissions are evaluated by academic historians, game designers, and fab-lab educators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              weight: '30%',
              title: 'Historical & Archaeological Fidelity',
              desc: 'Accuracy of cultural context, authentic artifact citations, and respectful representation of ancient customs without modern stereotyping.',
              icon: LandmarkIcon,
              color: 'border-amber-300 bg-amber-50 text-amber-900'
            },
            {
              weight: '25%',
              title: 'Pedagogical Learning Outcomes',
              desc: 'Clarity of educational objectives across world history, STEM (probability, engineering), and cultural anthropology.',
              icon: BookOpen,
              color: 'border-emerald-300 bg-emerald-50 text-emerald-900'
            },
            {
              weight: '25%',
              title: 'Game Theory & Playability',
              desc: 'Balanced victory conditions, engaging turn progression, dynamic risk-reward choices, and fun playtest feedback.',
              icon: Layers,
              color: 'border-terracotta-300 bg-terracotta-50 text-terracotta-900'
            },
            {
              weight: '20%',
              title: 'Fabrication & 3D Feasibility',
              desc: 'Completeness of 3D STL specifications, tolerances, assembly instructions, and affordable manufacturing cost budgeting.',
              icon: Trophy,
              color: 'border-lapis-300 bg-lapis-50 text-lapis-900'
            }
          ].map((crit, idx) => {
            const Icon = crit.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border-2 shadow-sm flex flex-col justify-between ${crit.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heritage text-2xl font-black">{crit.weight}</span>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heritage text-base font-bold mb-2">
                    {crit.title}
                  </h3>
                  <p className="text-xs leading-relaxed opacity-90 font-medium">
                    {crit.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Classroom & Educator Integration */}
      <div className="heritage-card rounded-2xl p-8 border border-heritage-200 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="lg:col-span-2 space-y-4 text-left">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-terracotta-600" />
            <h3 className="font-heritage text-2xl font-bold text-lapis-900">
              For Educators & Fab-Lab Mentors
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-lapis-700 leading-relaxed font-medium">
            SanskritiPlay provides free downloadable classroom rubrics, 3D printing slicing guidelines, and lesson plan modules aligning with World History and Design & Technology curriculums.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-lapis-800 font-semibold pt-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Standardized 3D Print Tolerances</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Publication-Grade PDF Rulebooks</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Material Science Cost Sliders</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Direct Forking & Remixing Hub</span>
            </div>
          </div>
        </div>

        <div className="bg-sand-100/90 p-6 rounded-xl border border-heritage-300 text-center space-y-3">
          <span className="text-3xl">📜</span>
          <h4 className="font-heritage text-base font-bold text-lapis-900">
            Submit Your Game Concept
          </h4>
          <p className="text-xs text-lapis-600">
            All game concepts saved and published in the SanskritiPlay Studio are automatically entered into the challenge.
          </p>
          <Link
            to="/studio"
            className="w-full py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch Studio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function LandmarkIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="22" x2="21" y2="22"></line>
      <line x1="6" y1="18" x2="6" y2="11"></line>
      <line x1="10" y1="18" x2="10" y2="11"></line>
      <line x1="14" y1="18" x2="14" y2="11"></line>
      <line x1="18" y1="18" x2="18" y2="11"></line>
      <polygon points="12 2 20 7 4 7"></polygon>
    </svg>
  );
}
