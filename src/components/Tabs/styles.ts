import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 2px solid ${(props) => props.theme.colors.outline};
  padding: 0 20px;
  font-size: 16px;
  font-weight: 500;
`;

export interface ITab {
  $active?: boolean;
}

export const Tab = styled.div<ITab>`
  padding: 5px 10px;
  cursor: pointer;
  position: relative;
  ${({ $active, theme }) => css`
      &:before {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 2px;
        background: ${theme.colors.accent};
        opacity: ${$active ? 1 : 0};
        transition: .3s ease;
      }
    `};
`;
