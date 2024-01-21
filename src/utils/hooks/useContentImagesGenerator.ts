import { useState, useCallback } from 'react';
import Kandinsky from '../integrations/Kandinsky';
import { ContentEntity } from '../sharedTypes';

export type IdsProgressType = {
  [key: string]: boolean;
};

type HookOutput = {
  generateContentImage: (item: ContentEntity) => Promise<ContentEntity>;
  idsInProgress: IdsProgressType;
};

const imageApi = new Kandinsky({
  apiKey: process.env.REACT_APP_KANDINSKY_API_KEY,
  apiSecret: process.env.REACT_APP_KANDINSKY_API_SECRET,
});

imageApi.init();

export default function useContentImagesGenerator(): HookOutput {
  const [idsInProgress, setIdsInProgress] = useState<IdsProgressType>({});
  const generateContentImage = useCallback(async (item: ContentEntity): Promise<ContentEntity> => {
    setIdsInProgress({
      ...idsInProgress,
      [item.id]: true,
    });
    const image = await imageApi.generateImage(item.name);
    setIdsInProgress({
      ...idsInProgress,
      [item.id]: false,
    });
    return {
      ...item,
      image,
    };
  }, [idsInProgress, setIdsInProgress]);

  return {
    generateContentImage,
    idsInProgress,
  };
}
