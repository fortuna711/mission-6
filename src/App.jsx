import { useState, useEffect } from 'react';
import { INITIAL_MEMBERS } from './data/lions';
import ControlContainer from './components/ControlContainer';
import MemberForm from './components/MemberForm';
import SummaryGrid from './components/SummaryGrid';
import DetailList from './components/DetailList';
import './styles/style.css';

function getFilteredMembers(members, filter, sort, searchQuery) {
  let result = [...members];
  if (filter !== '전체') result = result.filter(m => m.part === filter);
  if (searchQuery) result = result.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));
  result.sort((a, b) => sort === 'name' ? a.name.localeCompare(b.name) : b.id - a.id);
  return result;
}

export default function App() {
  const [members, setMembers] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filter, setFilter] = useState('전체');
  const [sort, setSort] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState({ message: '준비 완료', retryFn: null });

  useEffect(() => {
    setMembers(INITIAL_MEMBERS);
  }, []);

  const filteredMembers = getFilteredMembers(members, filter, sort, searchQuery);

  const fetchAPI = async (count) => {
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);
    if (!response.ok) throw new Error("네트워크 오류");
    const data = await response.json();
    return data.results.map(user => ({
      id: Date.now() + Math.random(),
      name: `${user.name.first} ${user.name.last}`,
      part: ['Frontend', 'Backend', 'Design'][Math.floor(Math.random() * 3)],
      image: user.picture.large,
      intro: "열심히 하겠습니다!",
      email: user.email,
      phone: user.phone,
      website: `https://example.com`,
      note: "화이팅!"
    }));
  };

  const handleAddRandom = async (count) => {
    setStatus({ message: '로딩 중...', retryFn: null });
    try {
      const newLions = await fetchAPI(count);
      setMembers(prev => [...prev, ...newLions]);
      setStatus({ message: '준비 완료', retryFn: null });
    } catch (err) {
      setStatus({ message: `불러오기 실패: ${err.message}`, retryFn: () => handleAddRandom(count) });
    }
  };

  const handleReset = async () => {
    setStatus({ message: '로딩 중...', retryFn: null });
    try {
      const data = await fetchAPI(INITIAL_MEMBERS.length);
      setMembers(data);
      setStatus({ message: '준비 완료', retryFn: null });
    } catch (err) {
      setStatus({ message: `불러오기 실패: ${err.message}`, retryFn: handleReset });
    }
  };

  return (
    <div className="page-wrapper">
      <h1 className="page-title">멋쟁이사자처럼 아기 사자 명단</h1>
      <ControlContainer 
        setFilter={setFilter} 
        setSort={setSort} 
        setSearchQuery={setSearchQuery}
        membersCount={filteredMembers.length} 
        status={status}
        onToggleForm={() => setIsFormVisible(true)}
        onAddRandom={handleAddRandom}
        onDeleteLast={() => setMembers(prev => prev.slice(0, -1))}
        onReset={handleReset}
      />
      {isFormVisible && (
        <MemberForm 
          onAdd={(newMember) => { 
            setMembers(prev => [...prev, newMember]); 
            setIsFormVisible(false); 
          }}
          onCancel={() => setIsFormVisible(false)}
        />
      )}
      {filteredMembers.length > 0 ? (
        <>
          <SummaryGrid members={filteredMembers} />
          <DetailList members={filteredMembers} />
        </>
      ) : (
        <div className="empty-state-box">데이터가 없습니다.</div>
      )}
    </div>
  );
}