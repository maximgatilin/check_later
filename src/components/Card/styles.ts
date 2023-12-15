import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 230px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 13px 27px -5px rgba(50,50,93,.25), 0 8px 16px -8px rgba(0,0,0,.3), 0 -6px 16px -6px rgba(0,0,0,3%);
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
`;

const pulse = keyframes`
  from { transform: scale(0.9); }
  to { transform: scale(1.1); }
`

export const LoaderWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 35px;
  animation: ${pulse} .75s infinite ease-in-out alternate;
`;
