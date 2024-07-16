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
`;
const RoomInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
  padding: 0 1rem;
`;
const RoomId = styled.h1`
  font-size: 1.2rem;
  color: #333;
`;
const CopyButton = styled.button`
  background: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const Room = () => {
  const { id } = useParams<{ id: string }>();
  const [code, setCode] = useState<string>('write code and solve problems');
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const socket = io('http://localhost:3000');

  useEffect(() => {
    socket.emit('joinRoom', id);

    socket.on('codeChange', (newCode: string) => {
      setCode(newCode);
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  const handleEditorChange = (newCode: string) => {
    setCode(newCode);
    socket.emit('codeChange', newCode);
  };

  const copyToClipboard = () => {
    const roomUrl = `${window.location.origin}/room/${id}`;
    navigator.clipboard.writeText(roomUrl).then(() => {
      alert('Room URL copied to clipboard');
    }, () => {
      alert('Failed to copy URL');
    });
  };

  return (
    <RoomContainer>
      <RoomInfo>
        <RoomId>Room URL: {`${window.location.origin}/room/${id}`}</RoomId>
        <div>
          <CopyButton onClick={copyToClipboard}>Copy Room URL</CopyButton>
          <Link to="/home">Back</Link>
        </div>
        
      </RoomInfo>
      <EditorContainer>
        <MonacoEditor
          width="100%"
          height="70vh"
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
          }}
        />
      </EditorContainer>
    </RoomContainer>
  );
};

export default Room;
