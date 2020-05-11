import { Model } from "../models/Model";

//Parent class of all the diferent views
//
export abstract class View<T extends Model<K>, K> {
  //regions has all the elements that need to be updated in the DOM when a change is triggered
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  //abstract method needs to be implemented by the child
  //returns html that needs to be appended to the parent elemenet
  abstract template(): string;

  //methods that can be overridden by the child
  regionsMap(): { [key: string]: string } {
    return {};
  }
  //maps all the events to event handlers
  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  //whenever a change request is triggered , rerender the view
  bindModel = (): void => {
    this.model.on("change", () => {
      this.render();
    });
  };

  //Will add all the event handlers to the specified element in eventMap
  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    //iterate over eventMap and add handlers to the elements
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");
      fragment.querySelectorAll(selector).forEach((element: Element): void => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  //maps all the DOM elements
  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();
    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (element) this.regions[key] = element;
    }
  }

  //to be overriden
  //things to do when rerendered
  onRender(): void {}

  //Render
  render(): void {
    this.parent.innerHTML = "";
    //creating an html element from string
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    //binds
    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);
    //render
    this.onRender();
    //appending html elem to the DOM
    this.parent.append(templateElement.content);
  }
}
