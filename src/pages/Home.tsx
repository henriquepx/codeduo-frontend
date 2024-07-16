import { useState } from 'react';
import styled from 'styled-components';
import { ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FaChevronRight, FaGithub, FaLinkedin, FaTiktok } from 'react-icons/fa';
import { IoIosClose } from "react-icons/io";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #fafafa;
  padding: 2rem;
  text-align: center;
`;
const MenuContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 2px solid #ddd;
  border-radius: 15px;
  padding: 2rem;
  width: 80%;
  max-width: 600px;
`;
const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
`;
const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: .5rem;
  line-height: 1.6;
`;
const Button = styled.button`
  background: #272727;
  color: white;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  margin: 0.5rem;

  &:hover {
    background: #4b4b4b;
  }
`;
const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;
const Icon = styled.a`
  color: #333;
  font-size: 1.5rem;
  margin: 0 10px;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
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
const ModalContent = styled.div`
  background: #fafafa;
  border: 2px solid #ddd;
  border-radius: 15px;
  padding: 1rem;
  width: 80%;
  max-width: 400px;
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
  border-radius: 15px;
  font-size: 1rem;
`;
const ConfirmButton = styled.button`
  background: #007bff;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  margin-left: 0.5rem;

  &:hover {
    background: #0056b3;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setRoomId(e.target.value);
  };

  const handleJoinRoom = () => {
    if (roomId) {
      navigate(`/room/${roomId}`);
      setIsModalOpen(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleJoinRoom();
    }
  };

  return (
    <HomeContainer>
      <MenuContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/icon.png" alt="" />
          <Title>CodeDuo</Title>
        </div>
        
        <Description>
          Uma plataforma de aprendizado e resolução de problemas do dia a dia de todo desenvolvedor. Crie uma sala e convide amigos para codar juntos ou resolver problemas específicos. Enjoy!
        </Description>
        
        <div>
          <Button onClick={createRoom}>Create Room</Button>
          <Button onClick={handleJoinClick}>Join Room</Button>
        </div>
        
        <SocialLinks>
          <Icon href="https://www.linkedin.com/in/henriquepinheiroxavier/" target="_blank">
            <FaLinkedin />
          </Icon>
          <Icon href="https://www.tiktok.com/@henriqqdev" target="_blank">
            <FaTiktok />
          </Icon>
          <Icon href="https://github.com/henriquepx" target="_blank">
            <FaGithub />
          </Icon>
        </SocialLinks>
      </MenuContent>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <IoIosClose onClick={handleCloseModal} size={40} />
            <InputContainer>
              <Input
                type="text"
                placeholder="Enter Room ID"
                value={roomId}
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
    </HomeContainer>
  );
};

export default Home;
