import { useState, useCallback } from "react";
import Kandinsky from "../integrations/Kandinsky";
import { ContentEntity } from "../sharedTypes"

type IdsProgress = {
  [key: string]: boolean;
}

type HookOutput = {
  generateContentImage: (item: ContentEntity) => Promise<ContentEntity>;
  idsInProgress: IdsProgress;
}

const imageApi = new Kandinsky({
  apiKey: '10A9F5AEC38A9AFE37DCD88C1456966C',
  apiSecret: '87549F254C4DCD29ECEAF595CB25866A',
});

imageApi.init();

export default function useContentImagesGenerator(): HookOutput {
  const [idsInProgress, setIdsInProgress] = useState<IdsProgress>({});
  const generateContentImage = useCallback(async (item: ContentEntity): Promise<ContentEntity> => {
    setIdsInProgress({
      ...idsInProgress,
      [item.id]: true
    });
    const image = await imageApi.generateImage(item.name);
    return {
      ...item,
      image,
    };
  }, [idsInProgress, setIdsInProgress])

  return {
    generateContentImage,
    idsInProgress,
  }
}