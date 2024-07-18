import { useEffect, useRef, useState } from 'react';
import { ChangeEvent, KeyboardEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FaChevronRight, FaGithub, FaLinkedin, FaTiktok, FaInfoCircle, FaPlus } from 'react-icons/fa';
import { BsFillDoorOpenFill, BsFillSendFill } from "react-icons/bs";
import { RiLogoutBoxFill } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import HenriqueLogo from '../../assets/henrique.png';
import { Logo } from '../../components/Logo';
import * as Monaco from 'monaco-editor';
import MonacoEditor from 'react-monaco-editor';
import { io } from 'socket.io-client';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { HomeContainer, AsideHome, HeaderAsideHome, SectionHomeContent,HeaderSection , HeaderLeftDiv, HeaderRightDiv , LinkStylesBack, Title, Description, ButtonAside, SocialLinks, Icon, ModalOverlay, ModalHeader, ModalContent, InputContainer, Input, ConfirmButton, EditorContainer, ButtonInvite } from './Room.style.ts';

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
              <IoIosClose onClick={handleCloseModal} size={40} style={{ cursor: 'pointer' }} data-testid="close-modal" />
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
