import React, { useState, useEffect } from 'react';

export default function MemberForm({ onAdd, onCancel, getIntroData }) {
  const initialValues = {
    name: '', part: 'Frontend', skills: '', oneLiner: '', 
    intro: '', email: '', phone: '', website: '', note: ''
  };
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    const handleEsc = (e) => { 
      if (e.key === 'Escape') { 
        setFormData(initialValues);
        onCancel(); 
      } 
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  const handleRandomFill = async () => {
    try {
      const res = await fetch('https://randomuser.me/api/');
      const data = await res.json();
      const user = data.results[0];
      const info = getIntroData(formData.part);
      setFormData({
        ...formData,
        name: `${user.name.first} ${user.name.last}`,
        skills: info.skills,
        oneLiner: info.oneLiner,
        intro: info.intro,
        email: user.email,
        phone: user.phone,
        website: `https://example.com/${user.login.username}`,
        note: "데이터가 바뀌면 UI도 바뀐다!"
      });
    } catch { alert("데이터를 가져오는 데 실패했습니다."); }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // [강화된 유효성 검사] 'note' 필드를 포함한 모든 필드 검증
    const requiredFields = ['name', 'skills', 'oneLiner', 'intro', 'email', 'phone', 'website', 'note'];
    const isAllFilled = requiredFields.every(field => formData[field].trim() !== '');

    if (!isAllFilled) {
      alert("모든 필드를 채워주세요!");
      return;
    }

    onAdd({ ...formData, id: Date.now(), image: `https://picsum.photos/seed/${Date.now()}/300/200` });
    setFormData(initialValues); // 제출 후 폼 초기화
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>이름 *</label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        <div className="form-group">
          <label>파트</label>
          <select value={formData.part} onChange={(e) => setFormData({...formData, part: e.target.value})}>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Design">Design</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label>관심 기술 *</label>
        <input type="text" value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} />
      </div>
      <div className="form-group">
        <label>한 줄 소개 *</label>
        <input type="text" value={formData.oneLiner} onChange={(e) => setFormData({...formData, oneLiner: e.target.value})} />
      </div>
      <div className="form-group">
        <label>자기소개 *</label>
        <textarea value={formData.intro} onChange={(e) => setFormData({...formData, intro: e.target.value})} />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Email *</label>
          <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Phone *</label>
          <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
        </div>
      </div>
      <div className="form-group">
        <label>Website *</label>
        <input type="text" value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})} />
      </div>
      <div className="form-group">
        <label>한 마디 *</label>
        <input type="text" value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})} />
      </div>
      <div className="form-actions">
        <button type="button" className="btn" onClick={handleRandomFill}>랜덤 값 채우기</button>
        <button type="submit" className="btn">추가하기</button>
        <button type="button" className="btn" onClick={() => { setFormData(initialValues); onCancel(); }}>취소</button>
      </div>
    </form>
  );
}