import React from 'react';
import { ContentEntity } from '../../utils/sharedTypes';
import * as S from './styles';

export function Card({ image, name } : ContentEntity): React.ReactElement{
  return (
    <S.Container>
      {image ? <S.Image src={image} /> : null}
      <S.Content>
        {name}
      </S.Content>
    </S.Container>
  );
}
