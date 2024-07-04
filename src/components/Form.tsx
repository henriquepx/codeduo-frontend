import styled from 'styled-components';
import Logo from '/logo.svg';
import GoogleIcon from '../assets/image.png';

const FormContainer = styled.form`
  max-width: 350px;
  margin: 0 auto;
  width: 100%;
  padding: 1rem; 

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 650px) {
    max-width: 600px;
  }
`;

const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; 
  gap: 5px; 

  label {
    font-weight: bold;
    margin-right : auto;
  }

  input {
    padding: 10px 0;
    border-radius: 5px; 
    border: 1px solid #eeeeee;
    padding-left: 1rem;
  }
`;

const LogoProject = styled.img`
  width: 170px;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  width: 100%; 
  padding: 10px; 
  border-radius: 10px; 
  color: #fff;
  background-color: #000000;
  font-weight: bold;
  cursor: pointer;
`;
const Register = styled.p`
  color: #000000;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-size: .9rem;
  text-align: center;
  margin: 1rem 0;
  a {
    font-weight: 700;
    color: #000000;
    &:hover {
      text-decoration: underline;
    }
    &:visited {
      color: #000000;
    }
  }
`
const Divider = styled.p`
  height: 1px;
  background-color: #cacaca;
  border: none;
  margin: 1.3rem 0;
  position: relative;
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background-color: #cacaca;
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }

  span {
    position: absolute;
    top: -13px;
    left: 53%;
    transform: translateX(-50%);
    background-color: #fff;
    padding: 0 10px;
    font-family: 'Montserrat', sans-serif;
    color: #cacaca;
  }
`;
const LoginWithGoogle = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  border: 1px solid #cacaca;
  padding: .2rem 0;
  border-radius: 10px;
  img {
    width: 17px;
  }
  p {
    font-family: 'Montserrat', sans-serif;
    font-size: .8rem;
    color: #000;
  }
`
const ContainerResetCheckbox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: .5rem 0rem 1rem 0rem;
  font-family: 'Montserrat', sans-serif;
  div {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 13px;
    label { 
      cursor: pointer;
      font-weight: 500;
    }
  }
  a {
    font-size: 13px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`
const Form = () => {
  return (
    <FormContainer>
      <LogoProject src={Logo} alt="logo" />
      <FormInputContainer>
        <label htmlFor="email">Email*</label>
        <input type="email" id='email' placeholder='Enter your email' />
        <label htmlFor="password">Senha*</label>
        <input type="password" id='password' placeholder='Enter your password' />

        <ContainerResetCheckbox>
            <div>
                <input type="checkbox" id='checkbox' />
                <label htmlFor="checkbox">Lembrar-se</label>
            </div>
            <a>Esqueci a senha</a>
            </ContainerResetCheckbox>
            <Button>Entrar</Button>
            <Divider><span>ou</span></Divider>
            <LoginWithGoogle href="#">
                <img src={GoogleIcon} alt="Ícon do Google" />
                <p>Continuar com Google</p>
        </LoginWithGoogle> 
        <Register>Não tem uma conta? <a href='#'>Registre-se</a></Register>
      </FormInputContainer>
    </FormContainer>
  )
}

export default Form
