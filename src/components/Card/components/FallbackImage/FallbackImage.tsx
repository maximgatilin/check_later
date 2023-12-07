import { ContentEntity } from '../../../../utils/sharedTypes';
import * as S from './styles';
import { ReactComponent as BookIcon } from '../../../../icons/book.svg';
import { ReactComponent as VideoIcon } from '../../../../icons/video.svg';

type Props = Pick<ContentEntity, 'action_type'>

export default function FallbackImage({ action_type } : Props) {
  return (
    <S.Container>
      {action_type === 'watch' && (
        <VideoIcon />
      )}
      {action_type === 'read' && (
        <BookIcon />
      )}
    </S.Container>
  );
}
