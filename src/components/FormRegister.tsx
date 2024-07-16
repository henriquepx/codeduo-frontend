import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Icon from '/icon.png';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from './OAuth';

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
const Button = styled.button`
  width: 100%; 
  padding: 10px; 
  border-radius: 10px; 
  color: #fff;
  background-color: #000000;
  font-weight: bold;
  cursor: pointer;
  margin-top: .5rem;
`;
const Login = styled.p`
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
const ErrorForm = styled.p`
  color: red;
  font-size: 1rem;
  margin: .5rem 0;
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`

const registerSchema = z.object({
  username: z.string().min(5, 'Nome de usuário deve ter no mínimo 5 caracteres').nonempty('Nome de usuário é obrigatório'),
  email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
  password: z.string().min(7, 'Senha deve ter no mínimo 7 caracteres').nonempty('Senha é obrigatória'),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      setError(false);
      setLoading(true);
      console.log('cadastrando')
      const response = await axios.post('https://codeduo-backend.onrender.com/api/auth/signup', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error(error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <LogoContainer>
        <img src={Icon} alt="Logo Codeduo" />
        <h1>Codeduo</h1>
      </LogoContainer>
      <FormInputContainer>
        <label htmlFor="username">Nome de Usuário*</label>
        <input type="text" id='username' placeholder='Enter your username' {...register('username')} />
        {errors.username && <ErrorForm>{errors.username.message}</ErrorForm>}

        <label htmlFor="email">Email*</label>
        <input type="email" id='email' placeholder='Enter your email' {...register('email')} />
        {errors.email && <ErrorForm>{errors.email.message}</ErrorForm>}

        <label htmlFor="password">Senha*</label>
        <input type="password" id='password' placeholder='Enter your password' {...register('password')} />
        {errors.password && <ErrorForm>{errors.password.message}</ErrorForm>}
        
        <Button type="submit"> {loading ? 'Registrando...' : 'Registrar-se'}</Button>

        {error && <ErrorForm>Erro ao registrar-se</ErrorForm>}
        
        <Divider><span>ou</span></Divider>
        
        <OAuth />
        
        <Login>Já tem uma conta? <Link to="/">Entrar</Link></Login>
      </FormInputContainer>
    </FormContainer>
  );
}

export default RegisterForm;
