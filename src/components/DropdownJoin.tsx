import React, { ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { FaChevronRight } from 'react-icons/fa';
import { IoIosClose } from "react-icons/io";

interface DropdownJoinProps {
  roomCode: string;
  onClose: () => void;
  handleJoinRoom: () => void;
  handleRoomIdChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
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

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  font-size: 1rem;
`;

const ConfirmButton = styled.button`
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
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-weight: 700;
  padding: 0 0.5rem;
`;


const DropdownJoin: React.FC<DropdownJoinProps> = ({
  roomCode,
  onClose,
  handleJoinRoom,
  handleRoomIdChange,
  handleKeyDown,
}) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <p>join room</p>
          <IoIosClose onClick={onClose} size={40} style={{ cursor: 'pointer' }} />
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
  );
};

export default DropdownJoin;
