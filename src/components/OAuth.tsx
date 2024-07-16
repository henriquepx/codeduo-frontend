import styled from 'styled-components';
import GoogleIcon from '../assets/image.png';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const LoginWithGoogle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  border: 1px solid #cacaca;
  padding: .8rem 0;
  border-radius: 10px;
  cursor: pointer;
  img {
    width: 17px;
  }
  p {
    font-family: 'Montserrat', sans-serif;
    font-size: .8rem;
    color: #000;
  }
`;
const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const { displayName, email, photoURL } = result.user;

      const response = await axios.post('https://codeduo-backend.onrender.com/api/auth/google', {
        name: displayName,
        email,
        photo: photoURL,
      });
      const data = response.data;
      console.log(data);
      console.log('Dispatching signInSucess');
      dispatch(signInSuccess(data));
      navigate('/home');
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  };

  return (
    <LoginWithGoogle type='button' onClick={handleGoogleClick}>
        <img src={GoogleIcon} alt="Ícon do Google" />
        <p>Continuar com Google</p>
    </LoginWithGoogle>
  )
}
export default OAuth