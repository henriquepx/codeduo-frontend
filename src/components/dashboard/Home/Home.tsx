import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCalendarAlt, FaSearch } from "react-icons/fa";
import { IoChevronDownOutline } from "react-icons/io5";
import HenriqueLogo from '../../../assets/henrique.png';
import TaskHomeComponent from './TaskHomeComponent';

const HomeContainer = styled.div`
  padding: 1.2rem;
  h1 {
    font-size: 2rem;
    font-weight: 600;
  }
`;
const DateText = styled.span`
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.5rem;
`;
const HeaderHome = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProfilePicture = styled.div`
  background-image: url(${HenriqueLogo});
  background-size: contain;
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
    padding: 0.5rem;
    border-radius: 30%;
    cursor: pointer;
  }
`;

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
  div {
    width: 100%;
    background-color: #ececec;  
    padding: 1rem;
    border-radius: 10px;
    height: 200px;
    cursor: pointer;
  }
`;
const TaskHome = styled.div`
  display: flex;
  width: 100%;
`;
const TaskHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  div {
    display: flex;
    align-items: center;
    gap: 1rem;
    h3 {
      font-size: 1rem;
      font-weight: 600;
      padding-right: 1rem;
      border-right: 1px solid #666;
    }
  }
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
  top: 120%;
  right: 0;
  background-color: #ececec;
  border-radius: 10px;
  padding: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
  p {
    padding: 0.5rem;
    margin: 0;
    cursor: pointer;
  }
`;
const TaskMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`
const MainSepare = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
`
const ContactsHome = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const ContactsContent = styled.div`
  background-color: #ececec;
  border-radius: 10px;
`

const Home = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Week');

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
      
      <MainHome>
        <MainContainer>
          <div>
            <h2>Projects</h2>
          </div>
          <div>
          <h2>Overall information</h2>
          </div>
          <div>
          <h2>Team Activity</h2>
          </div>
        </MainContainer>

        <MainSepare>
          <TaskHome>
            <TaskHeader>
              <div>
                <h3>Tasks opens</h3>
                <span>Done 80%</span>
              </div>
              <ButtonDropdownFilter onClick={handleDropdown}>
                {selectedFilter} <IoChevronDownOutline />
                {isDropdownActive && (
                  <DropdownFilter>
                    <p onClick={() => handleFilterChange('Year')}>Year</p>
                    <p onClick={() => handleFilterChange('Day')}>Day</p>
                    <p onClick={() => handleFilterChange('Month')}>Month</p>
                  </DropdownFilter>
                )}
              </ButtonDropdownFilter>
            </TaskHeader>

            <TaskMain>
              <TaskHomeComponent />
            </TaskMain>
          </TaskHome>

          <ContactsHome>
            <h2>Contacts</h2>
            <ContactsContent>
              {/* Conteúdo dos contatos */}
            </ContactsContent>
          </ContactsHome>
        </MainSepare>
      </MainHome>
    </HomeContainer>
  );
};

export default Home;
