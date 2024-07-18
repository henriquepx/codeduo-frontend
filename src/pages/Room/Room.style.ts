import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HomeContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background: #f8f9fa;
`;
export const AsideHome = styled.aside`
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
export const HeaderAsideHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;
export const SectionHomeContent = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: calc(100vw - 5rem);
`;
export const HeaderSection = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #ffffff;
  border-bottom: 1px solid #dee2e6;
`;
export const HeaderLeftDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const HeaderRightDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const LinkStylesBack = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;
  text-decoration: none;
  color: #333;

  &:hover {
    color: #555;
  }
`;
export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
`;
export const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 0.5rem;
  line-height: 1.6;
`;
export const ButtonAside = styled.button`
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
export const Button = styled.button`
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
export const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;
export const Icon = styled.a`
  color: #333;
  font-size: 1.5rem;
  margin: 0 10px;
  transition: color 0.3s ease;

  &:hover {
    color: #555;
  }
`;
export const ModalOverlay = styled.div`
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
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-weight: 700;
  padding: 0 0.5rem;
`;
export const ModalContent = styled.div`
  background: #ffffff;
  border: 2px solid #ddd;
  border-radius: 15px;
  padding: 1rem;
  width: 80%;
  max-width: 400px;
  z-index: 999;
`;
export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  font-size: 1rem;
`;
export const ConfirmButton = styled.button`
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
export const EditorContainer = styled.div`
  height: 92vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;
export const ButtonInvite = styled(Button)`
gap: 5px;
`
