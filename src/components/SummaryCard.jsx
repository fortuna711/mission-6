export default function SummaryCard({ member }) {
  return (
    <article className="profile-card" data-is-mine={member.isMine}>
      <div className="image-box">
        <img src={member.image} alt={member.name} />
        <span className="badge">{member.badge}</span>
      </div>
      <div className="summary-content">
        <h2 className="summary-name">{member.name}</h2>
        <p className="summary-part">{member.part}</p>
        <p className="summary-intro">{member.intro}</p>
      </div>
    </article>
  );
}