import { PropsWithChildren } from 'react';
import * as S from './styles';

export function CardList({ children }: PropsWithChildren) {
  return (
    <S.Container>
      {children}
    </S.Container>
  );
}
