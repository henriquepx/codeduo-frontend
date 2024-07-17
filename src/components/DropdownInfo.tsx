import React from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaTiktok, FaGithub, FaEnvelope, FaGlobe } from 'react-icons/fa';
import { IoIosClose, IoLogoWhatsapp } from "react-icons/io";

interface DropdownInfoProps {
  onClose: () => void;
}

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
  background: #ffffff;
  border: 2px solid #ddd;
  border-radius: 15px;
  padding: 1rem;
  width: 80%;
  max-width: 400px;
  z-index: 999;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 10px;
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
const HeaderDropdownInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    h1 {
        font-weight: 700;
        font-size: 1.2rem;
    }
`
const ButtonAside = styled.button`
  background: #ffffff; 
  color: #333;
  padding: 0.2rem;
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

const DropdownInfo: React.FC<DropdownInfoProps> = ({ onClose }) => {
    return (
        <ModalOverlay>
            <ModalContent>
                <HeaderDropdownInfo>
                    <h1>infos</h1>
                    <ButtonAside onClick={onClose}><IoIosClose style={{ color: '#333' }} size={32} /></ButtonAside>
                </HeaderDropdownInfo>
                <Description>Olá, me chamo Henrique.</Description>
                <Description>Codeduo é uma plataforma para desenvolvedores colaborarem em tempo real em salas de código. Os usuários podem criar salas, convidar amigos para programar juntos ou resolver desafios específicos. A interface intuitiva e responsiva facilita a experiência de codificação em grupo, tornando-a ideal para projetos em equipe e aprendizado colaborativo.</Description>
                <Description>Confira minhas redes sociais abaixo, envie uma mensagem e um feedback/crítica construtiva.</Description>

                <SocialLinks>
                    <Icon href="https://www.linkedin.com/in/henriquepinheiroxavier/" target="_blank">
                        <FaLinkedin />
                    </Icon>
                    <Icon href="https://github.com/henriquepx" target="_blank">
                        <FaGithub />
                    </Icon>
                    <Icon href="https://www.tiktok.com/@henriqqdev" target="_blank">
                        <FaTiktok />
                    </Icon>
                    <Icon href="https://henriquepx.vercel.app/" target="_blank">
                        <FaGlobe />
                    </Icon>
                    <Icon href="mailto:henriquepinheiroxavier@gmail.com" target="_blank">
                        <FaEnvelope />
                    </Icon>
                    <Icon href="https://api.whatsapp.com/send?phone=5521964823939&text=Ol%C3%A1%2C%20Henrique.%20Curti%20bastante%20o%20CodeDuo%2C%20gostaria%20de%20enviar%20uma%20mensagem%20sobre%3A%20" target="_blank">
                        <IoLogoWhatsapp />
                    </Icon>
                    </SocialLinks>

            </ModalContent>
        </ModalOverlay>
    );
};

export default DropdownInfo;
