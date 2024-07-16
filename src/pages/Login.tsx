import styled from 'styled-components';
import BackgroundImage from '../assets/wpp.png';
import Form from '../components/Form';

const LoginPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 100vh;
  padding: 1.5rem;
`;
const FormContainer = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 650px) {
    width: 90%;
  }
`;
const PhotosSlider = styled.div`
  width: 55%;
  height: 100%;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  position: relative;
  margin-left: 1rem;
  border-radius: 25px;
  @media (max-width: 650px) {
    display: none;
  }
`;

const Login = () => {
  return (
    <LoginPageContainer>
      <PhotosSlider />
      <FormContainer>
        <Form />
      </FormContainer>
    </LoginPageContainer>
  );
};

export default Login;
