import React, { memo } from 'react';

const MemberCard = memo(({ member }) => (
  <article className={`member-card ${member.name === '서예슬' ? 'highlight' : ''}`}>
    <div style={{ position: 'relative' }}>
      {member.image && <img src={member.image} alt={member.name} style={{ width: '100%', display: 'block' }} />}
      <span className="tech-label">{member.skills || 'Tech'}</span>
    </div>
    <div style={{ padding: '20px' }}>
      <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>{member.name}</h3>
      <p style={{ color: '#3b82f6', fontWeight: 'bold' }}>{member.part}</p>
      <p style={{ fontSize: '0.95rem', color: '#64748b', margin: 0 }}>{member.intro}</p>
    </div>
  </article>
));

export default function SummaryGrid({ members }) {
  return (
    <section className="summary-section">
      <style>{`
        .summary-section { padding: 20px; }
        .grid-container { display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
        .member-card { border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff; transition: 0.3s; animation: fadeIn 0.5s ease-in-out; }
        .member-card.highlight { border: 2px solid #3b82f6; }
        .member-card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px rgba(0,0,0,0.1); }
        .tech-label { position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.6); color: #fff; padding: 4px 10px; border-radius: 4px; font-size: 0.8rem; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 1024px) { .grid-container { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .grid-container { grid-template-columns: 1fr; } }
      `}</style>
      <div className="grid-container">{members.map((m) => <MemberCard key={m.id} member={m} />)}</div>
    </section>
  );
}