import styled from 'styled-components';
import { ReactComponent as GithubIcon } from '../../icons/github.svg';

export const Container = styled.div`
  padding: 10px 30px;
  font-size: 20px;
  text-align: center;
  position: relative;
`;

export const GithubLink = styled.a`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #000;

  @media (prefers-color-scheme: dark) {
    color: #ff9f43;
  };
`;

export function Intro() {
  return (
    <Container>
      Эх, когда-нибудь я найду время, чтобы...
      <GithubLink
        href="https://github.com/maximgatilin/check_later"
        aria-label="github link"
        target="_blank"
        rel="noreferrer"
      >
        <GithubIcon width="30px" />
      </GithubLink>
    </Container>
  );
}
