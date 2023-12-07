import { ContentEntity } from '../../utils/sharedTypes';
import * as S from './styles';
import FallbackImage from './components/FallbackImage/FallbackImage';

export function Card({ image, name, action_type } : ContentEntity) {
  return (
    <S.Container>
      {image ? <S.Image src={image} /> : <FallbackImage action_type={action_type} />}
      <S.Content>
        {name}
      </S.Content>
    </S.Container>
  );
}
