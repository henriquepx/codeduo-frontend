import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCalendarAlt, FaSearch } from "react-icons/fa";
import { IoChevronDownOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import ProfileCustom from './ProfileCustom';

const HomeContainer = styled.div`
  padding: 1.2rem;
  overflow: hidden;
`;
const TitlePage = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;
const DateText = styled.span`
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.5rem;
`;
const HeaderHome = styled.header`
  display: flex;
  justify-content: space-between;
  @media (max-width: 1000px) {
    flex-direction: column;
    justify-content: flex-start;
    gap: 15px;
  }
`;
const ProfilePicture = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 5px;
`;
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const HeaderRightDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
const MainHome = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
`;
const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;
const MainContainerDiv = styled.div`
  width: 100%;
  background-color: #ececec;
  padding: 1rem;
  border-radius: 10px;
  height: 300px;
  cursor: pointer;
`
const TaskHome = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const TaskHeaderDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`
const TaskHeaderH3 = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  padding-right: 1rem;
  border-right: 1px solid #666;
  @media (max-width: 600px) {
    padding-right: 0rem;
    border-right: 0px solid #666;
  }
`
const TaskHeaderSpan = styled.span`
  @media (max-width: 600px) {
    display: none;
  }
`
const TaskHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const ButtonDropdownFilter = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0.3rem 0.8rem;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  &:hover {
    background-color: #e0e0e0; 
  }
`;
const DropdownFilter = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 880;
  top: -430%;
  right: 0;
  background-color: #ececec;
  border-radius: 10px;
  padding: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;
const DropdownFilterP = styled.p`
  padding: 0.5rem;
  margin: 0;
  cursor: pointer;
`
const MainSepare = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
  @media (max-width: 1350px) {
    flex-wrap: wrap;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState('');
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Week');
  const [dropdownProfile, setDropdownProfile] = useState(false);

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

  function handleDropdown() {
    setIsDropdownActive(!isDropdownActive);
  }
  function handleFilterChange(filter: string) {
    setSelectedFilter(filter);
    setIsDropdownActive(false);
  }

  function handleDropdownProfile() {
    setDropdownProfile(!dropdownProfile);
  }

  const currentUser = useSelector((state: RootState) => state.user.currentUser) as { username: string, profilePicture: string } | null;
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null; 
  }

  return (
    <HomeContainer>
      <HeaderHome>
        <div>
        <TitlePage>{currentUser ? `Welcome, ${currentUser.username}!` : 'Welcome!'}</TitlePage>
          <p>Track your projects, your goals and yours tasks and... do it.</p>  
        </div>
        <HeaderRight>
          <HeaderRightDiv>
            <DateText>{currentDate}</DateText> 
            <FaCalendarAlt style={{ cursor: 'pointer', color: '#000000', backgroundColor: '#ececec', width: '35px', height: '35px', padding: '0.5rem', borderRadius: '30%' }} />
          </HeaderRightDiv>
          <FaSearch style={{ cursor: 'pointer', color: '#000000', backgroundColor: '#ececec', width: '35px', height: '35px', padding: '0.5rem', borderRadius: '30%' }} />
          <ProfilePicture src={currentUser.profilePicture} alt="Profile" onClick={handleDropdownProfile} />
          {dropdownProfile && (
            <ProfileCustom onClose={handleDropdownProfile} />
          )}
        </HeaderRight>
      </HeaderHome>
      
      <MainHome>
        <MainContainer>
          <MainContainerDiv>
            <h2>Projects</h2>
          </MainContainerDiv>
          <MainContainerDiv>
            <h2>Overall information</h2>
          </MainContainerDiv>
          <MainContainerDiv>
            <h2>Team Activity</h2>
          </MainContainerDiv>
        </MainContainer>

        <MainSepare>

         <TaskHome>
            <TaskHeader>
              <TaskHeaderDiv>
                <TaskHeaderH3>Tasks opens</TaskHeaderH3>
                <TaskHeaderSpan>Done 80%</TaskHeaderSpan>
              </TaskHeaderDiv>
              <ButtonDropdownFilter onClick={handleDropdown}>
                {selectedFilter} <IoChevronDownOutline />
                {isDropdownActive && (
                  <DropdownFilter>
                    <DropdownFilterP onClick={() => handleFilterChange('Year')}>Year</DropdownFilterP>
                    <DropdownFilterP onClick={() => handleFilterChange('Day')}>Day</DropdownFilterP>
                    <DropdownFilterP onClick={() => handleFilterChange('Month')}>Month</DropdownFilterP>
                  </DropdownFilter>
                )}
              </ButtonDropdownFilter>
            </TaskHeader>
          </TaskHome>

        </MainSepare>
      </MainHome>
    </HomeContainer>
  );
};

export default Home;
