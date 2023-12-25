import styled, { css } from 'styled-components';

interface ContainerProps {
  $isEditing: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  overflow: hidden;
  min-height: 200px;
  border-radius: 12px;
  box-shadow: ${({ theme, $isEditing }) => ($isEditing ? theme.shadows.card : 'none')};
  transition: .15s ease;
  ${({ $isEditing }) => !$isEditing && css`
    transform: translate(0, 10px) scale(.9);
  `}
`;

interface AddButtonProps {
  $visible: boolean;
}

export const AddButton = styled.button<AddButtonProps>`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  margin-top: -25px;
  margin-left: -25px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  text-align: center;
  line-height: 48px;
  font-size: 40px;
  border: 0;
  background: #fff;
  color: #a6a6a6;
  border: 1px solid currentColor;
  cursor: pointer;
  transition: .15s ease;
  ${({ $visible }) => !$visible && css`
    opacity: 0;
    pointer-events: none;
  `}

  &:hover {
    color: #716b6b;
  }
`;

interface InputBoxProps {
  $visible: boolean;
}

export const InputBox = styled.textarea<InputBoxProps>`
  position: absolute;
  z-index: 1;
  inset: 0;
  border: none;
  outline: none;
  resize: none;
  padding: 10px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  line-height: 1.5;
`;
