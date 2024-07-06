import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHome, FaProjectDiagram, FaTasks, FaUsers, FaCog, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import HenriqueLogo from '../assets/henrique.png';

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
      align-items: center;
      padding: 0.5rem 0;

      svg {
        margin-right: 0.5rem;
      }
    }
  }
`;

// Ajuste no estilo do contêiner de perfil
const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  h1 {
    font-size: 1rem;
    font-weight: bold;
  }
`;

const ImgLogo = styled.div`
background-image: url(${HenriqueLogo});
background-position: center;
  background-size: cover;
  width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 1rem;
    position: relative;
    span {
    position: absolute;
    bottom: 0px; 
    right: 0px; 
    width: 12px;
    height: 12px;
    background-color: #00ff00;
    border: 1px solid #d8d8d8;
    border-radius: 50%;
  }
`

const AllContent = styled.div`
  background-color: #fcfcfc;
  padding: 1.5rem;
  height: 100%;
  width: 100%;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const Dashboard = () => {
  return (
    <DashBoardContainer>
      <DashBoardContent>
        
        <AsideInfo>
          <div>
            <ProfileContainer>
              <ImgLogo><span></span></ImgLogo>
              <h1>Henrique Pinheiro</h1>
            </ProfileContainer>

            <nav>
              <ul>
                <li><FaHome /> Home</li>
                <li><FaProjectDiagram /> Projects</li>
                <li><FaTasks /> Tasks</li>
                <li><FaUsers /> Team</li>
                <li><FaCog /> Settings</li>
              </ul>
            </nav>

          </div>
      
          <div>
            <ul>
              <li><FaQuestionCircle /> Help</li>
              <Link to="/"><li><FaSignOutAlt /> Log out</li></Link>
            </ul>
            <Link to="/">Go Home</Link>
          </div>
        </AsideInfo>

        <AllContent>
          <h1>Dashboard 1</h1>
        </AllContent>

      </DashBoardContent>
    </DashBoardContainer>
  );
}

export default Dashboard;
