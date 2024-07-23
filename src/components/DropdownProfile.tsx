import React, { useRef, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { IoIosClose } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import axios from 'axios';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from '../redux/user/userSlice';

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
  max-width: 450px;
  z-index: 999;
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
`;
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
const Button = styled.button`
  background: #ffffff;
  color: #333;
  padding: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 15px;
  cursor: pointer;
  transition: background 0.3s, border-color 0.3s;
  width: calc(100% - 1rem);
  &:hover {
    background: #f1f1f1;
    border-color: #bbb;
  }
`;
const ButtonSignOut = styled(Button)`
  background: #ffffff;
  color: #333;
  border: 1px solid #000000;
  &:hover {
    background: #000000;
    border-color: #bbb;
    color: #ffffff;
  }
`;
const ButtonDelete = styled(Button)`
  background: #ffffff;
  color: #333;
  border: 1px solid #ff0000;
  &:hover {
    background: #ff0000;
    border-color: #bbb;
  }
`;
const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #333;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
const StyledInput = styled.input`
  width: calc(100% - 1rem);
  margin: 0.5rem 0;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007BFF;
    outline: none;
  }
`;
const ImageProfile = styled.img`
  width: 100px;
`
const DivSeparateDeleteSignOut = styled.div`
  display: flex;
  gap: 10px;
  width: calc(100% - 1rem);
  margin: 1rem 0;
`

interface UserState {
  currentUser: {
    _id: string;
    profilePicture: string;
    username: string;
    email: string;
  };
  loading: boolean;
  error: string | null;
}

const DropdownProfile: React.FC<DropdownInfoProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imagePercent, setImagePercent] = useState<number>(0);
  const [imageError, setImageError] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);

  const { currentUser, loading } = useSelector((state: { user: UserState }) => state.user);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        setImagePercent(Math.round(progress));
      },
      () => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevData) => ({ ...prevData, profilePicture: downloadURL }));
        });
      }
    );
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const { data } = await axios.put(
        `https://codeduo-backend.onrender.com/api/user/update/${currentUser._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log('Received response:', data);
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        dispatch(updateUserFailure(err.message));
        console.error('Error updating user:', err.message);
      } else {
        dispatch(updateUserFailure('An unknown error occurred'));
      }
    }
  };
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const { data } = await axios.delete(`https://codeduo-backend.onrender.com/api/user/delete/${currentUser._id}` ,
        { withCredentials: true }
      );
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(deleteUserFailure(err.message));
      } else {
        dispatch(deleteUserFailure('An unknown error occurred'));
      }
    }
  };
  const handleSignOut = async () => {
    try {
      await axios.get('https://codeduo-backend.onrender.com/api/auth/signout',
        { withCredentials: true }
      );
      dispatch(signOut());
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('An unknown error occurred');
      }
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <HeaderDropdownInfo>
          <h1>Update Profile</h1>
          <ButtonAside onClick={onClose}><IoIosClose style={{ color: '#333' }} size={32} /></ButtonAside>
        </HeaderDropdownInfo>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type='file'
              ref={fileRef}
              hidden
              accept='image/*'
              onChange={(e: ChangeEvent<HTMLInputElement>) => setImage(e.target.files ? e.target.files[0] : undefined)}
            />
            <ImageProfile
              src={formData.profilePicture || currentUser.profilePicture}
              alt='Profile'
              onClick={() => fileRef.current?.click()}
            />
            <p>
              {imageError ? (
                <span>Error uploading image (file size must be less than 2 MB)</span>
              ) : imagePercent > 0 && imagePercent < 100 ? (
                <span>{`Uploading: ${imagePercent} %`}</span>
              ) : imagePercent === 100 ? (
                <span>Image uploaded successfully</span>
              ) : (
                ''
              )}
            </p>
            <StyledInput
              defaultValue={currentUser.username}
              type='text'
              id='username'
              placeholder='Username'
              onChange={handleChange}
            />
            <StyledInput
              defaultValue={currentUser.email}
              type='email'
              id='email'
              placeholder='Email'
              onChange={handleChange}
            />
            <StyledInput
              type='password'
              id='password'
              placeholder='Password'
              onChange={handleChange}
            />
            <Button>
              {loading ? <Spinner /> : 'Update'}
            </Button>
          </form>
          <DivSeparateDeleteSignOut>
            <ButtonDelete onClick={handleDeleteAccount}>
              Delete
            </ButtonDelete>
            <ButtonSignOut onClick={handleSignOut}>
              Sign out
            </ButtonSignOut>
          </DivSeparateDeleteSignOut>
          <p>{updateSuccess && 'User is updated successfully!'}</p>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DropdownProfile;
