import { ContentEntity } from '../../utils/sharedTypes';
import * as S from './styles';
import FallbackImage from './components/FallbackImage/FallbackImage';
import { ReactComponent as LoadingIcon } from '../../icons/party.svg';

interface CardProps extends ContentEntity {
  isImageGenerationInProgress: boolean;
}

export default function Card({
  image, name, actionType, isImageGenerationInProgress,
} : CardProps) {
  return (
    <S.Container>
      {image ? <S.Image src={image} /> : <FallbackImage actionType={actionType} />}
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
