export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>파트</label>
        <select value={filters.part} onChange={(e) => setFilters({...filters, part: e.target.value})}>
          <option value="전체">전체</option><option value="Frontend">Frontend</option><option value="Backend">Backend</option>
        </select>
      </div>
      <div className="filter-group">
        <label>검색</label>
        <input value={filters.keyword} onChange={(e) => setFilters({...filters, keyword: e.target.value})} />
      </div>
    </div>
  );
}