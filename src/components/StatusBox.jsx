import React from 'react';

export default function StatusBox({ status, message, onRetry }) {
  const statusConfig = {
    idle: { text: "준비 완료", color: "#64748b" },
    loading: { text: "불러오는 중...", color: "#3b82f6" },
    success: { text: "완료!", color: "#10b981" },
    error: { text: `불러오기 실패: ${message}`, color: "#ef4444" }
  };

  const current = statusConfig[status] || statusConfig.idle;

  return (
    <div style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ color: current.color, fontWeight: 'bold' }}>{current.text}</span>
      {status === 'error' && (
        <button onClick={onRetry} style={{ padding: '4px 8px', cursor: 'pointer' }}>재시도</button>
      )}
    </div>
  );
}