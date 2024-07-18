import Form from '../../components/Form';
import { FormContainer, LoginPageContainer, PhotosSlider } from './Login.style.ts';

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
