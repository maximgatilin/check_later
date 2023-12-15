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
  public modelId: string | null;

  constructor({ apiKey, apiSecret }: { apiKey: string, apiSecret: string }) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.modelId = null;
  }

  async init () {
    this.modelId = await this.getModelId();
  }

  async getModelId () {
    if (this.modelId) {
      return this.modelId;
    }
    const headers = new Headers();
    headers.append("X-Key", `Key ${this.apiKey}`);
    headers.append("X-Secret", `Secret ${this.apiSecret}`);

    const requestOptions = {
      method: 'GET',
      headers: headers,
    };

    const response = await fetch("https://api-key.fusionbrain.ai/key/api/v1/models", requestOptions).then(response => response.json());
    return response[0].id;
  }

  async generateImage (prompt: string) {
    const modelId = await this.getModelId();
    const headers = new Headers();
    // todo move headers generation to the internal method
    headers.append("X-Key", `Key ${this.apiKey}`);
    headers.append("X-Secret", `Secret ${this.apiSecret}`);
    headers.append("Content-Type", "multipart/form-data");
    const params = {
      "type": "GENERATE",
      "width": 256,
      "style": "KANDINSKY",
      "height": 256,
      "generateParams": {
        "query": prompt
      }
    }

    const dto_object = new Blob([JSON.stringify(params)], {type: 'application/json'})
    const modelIdData = { value: modelId, options: { contentType: undefined }};

    const formdata = new FormData();
    formdata.append("model_id", modelIdData.value);
    formdata.append("params", dto_object);

    // todo url should be also a variable
    // todo get rid of axios and just use fetch api
    const generationRequest: GenerationRequestAPIResponse = await axios.post("https://api-key.fusionbrain.ai/key/api/v1/text2image/run", formdata, {
      headers: {
        "X-Key": `Key ${this.apiKey}`,
        "X-Secret": `Secret ${this.apiSecret}`,
        "Content-Type": 'multipart/form-data',
      },
    });
    const generationRequestId = generationRequest.data.uuid;

    // todo refactor code here
    const maxAttempts = 10;
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const headers = new Headers();
        headers.append("X-Key", `Key ${this.apiKey}`);
        headers.append("X-Secret", `Secret ${this.apiSecret}`);

        const requestOptions = {
          method: 'GET',
          headers,
        };
        const response = await fetch(`https://api-key.fusionbrain.ai/key/api/v1/text2image/status/${generationRequestId}`, requestOptions).then(response => response.json())
          if (response.status === 'DONE') {
            return `data:image/png;base64, ${response.images[0]}`;
          }
          await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (error) {
        console.error(error);
      }
    }
  }
}

export default Kandinsky;