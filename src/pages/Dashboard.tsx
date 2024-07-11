import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHome, FaProjectDiagram, FaTasks, FaUsers, FaCog, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { GoPlus } from "react-icons/go";
import Home from '../components/dashboard/Home/Home';
import Projects from '../components/dashboard/Projects/Projects';
import Tasks from '../components/dashboard/Tasks/Tasks';
import Team from '../components/dashboard/Team/Team';
import Settings from '../components/dashboard/Settings/Settings';

const DashBoardContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #ececec;
  padding: 35px;
  @media (max-width: 1350px) {
    padding: 15px;
  }
`;
const DashBoardContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  border-radius: 15px;
  position: relative;
  display: flex;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
  a {
    text-decoration: none;
    color: #fff;
  }
`;
const AsideInfo = styled.aside`
  height: 96%;
  width: 17%;
  left: 0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: .6rem;
  @media (max-width: 1260px) {
    padding: .5rem;
  }
  @media (max-width: 768px) {
    padding: .2rem;
    align-items: center;
  }
  nav ul {
    li {
      &:hover {
        background-color: #e7e7e7;
      }
    }
  }
`;
const LiAsideInfo = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 0.35rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  color: #000;
  div {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`
const AllContent = styled.div`
  background-color: #fcfcfc;
  padding: 1.5rem;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #dddddd transparent;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;
const HeaderAsideNav = styled.nav`
  margin-top: 2rem;
`
const HeaderAsideLiP = styled.p`
  @media (max-width: 768px) {
    display: none;
  }
`
const HeaderAsideSpanSVG = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`
const HeaderAside = styled.div`
  display: flex;
  flex-direction: column;
`;
const TitleAside = styled.h1`
  font-size: 2.8vh;
  font-weight: bold;
  color: #000;
  font-family: 'sa', sans-serif;
  margin-left: 1rem;
  @media (max-width: 768px) {
    font-size: 2.5vh;
    span {
      display: none;
    }
  }
`
const UlFooterAside = styled.ul`
  list-style: none;
  padding: 0;
`
const LiFooterAside = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.35rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  color: #000;
  p {
    @media (max-width: 768px) {
      display: none;
    }
  }
`

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'settings':
        return <Settings />;
      case 'tasks':
        return <Tasks />;
      case 'team':
        return <Team />;
      case 'projects':
        return <Projects />;
      default:
        return <Home />;
    }
  };

  return (
    <DashBoardContainer>
      <DashBoardContent>
        <AsideInfo>
          <HeaderAside>
            <TitleAside>C<span>ode</span>D<span>uo</span></TitleAside>
            <HeaderAsideNav>
              <ul>
                <LiAsideInfo className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>
                  <div>
                    <FaHome />
                    <HeaderAsideLiP>Home</HeaderAsideLiP>
                  </div>
                </LiAsideInfo>
                <LiAsideInfo className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
                  <div>
                    <FaCog />
                    <HeaderAsideLiP>Settings</HeaderAsideLiP>
                  </div>
                </LiAsideInfo>
                <LiAsideInfo className={activeTab === 'tasks' ? 'active' : ''} onClick={() => setActiveTab('tasks')}>
                  <div>
                    <FaTasks  />
                    <HeaderAsideLiP>Tasks</HeaderAsideLiP>
                  </div>
                  <HeaderAsideSpanSVG><GoPlus /></HeaderAsideSpanSVG>
                </LiAsideInfo>
                <LiAsideInfo className={activeTab === 'team' ? 'active' : ''} onClick={() => setActiveTab('team')}>
                  <div>
                    <FaUsers  />
                    <HeaderAsideLiP>Team</HeaderAsideLiP>
                  </div>
                </LiAsideInfo>
                <LiAsideInfo className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')}>
                  <div>
                    <FaProjectDiagram />
                    <HeaderAsideLiP>Projects</HeaderAsideLiP>
                  </div>
                  <HeaderAsideSpanSVG><GoPlus /></HeaderAsideSpanSVG>
                </LiAsideInfo>
              </ul>
            </HeaderAsideNav>
          </HeaderAside>
      
          <div>
            <UlFooterAside>
              <LiFooterAside>
                <FaQuestionCircle />
                <p>Help</p>
              </LiFooterAside>
              <Link to="/">
              <LiFooterAside>
                <FaSignOutAlt  />
                  <p>Log out</p>
                </LiFooterAside>
              </Link>
            </UlFooterAside>
          </div>
        </AsideInfo>

        <AllContent>
          {renderContent()}
        </AllContent>
      </DashBoardContent>
    </DashBoardContainer>
  );
}

export default Dashboard;
