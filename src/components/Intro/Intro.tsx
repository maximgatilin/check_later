import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px 30px;
  font-size: 20px;
  text-align: center;
`;

export function Intro() {
  return (
    <Container>
      Эх, когда-нибудь я найду время, чтобы...
    </Container>
  );
}
