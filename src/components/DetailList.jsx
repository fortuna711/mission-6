import React from 'react';

const styles = {
  container: { backgroundColor: '#ffffff', borderRadius: '16px', padding: '35px', marginBottom: '24px', border: '1px solid #e2e8f0' },
  label: { color: '#3b82f6', fontWeight: '700', marginTop: '20px', display: 'block' },
  link: { color: '#3b82f6', textDecoration: 'underline' }
};

const DetailSection = ({ title, content }) => (
  <>
    <h4 style={styles.label}>{title}</h4>
    <p>{content}</p>
  </>
);

export default function DetailList({ members }) {
  const DEFAULT_LINK = "https://www.lionexample.com";

  return (
    <section style={{ padding: '40px 20px', backgroundColor: '#f8fafc' }}>
      <h2>상세 프로필</h2>
      {members.map((m) => (
        <article key={m.id} style={styles.container}>
          <h3>{m.name}</h3>
          <p style={{ color: '#3b82f6', fontWeight: 'bold' }}>{m.part} | LION TRACK</p>
          <DetailSection title="자기소개" content={m.fullIntro} />
          <h4 style={styles.label}>연락처</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>• Email: {m.email}</li>
            <li>• Phone: {m.phone}</li>
            <li>• <a href={m.link || DEFAULT_LINK} target="_blank" rel="noreferrer" style={styles.link}>{m.link || DEFAULT_LINK}</a></li>
          </ul>
          <DetailSection title="관심 기술" content={m.skills} />
          <DetailSection title="한 마디" content={m.intro} />
        </article>
      ))}
    </section>
  );
}