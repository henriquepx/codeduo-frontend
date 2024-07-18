import { useState } from 'react';
import { ChangeEvent, KeyboardEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FaChevronRight, FaInfoCircle, FaPlus } from 'react-icons/fa';
import { BsFillDoorOpenFill } from "react-icons/bs";
import { RiLogoutBoxFill } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import HenriqueLogo from '../../assets/henrique.png';
import { Logo } from '../../components/Logo';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import DropdownInfo from '../../components/DropdownInfo';
import { 
  HomeContainer,
  AsideHome,
  HeaderAsideHome,
  SectionHomeContent,
  HeaderSection,
  HeaderLeftDiv,
  HeaderRightDiv,
  Main,
  Title,
  ButtonAside,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  InputContainer,
  Input,
  ConfirmButton
} from './Home.style.ts';


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
            <Title>Seja bem-vindo ao Codeduo!</Title>
            <div>
            <p><FaPlus style={{ color: '#333', margin: '0 7px' }} size={20} /> para criar uma nova sala.</p>
            <p><BsFillDoorOpenFill style={{ color: '#333', margin: '0 7px' }} size={20} /> para entrar em uma sala existente.</p>
            <p><FaInfoCircle style={{ color: '#333', margin: '0 7px' }} size={20} /> para saber mais sobre o projeto.</p>
          </div>
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
