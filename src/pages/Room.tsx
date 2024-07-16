import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaShare } from "react-icons/fa";
import * as Monaco from 'monaco-editor';
import MonacoEditor from 'react-monaco-editor';
import { io } from 'socket.io-client';
import { Link, useParams } from 'react-router-dom';

const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
  overflow: hidden;
`;

const EditorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 15px;
  background: #fff;
  margin: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const RoomInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding: 0 2rem;
`;

const CopyButton = styled.button`
  background: #2b2b2b;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  gap: 15px;

  &:hover {
    background: #303030;
  }
`;

const StyledLink = styled(Link)`
  background: #313131;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 15px;
  &:hover {
    background: #5a6268;
  }
`;

const Room = () => {
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
    const roomUrl = `Entre na plataforma e clique em entrar na sala utilizando o seguinte roomId: ${roomId}`;
    navigator.clipboard.writeText(roomUrl).then(() => {
      alert('Room URL copied to clipboard');
    }, () => {
      alert('Failed to copy URL');
    });
  };

  return (
    <RoomContainer>
      <RoomInfo>
          <CopyButton onClick={copyToClipboard}>Invite <FaShare  /></CopyButton>
          <StyledLink to="/home">
            <FaShare style={{ transform: 'scaleX(-1)' }} /> Back
          </StyledLink>
      </RoomInfo>
      <EditorContainer>
        <MonacoEditor
          width="100%"
          height="100%"
          language="javascript"
          theme="vs-dark"
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
    </RoomContainer>
  );
};

export default Room;
