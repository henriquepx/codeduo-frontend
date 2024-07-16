import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
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
  padding: 0 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CopyButton = styled.button`
  background: #2b2b2b;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 1rem;

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

  &:hover {
    background: #5a6268;
  }
`;

const Room = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [code, setCode] = useState<string>('write code and solve problems');
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const socket = io('wss://codeduo-backend.onrender.com');

  useEffect(() => {
    socket.emit('joinRoom', roomId);

    socket.on('codeChange', (newCode: string) => {
      setCode(newCode);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const handleEditorChange = (newCode: string) => {
    setCode(newCode);
    socket.emit('codeChange', newCode);
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
        <div>
          <CopyButton onClick={copyToClipboard}>Copy Room URL</CopyButton>
          <StyledLink to="/home">Back</StyledLink>
        </div>
      </RoomInfo>
      <EditorContainer>
        <MonacoEditor
          width="100%"
          height="83vh"
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
