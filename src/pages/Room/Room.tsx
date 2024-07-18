import { useEffect, useRef, useState } from 'react';
import { ChangeEvent, KeyboardEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FaChevronRight, FaInfoCircle, FaPlus, FaCog  } from 'react-icons/fa';
import { BsFillDoorOpenFill, BsFillSendFill } from "react-icons/bs";
import { RiLogoutBoxFill } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import { Logo } from '../../components/Logo';
import * as Monaco from 'monaco-editor';
import MonacoEditor from 'react-monaco-editor';
import { io } from 'socket.io-client';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { HomeContainer, AsideHome, HeaderAsideHome, ModalContentConfigs, SectionHomeContent,HeaderSection , HeaderLeftDiv, HeaderRightDiv , LinkStylesBack, Title, ButtonAside, ModalOverlay, ModalHeader, ModalContent, InputContainer, Input, ConfirmButton, EditorContainer, ButtonInvite, Select, Option, Label } from './Room.style.ts';
import DropdownInfo from '../../components/DropdownInfo.tsx';

const Room = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [editorTheme, setEditorTheme] = useState('vs-light');
  const [editorLanguage, setEditorLanguage] = useState('javascript');

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

  const toggleSettingsModal = () => {
    setIsSettingsOpen(!isSettingsOpen);
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
    const roomUrl = `Faça o login [https://codeduo.vercel.app/], clique em entrar na sala utilizando o seguinte roomCode: ${roomId}`;
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
        <ButtonAside><Link to="/"><RiLogoutBoxFill size={24} style={{ color: '#333' }} /></Link></ButtonAside>
        </div>
      </AsideHome>

      <SectionHomeContent>
        <HeaderSection>
          <HeaderLeftDiv>
            <LinkStylesBack to="/home"><FaArrowLeftLong size={24} /><Title>Return</Title></LinkStylesBack>
          </HeaderLeftDiv>
          <HeaderRightDiv>
            <ButtonInvite onClick={copyToClipboard}>Invite <BsFillSendFill /></ButtonInvite>
            <ButtonAside onClick={toggleSettingsModal}><FaCog size={24} style={{ color: '#333' }} /></ButtonAside>
          </HeaderRightDiv>
        </HeaderSection>

        <main>
          <EditorContainer>
            <MonacoEditor
              width="100%"
              height="100%"
              language={editorLanguage}
              theme={editorTheme}
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
        <DropdownInfo onClose={() => setIsInfoOpen(false)}  />
      )}
      {isSettingsOpen && (
        <ModalOverlay>
          <ModalContentConfigs>
            <ModalHeader>
              <p>Configs</p>
              <IoIosClose onClick={toggleSettingsModal} size={40} style={{ cursor: 'pointer' }} data-testid="close-settings-modal" />
                </ModalHeader>
                <div> 
                  <div>
                    <Label>Theme:</Label>
                    <Select onChange={(e) => setEditorTheme(e.target.value)} value={editorTheme}>
                      <Option value="vs-light">Claro</Option>
                      <Option value="vs-dark">Escuro</Option>
                    </Select>
                  </div>
                  <div style={{ marginTop: '15px' }}>
                    <Label>Language Formatting</Label>
                    <Select onChange={(e) => setEditorLanguage(e.target.value)} value={editorLanguage}>
                      <Option value="javascript">JavaScript</Option>
                      <Option value="typescript">TypeScript</Option>
                      <Option value="python">Python</Option>
                    </Select>
                  </div>
                </div>
          </ModalContentConfigs>
        </ModalOverlay>
      )}

    </HomeContainer>
  );
};

export default Room;
