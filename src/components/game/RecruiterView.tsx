"use client";

import React, { useState } from "react";
import { portfolioData, Project } from "@/data/portfolioData";
import {
  Briefcase,
  Code2,
  Download,
  ExternalLink,
  Gamepad2,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Sparkles,
  Trophy,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

interface RecruiterViewProps {
  onReturnToGame: () => void;
}

export default function RecruiterView({ onReturnToGame }: RecruiterViewProps) {
  const [activeSection, setActiveSection] = useState<
    "overview" | "projects" | "skills" | "achievements" | "contact"
  >("overview");

  return (
    <div className="fixed inset-0 z-40 bg-[#060b19] text-slate-100 overflow-y-auto">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#0a1128]/95 backdrop-blur-md border-b border-slate-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-pixel text-amber-400 text-xs font-bold">
              EWU
            </div>
            <div>
              <h1 className="font-pixel text-sm text-slate-100">
                {portfolioData.name}
              </h1>
              <p className="text-xs text-amber-400 font-mono">
                {portfolioData.role}
              </p>
            </div>
          </div>

          {/* Quick Nav Tabs */}
          <nav className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
            {[
              { id: "overview", label: "Overview" },
              { id: "projects", label: "Projects" },
              { id: "skills", label: "Tech Stack" },
              { id: "achievements", label: "Honors" },
              { id: "contact", label: "Contact" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeSection === tab.id
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onReturnToGame}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-mono font-bold text-xs rounded-xl shadow-lg transition-all"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>RETURN TO RPG CAMPUS</span>
            </button>
            <a
              href="/resume.pdf"
              download="Arafat_Anowar_Resume.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs rounded-xl border border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>CV</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-12">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#0d1736] to-[#070e24] border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Software Engineering Roles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Engineering high-performance web systems and immersive interactive experiences.
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Student at <span className="text-amber-400 font-semibold">East West University (EWU)</span> with a passion for modern full-stack web applications, game engine development, and clean distributed architectures.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                Dhaka, Bangladesh
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                East West University, CSE
              </span>
            </div>
          </div>
        </section>

        {/* Featured Projects Grid */}
        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-pixel text-sm text-amber-400 flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              FEATURED PROJECTS
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {portfolioData.projects.length} Works
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {portfolioData.projects.map((project: Project) => (
              <div
                key={project.id}
                className="bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h4 className="font-bold text-lg text-slate-100">
                      {project.title}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {project.description}
                  </p>
                  {project.metrics && (
                    <div className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-3 py-1.5 rounded-lg mb-4 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{project.metrics}</span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800/80 text-slate-300 border border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live App</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Stack */}
        <section id="skills" className="space-y-6">
          <h3 className="font-pixel text-sm text-amber-400 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            TECHNICAL PROFICIENCIES
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {portfolioData.skills.map((category, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6"
              >
                <h4 className="font-mono text-sm font-bold text-amber-300 mb-5">
                  {category.title}
                </h4>
                <div className="space-y-4">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-200">{skill.name}</span>
                        <span className="text-amber-400 font-bold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Honors & Accolades */}
        <section id="achievements" className="space-y-6">
          <h3 className="font-pixel text-sm text-purple-400 flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            HONORS & ACHIEVEMENTS
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {portfolioData.achievements.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-bold text-base text-slate-100">
                    {item.title}
                  </h4>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 text-xs font-mono border border-purple-800">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="text-xs font-mono text-purple-400 mb-2">
                  {item.organization} • {item.year}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Banner */}
        <section
          id="contact"
          className="bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-900/60 rounded-2xl p-8 flex flex-wrap items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-pixel text-sm text-emerald-400 mb-2">
              LET'S COLLABORATE
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              I am open to full-time, contract, or high-impact engineering opportunities. Feel free to connect or drop an email anytime.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono">
              <a
                href={`mailto:${portfolioData.contact.email}`}
                className="flex items-center gap-2 text-emerald-300 hover:underline"
              >
                <Mail className="w-4 h-4" />
                {portfolioData.contact.email}
              </a>
              <a
                href={portfolioData.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-white"
              >
                <LinkedinIcon className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href={portfolioData.contact.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-white"
              >
                <GithubIcon className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>

          <a
            href="/resume.pdf"
            download="Arafat_Anowar_Resume.pdf"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD CV (PDF)</span>
          </a>
        </section>
      </main>
    </div>
  );
}
