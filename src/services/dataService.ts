type DataServiceInput = {
  key: string;
  default: any;
}

class DataService {
  key: string;
  default: any;

  constructor(input: DataServiceInput) {
    this.key = input.key;
    this.default = input.default;
  }

  getAll() {
    const data = window.localStorage.getItem(this.key);
    return data ? JSON.parse(data) : this.default;
  }

  setAll(data: any) {
    window.localStorage.setItem(this.key, JSON.stringify(data));
  }
}

export default DataService;