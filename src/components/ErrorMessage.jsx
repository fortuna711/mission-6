export function ErrorMessage({ message, onRetry }) {
  return (
    <div style={{ padding: '20px', textAlign: 'center', color: '#991b1b', backgroundColor: '#fef2f2', margin: '10px' }}>
      <p>⚠️ {message}</p>
      <button onClick={onRetry} style={{ cursor: 'pointer' }}>다시 시도하기</button>
    </div>
  );
}