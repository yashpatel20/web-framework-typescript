import { Eventing } from "./Eventing";
import axios, { AxiosResponse } from "axios";

//Class for building a collection of all the data at the /data endpoint
//Generic class T : type of Class, K : type of the json/attributes of the class T
export class Collection<T, K> {
  //array of the class T
  models: T[] = [];
  //Eventing class for handling fetch and save
  events: Eventing = new Eventing();

  //contructor
  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }
  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.models.push(this.deserialize(value));
      });
      this.trigger("change");
    });
  }
}
