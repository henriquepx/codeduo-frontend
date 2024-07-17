import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ChangeEvent, KeyboardEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FaChevronRight, FaGithub, FaLinkedin, FaTiktok, FaInfoCircle, FaPlus } from 'react-icons/fa';
import { BsFillDoorOpenFill, BsFillSendFill } from "react-icons/bs";
import { RiLogoutBoxFill } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import HenriqueLogo from '../assets/henrique.png';
import { Logo } from '../components/Logo';
import * as Monaco from 'monaco-editor';
import MonacoEditor from 'react-monaco-editor';
import { io } from 'socket.io-client';
import { FaArrowLeftLong } from 'react-icons/fa6';

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
const LinkStylesBack = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;
  text-decoration: none;
  color: #333;

  &:hover {
    color: #555;
  }
`;
const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
`;
const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 0.5rem;
  line-height: 1.6;
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
const Button = styled.button`
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
    color: #555;
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
const EditorContainer = styled.div`
  height: 92vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;
const ButtonInvite = styled(Button)`
gap: 5px;
`

const Room = () => {
  const navigate = useNavigate();
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

  const { roomId } = useParams<{ roomId: string }>();
  const [code, setCode] = useState<string>('write code and solve problems');
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const socket = useRef(io('wss://codeduo-backend.onrender.com'));
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const socketInstance = socket.current;
    socketInstance.emit('joinRoom', roomId);

    socketInstance.on('codeChange', (newCode: string) => {
      setCode(newCode);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [roomId]);

  const handleEditorChange = (newCode: string) => {
    setCode(newCode);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      socket.current.emit('codeChange', newCode);
    }, 300); 
  };

  const copyToClipboard = () => {
    const roomUrl = `Entre na plataforma e clique em entrar na sala utilizando o seguinte roomCode: ${roomId}`;
    navigator.clipboard.writeText(roomUrl).then(() => {
      alert('Room URL copied to clipboard');
    }, () => {
      alert('Failed to copy URL');
    });
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
          <Link to="/"><RiLogoutBoxFill size={24} style={{ color: '#333' }} /></Link>
        </div>
      </AsideHome>

      <SectionHomeContent>
        <HeaderSection>
          <HeaderLeftDiv>
            <LinkStylesBack to="/home"><FaArrowLeftLong size={24} /><Title>${}</Title></LinkStylesBack>
          </HeaderLeftDiv>
          <HeaderRightDiv>
            <img src={HenriqueLogo} style={{ width: '40px', borderRadius: '50%' }} alt="Foto de perfil" />
            <ButtonInvite onClick={copyToClipboard}>Invite <BsFillSendFill /></ButtonInvite>
          </HeaderRightDiv>
        </HeaderSection>

        <main>
          <EditorContainer>
            <MonacoEditor
              width="100%"
              height="100%"
              language="javascript"
              theme="vs-light"
              value={code}
              editorDidMount={(editor) => (editorRef.current = editor)}
              onChange={handleEditorChange}
              options={{
                fontSize: 14,
                lineHeight: 24,
                padding: { top: 10, bottom: 10 },
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
                smoothScrolling: false,
                cursorSmoothCaretAnimation: 'off',
                renderLineHighlight: 'none',
              }}
            />
          </EditorContainer>
        </main>
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
            <ModalOverlay>
              <ModalContent>
                <ConfirmButton onClick={toggleInfoDropdown}>
                  <FaChevronRight />
                </ConfirmButton>
                <Description>
                  Crie uma sala e convide amigos para codar juntos ou resolver problemas específicos!
                </Description>
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
              </ModalContent>
            </ModalOverlay>
          )}
    </HomeContainer>
  );
};

export default Room;
