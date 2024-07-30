import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const DropdownContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 10px;
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 80px;
  z-index: 1000;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: #f5f5f5; 
  border-bottom: 1px solid #e0e0e0;
  border-radius: 50%; 
  width: 40px;
  height: 40px;
  position: relative;
  margin: 0 auto;
  margin-top: 1rem;
`;

const CloseIcon = styled(FaTimes)`
  color: #333; 
  font-size: 20px;
  cursor: pointer;
  position: absolute;
`;

const AvatarList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: center; /* Center align the avatars */
`;

const AvatarOption = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

interface DropdownProfileProps {
  avatars: string[];
  onSelect: (avatar: string) => void;
}

const DropdownAvatar: React.FC<DropdownProfileProps> = ({ avatars, onSelect }) => {
  return (
    <DropdownContainer>
      <Header>
        <CloseIcon onClick={() => onSelect('')} />
      </Header>
      <AvatarList>
        {avatars.map((avatar, index) => (
          <AvatarOption
            key={index}
            src={avatar}
            onClick={() => onSelect(avatar)}
            alt={`Avatar ${index + 1}`}
          />
        ))}
      </AvatarList>
    </DropdownContainer>
  );
};

export default DropdownAvatar;
