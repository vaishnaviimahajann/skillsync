import React from 'react';
import { Link } from 'react-router-dom';

const DOMAINS = [
  { emoji: '🤖', label: 'AI/ML' },
  { emoji: '🌐', label: 'Web Dev' },
  { emoji: '🎨', label: 'UI/UX' },
  { emoji: '☁️', label: 'Cloud' },
  { emoji: '🔒', label: 'Cybersecurity' },
  { emoji: '📱', label: 'App Dev' },
  { emoji: '📊', label: 'Data Science' },
  { emoji: '⛓️', label: 'Blockchain' },
];

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <span className="hero-badge">for students who build things</span>
        <h1 className="hero-title">
          Find teammates by skill,<br />not luck.
        </h1>
        <p className="hero-sub">
          SkillSync helps students find the right people for hackathons, projects, and coursework.
        </p>
        <Link to="/signup" className="btn-primary">Find your team →</Link>
      </section>

      <section className="domains-section">
        <div className="domains-row">
          {DOMAINS.map((d) => (
            <span key={d.label} className="domain-pill">{d.emoji} {d.label}</span>
          ))}
        </div>
      </section>

      <section className="how-it-works">
        <h2>How it works</h2>
        <div className="steps">
          <div className="step">
            <span className="step-num">1</span>
            <div>
              <h3>Build your profile</h3>
              <p>List your skills, college, and links to your work.</p>
            </div>
          </div>
          <div className="step">
            <span className="step-num">2</span>
            <div>
              <h3>Discover teammates</h3>
              <p>Search and filter by skill or college.</p>
            </div>
          </div>
          <div className="step">
            <span className="step-num">3</span>
            <div>
              <h3>Connect and chat</h3>
              <p>Talk it out in real time before you commit.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <h2>Stop losing good ideas to a team that never formed.</h2>
        <Link to="/signup" className="btn-primary">Get started — it's free</Link>
      </section>
    </div>
  );
}