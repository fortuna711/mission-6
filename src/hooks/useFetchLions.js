import { useState } from 'react';

const transformApiData = (user) => {
  const parts = ['Frontend', 'Backend', 'Design', 'PM'];
  return {
    id: user.login.uuid,
    name: `${user.name.first} ${user.name.last}`,
    part: parts[Math.floor(Math.random() * parts.length)],
    intro: "열심히 배우고 성장하겠습니다!",
    fullIntro: `${user.location.country} 출신으로 새로운 기술을 배우는 데 열정이 가득합니다.`,
    email: user.email,
    phone: user.phone,
    link: "https://www.lionexample.com",
    skills: "HTML / CSS / JavaScript",
    image: user.picture.large, // 사진 데이터 매핑 확인
  };
};

export const useFetchLions = (members, setMembers) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (count, type = 'add') => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://randomuser.me/api/?results=${count}`);
      if (!response.ok) throw new Error("네트워크 오류");
      const data = await response.json();
      const newMembers = data.results.map(transformApiData);
      setMembers(prev => type === 'replace' ? newMembers : [...prev, ...newMembers]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, error, fetchData };
};