import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes";
import Axios, { AxiosResponse } from "axios";

//composition is used so as not have duplicate code

//class is used to create a new user

//different attributes a user can have
export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

//api endpoint json-server
const rootUrl = "http://localhost:3000/users";

export class User {
  //events object is responsible for events and triggers
  public events: Eventing = new Eventing();
  //sync object is used for fetching and saving a object
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  //attributes object has all the attributes a user can have, it also has getters and setters
  public attributes: Attributes<UserProps>;

  //User reuqires the attributes for the new user
  constructor(attrs: UserProps) {
    //setting the atttributes object
    this.attributes = new Attributes<UserProps>(attrs);
  }

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
  set(update: UserProps): void {
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
