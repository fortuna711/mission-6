export default function ControlContainer({ 
  setFilter, setSort, setSearchQuery, membersCount, status, 
  onToggleForm, onAddRandom, onReset, onDeleteLast 
}) {
  return (
    <section className="control-container">
      <div className="control-bar">
        <button className="btn" onClick={onToggleForm}>아기 사자 추가</button>
        <button className="btn" onClick={onDeleteLast}>마지막 아기 사자 삭제</button>
        <span>총 {membersCount}명</span>
      </div>
      <div className="control-bar">
        <button className="btn" onClick={() => onAddRandom(1)}>랜덤 1명 추가</button>
        <button className="btn" onClick={() => onAddRandom(5)}>랜덤 5명 추가</button>
        <button className="btn" onClick={onReset}>전체 새로고침</button>
        <span className="status-text">{status.message}</span>
        {status.retryFn && <button className="btn" onClick={status.retryFn}>재시도</button>}
      </div>

      {/* 스타일을 유지하면서 라벨을 붙이는 최선의 구조 */}
      <div className="filter-bar">
        <div className="filter-group">
          <label>파트</label>
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="전체">전체</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Design">Design</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>정렬</label>
          <select onChange={(e) => setSort(e.target.value)}>
            <option value="latest">최신추가순</option>
            <option value="name">이름순</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>검색</label>
          <input type="text" placeholder="이름으로 검색" onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>
    </section>
  );
}