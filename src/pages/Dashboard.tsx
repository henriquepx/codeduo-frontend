import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHome, FaProjectDiagram, FaTasks, FaUsers, FaCog, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { GoPlus } from "react-icons/go";
import Logo from '/logo.svg';
import Home from '../components/dashboard/Home/Home';
import Projects from '../components/dashboard/Projects/Projects';
import Tasks from '../components/dashboard/Tasks/Tasks';
import Team from '../components/dashboard/Team/Team';
import Settings from '../components/dashboard/Settings/Settings';

const DashBoardContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #ececec;
  padding: 55px;
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
  height: 100%;
  width: 17%;
  left: 0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  nav ul {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.35rem 1rem;
      border-radius: 8px;
      cursor: pointer;

      div {
        display: flex;
        align-items: center;
      }

      svg {
        margin-right: 1rem;
        color: #000000; 
        font-size: 1rem;
      }

      &:hover {
        background-color: #e7e7e7;
      }
    }
  }
`;
const AllContent = styled.div`
  background-color: #fcfcfc;
  padding: 1.5rem;
  height: 100%;
  width: 100%;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;
const HeaderAside = styled.div`
  nav {
    margin-top: 2rem;
    ul {
      li {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        svg {
          color: #000;
        }
      }
    }
  }
`;
const ImgLogoAside = styled.img`
  width: 80%;
  padding: .5rem 1rem;
`;
const FooterAsideMenu = styled.div`
  ul {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      padding: 0.35rem 1rem;
      border-radius: 8px;
      cursor: pointer;

      a {
        color: #000000;
      }

      svg {
        margin-right: 1rem;
        color: #000000; 
        font-size: 1rem;
      }
    }
  }
`;

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'projects':
        return <Projects />;
      case 'tasks':
        return <Tasks />;
      case 'team':
        return <Team />;
      case 'settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <DashBoardContainer>
      <DashBoardContent>
        <AsideInfo>
          <HeaderAside>
            <ImgLogoAside src={Logo} alt="Logo do projeto" />

            <nav>
              <ul>
                <li className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>
                  <div>
                    <FaHome /> Home
                  </div>
                </li>
                <li className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')}>
                  <div>
                    <FaProjectDiagram /> Projects
                  </div>
                  <GoPlus style={{marginRight: '.3rem', borderRadius: '50%', backgroundColor: '#e9e9e9', color: '#000', width: '1.2rem', height: '1.2rem', padding: '.1rem'}}/>
                </li>
                <li className={activeTab === 'tasks' ? 'active' : ''} onClick={() => setActiveTab('tasks')}>
                  <div>
                    <FaTasks /> Tasks
                  </div>
                  <GoPlus style={{marginRight: '.3rem', borderRadius: '50%', backgroundColor: '#e9e9e9', color: '#000', width: '1.2rem', height: '1.2rem', padding: '.1rem'}} />
                </li>
                <li  className={activeTab === 'team' ? 'active' : ''}  onClick={() => setActiveTab('team')}>
                  <div>
                    <FaUsers /> Team
                  </div>
                </li>
                <li  className={activeTab === 'settings' ? 'active' : ''}  onClick={() => setActiveTab('settings')}>
                  <div>
                    <FaCog /> Settings
                  </div>
                </li>
              </ul>
            </nav>
          </HeaderAside>
      
          <FooterAsideMenu>
            <ul>
              <li><FaQuestionCircle /> Help</li>
              <li><FaSignOutAlt /><Link to="/"> Log out</Link></li>
            </ul>
          </FooterAsideMenu>
        </AsideInfo>

        <AllContent>
          {renderContent()}
        </AllContent>
      </DashBoardContent>
    </DashBoardContainer>
  );
}

export default Dashboard;
