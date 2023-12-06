import React, { PropsWithChildren } from 'react';
import * as S from './styles';

export function CardList({ children }: PropsWithChildren): React.ReactElement{
  return (
    <S.Container>
      {children}
    </S.Container>
  );
}
