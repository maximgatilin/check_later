import styled from 'styled-components';
import { ContentEntity } from '../../../../utils/sharedTypes';
import { ReactComponent as BookIcon } from '../../../../icons/book.svg';
import { ReactComponent as VideoIcon } from '../../../../icons/video.svg';

type Props = Pick<ContentEntity, 'actionType'>;

const Container = styled.div`
  background: ${({ theme }) => theme.colors.accent}7f;
  padding: 15px;
`;

export default function FallbackImage({ actionType } : Props) {
  return (
    <Container>
      {actionType === 'watch' && (
        <VideoIcon />
      )}
      {actionType === 'read' && (
        <BookIcon />
      )}
    </Container>
  );
}
