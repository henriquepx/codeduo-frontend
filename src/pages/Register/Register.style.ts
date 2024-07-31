import styled from 'styled-components';
import BackgroundImage from '../../assets/wpp.png';

export const LoginPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 100dvh;
  padding: 1.5rem;
`;
export const FormContainer = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 650px) {
    width: 90%;
  }
`;
export const PhotosSlider = styled.div`
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