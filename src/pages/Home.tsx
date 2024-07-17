import { useState } from 'react';
import styled from 'styled-components';
import { ChangeEvent, KeyboardEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FaChevronRight, FaInfoCircle, FaPlus } from 'react-icons/fa';
import { BsFillDoorOpenFill } from "react-icons/bs";
import { RiLogoutBoxFill } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import HenriqueLogo from '../assets/henrique.png';
import { Logo } from '../components/Logo';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import DropdownInfo from '../components/DropdownInfo';

const HomeContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background: #f8f9fa;
`;
const AsideHome = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border-right: 1px solid #dee2e6;
  color: #000;
  width: 5rem;
  padding: 2rem;
`;
const HeaderAsideHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;
const SectionHomeContent = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: calc(100vw - 5rem);
`;
const HeaderSection = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #ffffff;
  border-bottom: 1px solid #dee2e6;
`;
const HeaderLeftDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const HeaderRightDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  color: #333;
  height: 90vh;
`
const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
`;
const ButtonAside = styled.button`
  background: #ffffff; 
  color: #333;
  padding: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 15px;
  cursor: pointer;
  margin: 0.5rem;
  transition: background 0.3s, border-color 0.3s;

  &:hover {
    background: #f1f1f1;
    border-color: #bbb;
  }
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-weight: 700;
  padding: 0 0.5rem;
`;
const ModalContent = styled.div`
  background: #ffffff;
  border: 2px solid #ddd;
  border-radius: 15px;
  padding: 1rem;
  width: 80%;
  max-width: 400px;
  z-index: 999;
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  font-size: 1rem;
`;
const ConfirmButton = styled.button`
  background: #ffffff;
  color: #333;
  padding: 0.8rem;
  border: none;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: background 0.3s, border-color 0.3s;
  &:hover {
    background: #f1f1f1;
    border-color: #bbb;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.user.currentUser); 
  const [roomCode, setRoomCode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const createRoom = () => {
    const id = uuidv4().slice(0, 5);
    navigate(`/room/${id}`);
  };

  const handleJoinClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRoomIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomCode(e.target.value);
  };

  const handleJoinRoom = () => {
    if (roomCode) {
      navigate(`/room/${roomCode}`);
      setIsModalOpen(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleJoinRoom();
    }
  };

  const toggleInfoDropdown = () => {
    setIsInfoOpen(!isInfoOpen);
  };

  return (
    <HomeContainer>
      <AsideHome>
        <HeaderAsideHome>
          <Logo width={40} height={30} />
          <div>
            <ButtonAside onClick={createRoom}><FaPlus style={{ color: '#333' }} size={22} /></ButtonAside>
            <ButtonAside onClick={handleJoinClick}><BsFillDoorOpenFill style={{ color: '#333' }} size={22} /></ButtonAside>
            <ButtonAside onClick={toggleInfoDropdown}><FaInfoCircle style={{ color: '#333' }} size={22} /></ButtonAside>
          </div>
        </HeaderAsideHome>
        <div>
          <ButtonAside><Link to="/"><RiLogoutBoxFill size={24} style={{ color: '#333' }} /></Link></ButtonAside>
        </div>
      </AsideHome>

      <SectionHomeContent>
        <HeaderSection>
          <HeaderLeftDiv>
            <Title>Olá, {currentUser?.username}!</Title>
          </HeaderLeftDiv>
          <HeaderRightDiv>
            <img src={HenriqueLogo} style={{ width: '40px', borderRadius: '50%' }} alt="Foto de perfil" />
          </HeaderRightDiv>
        </HeaderSection>

        <Main>
          <h1>Bem vindo ao Codeduo</h1>
        </Main>
      </SectionHomeContent>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <p>enjoy ;)</p>
              <IoIosClose onClick={handleCloseModal} size={40} style={{ cursor: 'pointer' }} />
            </ModalHeader>
            <InputContainer>
              <Input
                type="text"
                placeholder="Enter Room ID"
                value={roomCode}
                onChange={handleRoomIdChange}
                onKeyDown={handleKeyDown}
              />
              <ConfirmButton onClick={handleJoinRoom}>
                <FaChevronRight />
              </ConfirmButton>
            </InputContainer>
          </ModalContent>
        </ModalOverlay>
      )}

      {isInfoOpen && (
        <DropdownInfo onClose={() => setIsInfoOpen(false)} />
      )}
    </HomeContainer>
  );
};

export default Home;
