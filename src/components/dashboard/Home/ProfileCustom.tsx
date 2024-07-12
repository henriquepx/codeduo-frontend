import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../../firebase';

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
  const currentUser = useSelector((state: RootState) => state.user.currentUser) as { profilePicture: string, username: string, email: string } | null;

  const fileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  
  console.log(imageError);
  console.log(imagePercent);

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
      });
    (error: Error) => {
        setImageError(true);
        console.log(error);
    }
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      })
    }
  };

  return (
    <ProfileCustomContainer>
      <ProfileCustomContent>
        <h1>Atualizar Perfil</h1>
        <Input type="file" ref={fileRef} hidden accept='image/*' onChange={(e) => setImage(e.target.files?.[0] || undefined)} />
        <ProfilePhotoCustom src={currentUser.profilePicture} onClick={() => fileRef.current?.click()} alt="Profile photo" />
        <Input defaultValue={currentUser.username} type="text" id='username' placeholder='Username' />
        <Input defaultValue={currentUser.email} type="email" id='email' placeholder='Email' />
        <Input type="password" id='password' placeholder='Password' />
        <Button>Update</Button>
        <Button onClick={onClose}>Fechar</Button>
        <DangerButton>Delete account</DangerButton>
        <DangerButton>Sign out</DangerButton>
      </ProfileCustomContent>
    </ProfileCustomContainer>
  );
};

export default ProfileCustom;
