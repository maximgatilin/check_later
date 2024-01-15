import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Kandinsky from '../utils/integrations/Kandinsky';
import { ContentEntity } from '../utils/sharedTypes';

const imageApi = new Kandinsky({
  apiKey: '10A9F5AEC38A9AFE37DCD88C1456966C',
  apiSecret: '87549F254C4DCD29ECEAF595CB25866A',
});

imageApi.init();

export const generateImage = createAsyncThunk(
  'imageGeneration/generate',
  async (item: ContentEntity) => {
    const image = await imageApi.generateImage(item.name);
    return {
      image,
      id: item.id,
    };
  },
);

export type IdsProgressType = {
  [key: string]: 'scheduled' | 'pending' | 'generated' | 'failed';
};

interface ImageGenerationState {
  statusById: IdsProgressType;
}

const initialState = {
  statusById: {},
} as ImageGenerationState;

export const imageGenerationSlice = createSlice({
  name: 'imageGeneration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(generateImage.pending, (state, action) => {
      const { id } = action.meta.arg;
      state.statusById[id] = 'pending';
    });
    builder.addCase(generateImage.fulfilled, (state, action) => {
      const { id } = action.meta.arg;
      state.statusById[id] = 'generated';
    });
    builder.addCase(generateImage.rejected, (state, action) => {
      const { id } = action.meta.arg;
      state.statusById[id] = 'failed';
    });
  },
});

export default imageGenerationSlice.reducer;
