import React from 'react';
import styled from 'styled-components';
import Logo from '/logo.svg';
import GoogleIcon from '../assets/image.png';
import { useForm, SubmitHandler } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import * as z from 'zod';
import axios from 'axios';

const FormContainer = styled.form`
  max-width: 350px;
  margin: 0 auto;
  width: 100%;
  padding: 1rem; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; 
  gap: 5px; 
  label {
    font-weight: bold;
    margin-right: auto;
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
`;
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
  padding: .8rem 0;
  border-radius: 10px;
  img {
    width: 17px;
  }
  p {
    font-family: 'Montserrat', sans-serif;
    font-size: .8rem;
    color: #000;
  }
`;
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
`;
const ErrorForm = styled.p`
  color: red;
  font-size: .8rem;
`

const loginSchema = z.object({
  email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres').nonempty('Senha é obrigatória'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Form = () => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),

  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      setError(false);
      setLoading(true);
      const response = await axios.post('https://codeduo-backend.onrender.com/api/auth/signin', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      setLoading(false);
      navigate('/dashboard');
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error(error);
    }
  };


  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <LogoProject src={Logo} alt="logo" />
      <FormInputContainer>
        <label htmlFor="email">Email*</label>
        <input type="email" id='email' placeholder='Enter your email' {...register('email')} />
        {errors.email && <ErrorForm>{errors.email.message}</ErrorForm>}
        
        <label htmlFor="password">Senha*</label>
        <input type="password" id='password' placeholder='Enter your password' {...register('password')} />
        {errors.password && <ErrorForm>{errors.password.message}</ErrorForm>}
        
        <ContainerResetCheckbox>
          <div>
            <input type="checkbox" id='checkbox' />
            <label htmlFor="checkbox">Lembrar-se</label>
          </div>
          <a>Esqueci a senha</a>
        </ContainerResetCheckbox>
        
        <Button type="submit">{loading ? 'Carregando...' : 'Entrar'}</Button>

        {error && <ErrorForm>Erro ao realizar o login.</ErrorForm>}
        
        <Divider><span>ou</span></Divider>
        
        <LoginWithGoogle href="#">
          <img src={GoogleIcon} alt="Ícon do Google" />
          <p>Continuar com Google</p>
        </LoginWithGoogle>
        
        <Register>Não tem uma conta? <Link to="/register">Registre-se</Link></Register>
      </FormInputContainer>
    </FormContainer>
  );
}

export default Form;
