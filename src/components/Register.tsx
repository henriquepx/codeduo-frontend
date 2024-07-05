import styled from 'styled-components';
import Logo from '/logo.svg';
import { GoArrowLeft } from "react-icons/go";
interface RegisterFormProps {
    toggleForm: () => void;
}
  
const FormContainer = styled.form`
  width: 100%;
  padding: 1rem; 

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
`;
const HeaderRegister = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    div {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: bold;
    }
`
const GoBackAnchor = styled.a`
    color: #000;
    text-decoration: none;
    &:visited {
        color: #000;
    }
`
const FormInputContainer = styled.div`
max-width: 350px;
margin: 0 auto;
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
    margin-bottom: .7rem;
  }
`;
const LogoProject = styled.img`
  width: 150px;
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

const BackToLoginDiv = styled.div`
   p {
    text-align: center;
    a {
        font-weight: 700;
        &:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }
   }
`

const RegisterForm: React.FC<RegisterFormProps> = ({ toggleForm }) => {
    return (
        <FormContainer>
            <HeaderRegister>
                <div>
                    <GoArrowLeft />
                    <GoBackAnchor href="#" onClick={toggleForm}>Go back</GoBackAnchor>
                </div>
                <LogoProject src={Logo} alt="logo" /> 
            </HeaderRegister>
            <FormInputContainer>
                <label htmlFor="nome">Name</label>
                <input type="text" id='nome' placeholder='Enter your name' />
                <label htmlFor="sobrenome">Last name</label>
                <input type="text" id='sobrenome' placeholder='Enter your last name' />
                <label htmlFor="email">Email</label>
                <input type="email" id='email' placeholder='Enter your email' />
                <label htmlFor="email">Confirm your email</label>
                <input type="email" id='email' placeholder='Confirm your email' />
                <label htmlFor="password">Password</label>
                <input type="password" id='password' placeholder='Enter your password' />
                <Button onClick={(e) => e.preventDefault()}>Criar conta</Button> 
            </FormInputContainer>
            <BackToLoginDiv>
                <p>Alrady have a login? <a onClick={toggleForm}>Sign in</a></p>
            </BackToLoginDiv>
        </FormContainer>
    )
}

export default RegisterForm;
