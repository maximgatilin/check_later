import { ContentEntity } from '../../utils/sharedTypes';
import * as S from './styles';
import FallbackImage from './components/FallbackImage/FallbackImage';
import { ReactComponent as LoadingIcon } from '../../icons/party.svg';

interface CardProps extends ContentEntity {
  isImageGenerationInProgress: boolean;
  onDelete: (id: string) => void;
}

export default function Card({
  id, image, name, actionType, isImageGenerationInProgress, onDelete,
} : CardProps) {
  return (
    <S.Container>
      <S.DeleteButton onClick={() => onDelete(id)}>
        <S.DeleteIcon />
      </S.DeleteButton>
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
