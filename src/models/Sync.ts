import axios, { AxiosPromise } from "axios";

//interface to make sure that the T can have an id
interface hasID {
  id?: number;
}

//Sync class is used to save and fetch data

export class Sync<T extends hasID> {
  //instanctiate with the api endpoint
  constructor(public rootUrl: string) {}

  //Both return promises that will have the response
  //so the data can be updated by the main class

  //used to fetch from db with id
  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  //save or update data
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
