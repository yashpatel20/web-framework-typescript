//Attributes class accepts any genric data as attributes

export class Attributes<T> {
  //pass the atttributes
  constructor(private data: T) {}
  //getter method
  //key needs to be an actual key in the attributes object, hence extended
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  //setter method
  set(update: T): void {
    Object.assign(this.data, update);
  }

  //method to get all the attributes
  getAll(): T {
    return this.data;
  }
}
