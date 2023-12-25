import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
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
