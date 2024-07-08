import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCalendarAlt, FaSearch } from "react-icons/fa";
import HenriqueLogo from '../../../assets/henrique.png';

const HomeContainer = styled.div`
  padding: 1.2rem;
  h1 {
    font-size: 2rem;
    font-weight: 600;
  }
`;
const DateText = styled.span`
  font-size: .8rem;
  color: #666;
  margin-top: 0.5rem;
`;
const HeaderHome = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const ProfilePicture = styled.div`
  background-image: url(${HenriqueLogo});
  background-size: contain;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 5px;
`
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  svg {
    color: #000000;
    background-color: #ececec;
    width: 35px;
    height: 35px;
    padding: .5rem;
    border-radius: 30%;
    cursor: pointer;
  }

`


const Home = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();

      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        timeZone: 'America/Sao_Paulo' 
      };

      const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(now);
      setCurrentDate(formattedDate);
    };

    updateDate();
  }, []);

  return (
    <HomeContainer>

      <HeaderHome>

        <div>
          <h1>Welcome, Henrique.</h1>
          <p>Track your projects, your goals and yours tasks and... do it.</p>  
        </div>

        <HeaderRight>
          <div>
            <DateText>{currentDate}</DateText> 
            <FaCalendarAlt />
          </div>
          
          <FaSearch />
          <ProfilePicture></ProfilePicture>
        </HeaderRight>

      </HeaderHome>
      
      <main>
        <div>

        </div>
        <div>
          
        </div>
        <div>
          
        </div>
      </main>
      
    </HomeContainer>
  );
};

export default Home;
