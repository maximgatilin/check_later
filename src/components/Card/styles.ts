import styled, { keyframes } from 'styled-components';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';

export const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  width: 28px;
  height: 28px;
  padding-top: 3px;
  background: #ffffff80;
  border-radius: 100%;
  cursor: pointer;
  opacity: 0;
  transition: .3s ease;

  &:hover {
    background: #fff;
  }
`;

export const DeleteIcon = styled(CloseIcon)`
  width: 15px;
`;

export const Container = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};

  &:hover {
    ${DeleteButton} {
      opacity: 1;
    }
  }
`;

export const Image = styled.img`
  display: block;
  width: 100%;
`;

export const Content = styled.div`
  padding: 10px 10px;
  background: #fffdfd;
  font-weight: 500;
  line-height: 1.4;
  color: black;
  @media (prefers-color-scheme: dark) {
    background: #576574;
    color: #ff9f43;
  };
`;

const pulse = keyframes`
  from { transform: scale(0.9); }
  to { transform: scale(1.1); }
`;

export const LoaderWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 35px;
  animation: ${pulse} .75s infinite ease-in-out alternate;
`;
