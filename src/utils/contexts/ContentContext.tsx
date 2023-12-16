import {
  useState,
  useMemo,
  useEffect,
  useCallback,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction
} from 'react';
import { initialItems } from '../../mocks/initialItems';
import DataService from '../../services/dataService';
import generateRandomId from '../functions/generateRandomId';
import useContentImagesGenerator, { IdsProgressType } from '../hooks/useContentImagesGenerator';
import { ActionType, ContentEntity } from '../sharedTypes';

type NewContentItem = Pick<ContentEntity, 'name'>

interface ContentContextType {
  allItems: ContentEntity[];
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
  filteredItems: ContentEntity[];
  addContentItem: (newContentItem: NewContentItem) => string;
  imageGenerationIdsInProgress: IdsProgressType;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}

interface ContentProviderProps {
  children: ReactNode;
}

const dataService = new DataService({key: 'check_later_items', default: initialItems});

export function ContentProvider({ children }: ContentProviderProps) {
  const [items, setItems] = useState<ContentEntity[]>(dataService.getAll());
  const [selectedTab, setSelectedTab] = useState<string>('watch');
  const filteredItems = useMemo(() => {
      return items.filter((i) => i.actionType === selectedTab);
    }, [items, selectedTab]);

  useEffect(() => {
    dataService.setAll(items);
  }, [items]);
  

  const { generateContentImage, idsInProgress } = useContentImagesGenerator();

  const addContentItem = useCallback(({ name }: NewContentItem) => {
    const id = generateRandomId();
    const actionType = selectedTab as ActionType;
    const newItem = {id, name, actionType };
    setItems([
      ...items,
      newItem,
    ]);

    const generateImage = async () => {
      const updatedItem = await generateContentImage(newItem);
      setItems(prevState => prevState.map(item => {
        return updatedItem.id === item.id ? updatedItem : item;
      }));
    }

    generateImage();

    return id;
  }, [items, setItems, generateContentImage, selectedTab]);

  return (
    <ContentContext.Provider
      value={{
        allItems: items,
        filteredItems,
        selectedTab,
        setSelectedTab,
        addContentItem,
        imageGenerationIdsInProgress: idsInProgress,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}
