import axios from 'axios';

type GenerationRequestAPIResponse = {
  data: {
    status: string,
    uuid: string,
  }
}

class Kandinsky {
  private apiKey;
  private apiSecret;
  private baseUrl = "https://api-key.fusionbrain.ai/key/api/v1";
  public modelId: string | null;

  constructor({ apiKey, apiSecret }: { apiKey: string, apiSecret: string }) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.modelId = null;
  }

  async init () {
    this.modelId = await this.getModelId();
  }

  generateAuthHeaders() {
    const headers = new Headers();
    headers.append("X-Key", `Key ${this.apiKey}`);
    headers.append("X-Secret", `Secret ${this.apiSecret}`);
    return headers;
  }

  async getModelId () {
    if (this.modelId) {
      return this.modelId;
    }
    const headers = this.generateAuthHeaders();

    const requestOptions = {
      method: 'GET',
      headers,
    };

    const response = await fetch(`${this.baseUrl}/models`, requestOptions).then(response => response.json());
    return response[0].id;
  }

  async requestImageGeneration(prompt: string): Promise<GenerationRequestAPIResponse> {
    // here we're using axios lib because it doesn't work with native fetch API
    // native fetch API has issues with constructing blobs for multipart/form-data
    const modelId = await this.getModelId();
    const headers = Object.fromEntries(this.generateAuthHeaders());

    const params = {
      "type": "GENERATE",
      "width": 256,
      "style": "KANDINSKY",
      "height": 256,
      "generateParams": {
        "query": prompt
      }
    };
    const paramsAsBlob = new Blob([JSON.stringify(params)], {type: 'application/json'});
    const formdata = new FormData();
    formdata.append("model_id", modelId);
    formdata.append("params", paramsAsBlob);

    return axios.post(`${this.baseUrl}/text2image/run`, formdata, {
      headers: {
        ...headers,
        "Content-Type": 'multipart/form-data',
      },
    });
  }

  async getImageById(id: string): Promise<string> {
    const headers = this.generateAuthHeaders();
    const requestOptions = {
      method: 'GET',
      headers,
    };
    const response = await fetch(`${this.baseUrl}/text2image/status/${id}`, requestOptions).then(res => res.json());
    if (response.status === 'DONE') {
      return Promise.resolve(`data:image/png;base64, ${response.images[0]}`);
    } else {
      await new Promise(resolve => setTimeout(resolve, 3000));
      return this.getImageById(id);
    }
  }

  async generateImage (prompt: string): Promise<string> {
    const imageMetaData = await this.requestImageGeneration(prompt);
    const imageId = imageMetaData.data.uuid;
    return this.getImageById(imageId);
  }
}

export default Kandinsky;