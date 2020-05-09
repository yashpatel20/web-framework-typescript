import axios, { AxiosPromise } from "axios";

interface hasID {
  id?: number;
}

export class Sync<T extends hasID> {
  constructor(public rootUrl: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;
    if (id) {
      //put
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      //post
      return axios.post(`${this.rootUrl}`, data);
    }
  }
}
