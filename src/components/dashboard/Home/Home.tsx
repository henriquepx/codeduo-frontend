import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const HomeContainer = styled.div`
  overflow: hidden;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 89vh;
  overflow: hidden;
`;
const Header = styled.header`
  background: #e2e2e2;
  padding: 1rem;
  color: #000000;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  margin-bottom: 1rem;
`;
const TitlePage = styled.h1`
  font-size: 1rem;
`;
const EditorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const Dropdown = styled.select`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
`;

const socket = io('http://localhost:5000');

const Home = () => {
  const [code, setCode] = useState<string>('write code and solve problems');
  const [theme, setTheme] = useState<string>('vs-dark');
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const themes = [
    'vs-dark',
    'vs-light',
    'hc-black',
    'hc-light',
  ];

  useEffect(() => {
    socket.on('codeChange', (newCode: string) => {
      setCode(newCode);
    });

    return () => {
      socket.off('codeChange');
    };
  }, []);

  const handleEditorChange = (newCode: string) => {
    setCode(newCode);
    socket.emit('codeChange', newCode);
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = event.target.value;
    setTheme(newTheme);
    monaco.editor.setTheme(newTheme);
  };

  const currentUser = useSelector((state: RootState) => state.user.currentUser) as { username: string } | null;

  return (
    <HomeContainer>
      <Container>
        <Header>
          <div><TitlePage>{currentUser ? `Welcome, ${currentUser.username}. Invite a friend to get started!` : 'Welcome!'}</TitlePage></div>
          <Dropdown onChange={handleThemeChange} value={theme}>
            {themes.map((themeName) => (
              <option key={themeName} value={themeName}>
                {themeName}
              </option>
            ))}
          </Dropdown>
        </Header>
        <EditorContainer>
          <MonacoEditor
            width="100%"
            height="100vh"
            language="javascript"
            theme={theme}
            value={code}
            editorDidMount={(editor) => (editorRef.current = editor)}
            onChange={handleEditorChange}
            options={{
              scrollbar: {
                vertical: 'auto',
                horizontal: 'auto',
              },
              minimap: {
                enabled: false,
              },
              wordWrap: 'on',
              folding: true,
              renderLineHighlight: 'all',
              overviewRulerBorder: false,
              automaticLayout: true,
              lineNumbersMinChars: 3,
              fontSize: 14,
              lineHeight: 24,
              renderWhitespace: 'all',
              scrollBeyondLastLine: false,
              padding: {
                top: 10,
                bottom: 10,
              },
              colorDecorators: true,
              cursorStyle: 'line',
              fontFamily: 'Consolas, "Courier New", monospace',
            }}
          />
        </EditorContainer>
      </Container>
    </HomeContainer>
  );
};

export default Home;
