import { ContentEntity } from '../../../../utils/sharedTypes';
import * as S from './styles';
import { ReactComponent as BookIcon } from '../../../../icons/book.svg';
import { ReactComponent as VideoIcon } from '../../../../icons/video.svg';

type Props = Pick<ContentEntity, 'actionType'>

export default function FallbackImage({ actionType } : Props) {
  return (
    <S.Container>
      {actionType === 'watch' && (
        <VideoIcon />
      )}
      {actionType === 'read' && (
        <BookIcon />
      )}
    </S.Container>
  );
}
