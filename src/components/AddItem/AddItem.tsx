import { useState, useRef, useMemo } from 'react';
import useClickOutside from '../../utils/hooks/useClickOutside';
import { ActionType } from '../../utils/sharedTypes';
import * as S from './styles';

interface AddItemProps {
  onAdd: ({ name }: { name: string }) => void;
  actionType: ActionType;
}

export default function AddItem({ onAdd, actionType }: AddItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editorText, setEditorText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null!);
  const containerRef = useRef(null!);

  const closeEditor = () => {
    setEditorText('');
    setIsEditing(false);
  };

  useClickOutside(containerRef, closeEditor);

  const placeholder = useMemo(() => {
    let verb = 'сделать';
    if (actionType === 'read') {
      verb = 'почитать';
    }
    if (actionType === 'watch') {
      verb = 'посмотреть';
    }

    return `Чтобы вы хотели ${verb}?`;
  }, [actionType]);

  return (
    <S.Container $isEditing={isEditing} ref={containerRef}>
      <S.AddButton
        $visible={!isEditing}
        type="button"
        onClick={() => {
          setIsEditing(true);
          inputRef.current.focus();
        }}
      >
        +
      </S.AddButton>
      <S.InputBox
        placeholder={placeholder}
        ref={inputRef}
        $visible={isEditing}
        value={editorText}
        onChange={(e) => setEditorText(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Escape') {
            closeEditor();
          }
          if (e.key === 'Enter') {
            onAdd({
              name: editorText,
            });
            closeEditor();
          }
        }}
      />
    </S.Container>
  );
}
