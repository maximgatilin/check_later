import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 30px;
  padding: 20px;
`;

export default function CardList({ children }: PropsWithChildren) {
  return (
    <Container>
      {children}
    </Container>
  );
}
