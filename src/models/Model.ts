import { AxiosPromise, AxiosResponse } from "axios";

//setting up interfaces so that Attributes, Sync and Eventing classes can be swapped out
interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}
interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

type Callback = () => void;
interface Events {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

interface hasID {
  id?: number;
}

export class Model<T extends hasID> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  //gettters for methods are used so that we dont have to write user.events,on(), can just write user.on()
  //it returns a function that can be called
  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  //rest of the methods are dependent on other methods
  set(update: T): void {
    //set the attributes instance of the user
    this.attributes.set(update);
    //trigger a change event so all other componenets know of the change and can rerender
    this.events.trigger("change");
  }

  //used to fetch data from the db
  fetch(): void {
    //check if the user exists
    const id = this.attributes.get("id");
    if (typeof id !== "number") {
      throw new Error("cannot fetch with no id");
    }
    //call the sync fetch method, it returns a promise so that we can set the attributes object here
    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  //used to save or update the db
  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse) => {
        this.trigger("save");
      })
      .catch(() => {
        this.trigger("error");
      });
  }
}
