import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../../firebase';
import { updateUserFailure, updateUserStart, updateUserSuccess, deleteUserStart, deleteUserFailure, deleteUserSuccess, signOut } from '../../../redux/user/userSlice';

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
  padding: 30px;
  border-radius: 10px;
  max-width: 500px; 
  width: 100%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
`;
const ProfilePhotoCustom = styled.img`
  cursor: pointer;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 10px;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #cacaca;
  border-radius: 5px;
  font-size: 1rem;
`;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;
const DangerButton = styled(Button)`
  background-color: #DC3545;
  &:hover {
    background-color: #c82333;
  }
`;

interface ProfileCustomProps {
  onClose: () => void;
}

const ProfileCustom: React.FC<ProfileCustomProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser) as { profilePicture: string, username: string, email: string, _id: string } | null;
  const fileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({ profilePicture: currentUser?.profilePicture || '' });

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  if (!currentUser) {
    return null;
  }

  const handleFileUpload = async (image: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error: Error) => {
        setImageError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) return; 
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProfileCustomContainer>
      <ProfileCustomContent>
        <h1>Atualizar Perfil</h1>
        <form onSubmit={handleSubmit} action="">
          <Input type="file" ref={fileRef} hidden accept='image/*' onChange={(e) => setImage(e.target.files?.[0] || undefined)} />
          <ProfilePhotoCustom src={formData.profilePicture || currentUser.profilePicture} onClick={() => fileRef.current?.click()} alt="Profile photo" />
          {imageError ? <p>Erro ao carregar imagem</p> : ( imagePercent > 0 ? <p>Carregando imagem... {imagePercent}%</p> : null)}
          <Input defaultValue={currentUser.username} type="text" id='username' placeholder='Username' />
          <Input defaultValue={currentUser.email} type="email" id='email' placeholder='Email' onChange={handleChange} />
          <Input type="password" id='password' placeholder='Password' onChange={handleChange} />
          <Button>Atualizar</Button>
          <Button onClick={onClose}>Fechar</Button>
          <DangerButton onClick={handleDeleteAccount}>Delete account</DangerButton>
          <DangerButton onClick={handleSignOut}>Sign out</DangerButton>
        </form>
      </ProfileCustomContent>
    </ProfileCustomContainer>
  );
};

export default ProfileCustom;
