import FormRegister from '../../components/FormRegister';
import { FormContainer, LoginPageContainer, PhotosSlider } from './Register.style.ts';

const Login = () => {
  return (
    <LoginPageContainer>
      <PhotosSlider />
      <FormContainer>
        <FormRegister />
      </FormContainer>
    </LoginPageContainer>
  );
};

export default Login;
