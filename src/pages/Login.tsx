import React from 'react';
import styled from 'styled-components';
import BackgroundImage from '../assets/img2.jpg';
import Form from '../components/Form';

const LoginPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 98vh;
`;

const FormContainer = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
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
  border-radius: 25px;
  @media (max-width: 650px) {
    display: none;
  }
`;

const TextContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  max-width: 90%;
  text-align: left;

  a {
    color: #ffffff;
    text-decoration: underline;
    margin-bottom: 10px;
    display: block;
  }
  p {
    font-size: 1.2rem;
    margin: 0;
  }
`;

const Login: React.FC = () => {
  return (
    <LoginPageContainer>
      <PhotosSlider>
        <TextContainer>
          <a href="https://linkproject1.com" target="_blank" rel="noopener noreferrer">
            linkproject1.com
          </a>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero impedit nam laudantium aliquid quaerat itaque dignissimos, asperiores soluta deleniti dolore nihil praesentium fugit magni. Eaque, tenetur expedita.</p>
        </TextContainer>
      </PhotosSlider>
      <FormContainer>
          <Form />
      </FormContainer>
    </LoginPageContainer>
  );
};

export default Login;
