import styled from 'styled-components';

const ProfileCustomContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ProfileCustomContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 80%; 
`;

interface ProfileCustomProps {
  onClose: () => void;
}

const ProfileCustom: React.FC<ProfileCustomProps> = ({ onClose }) => {
    return (
      <ProfileCustomContainer>
        <ProfileCustomContent>
          <h1>teste</h1>
          <p>aqui</p>
          <p>vou</p>
          <p>mudar</p>
          <button onClick={onClose}>Fechar</button>
        </ProfileCustomContent>
      </ProfileCustomContainer>
    );
  };
  

export default ProfileCustom;
