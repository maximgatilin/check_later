import { ContentEntity } from '../../utils/sharedTypes';
import * as S from './styles';
import FallbackImage from './components/FallbackImage/FallbackImage';
import { ReactComponent as LoadingIcon } from '../../icons/party.svg'

// todo action_type should be actionType

interface CardProps extends ContentEntity {
  isImageGenerationInProgress: boolean;
}

export function Card({ image, name, action_type, isImageGenerationInProgress } : CardProps) {
  return (
    <S.Container>
      {image ? <S.Image src={image} /> : <FallbackImage action_type={action_type} />}
      {isImageGenerationInProgress && (
        <S.LoaderWrapper>
          <LoadingIcon />
        </S.LoaderWrapper>
      )}
      <S.Content>
        {name}
      </S.Content>
    </S.Container>
  );
}
