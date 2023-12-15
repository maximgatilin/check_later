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
import { ContentEntity } from '../sharedTypes';

type NewContentItem = Pick<ContentEntity, 'name' | 'action_type'>

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

interface ThemeProviderProps {
  children: ReactNode;
}

const dataService = new DataService({key: 'check_later_items', default: initialItems});

export function ContentProvider({ children }: ThemeProviderProps) {
  const [items, setItems] = useState<ContentEntity[]>(dataService.getAll());
  const [selectedTab, setSelectedTab] = useState<string>('watch');
  const filteredItems = useMemo(() => {
      return items.filter((i) => i.action_type === selectedTab);
    }, [items, selectedTab]);

  useEffect(() => {
    dataService.setAll(items);
  }, [items]);
  

  const { generateContentImage, idsInProgress } = useContentImagesGenerator();

  const addContentItem = useCallback(({ name, action_type }: NewContentItem) => {
    const id = generateRandomId();
    const newItem = {id, name, action_type };
    setItems([
      ...items,
      newItem,
    ]);

    const generateImage = async () => {
      // todo instead of passing entire item, we pass id and text and wait for result
      // once result is available - we try to update necessary item via map through all items
      const updatedItem = await generateContentImage(newItem);
      setItems(prevState => prevState.map(item => {
        return updatedItem.id === item.id ? updatedItem : item;
      }));
    }

    generateImage();

    return id;
  }, [items, setItems, generateContentImage]);

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
