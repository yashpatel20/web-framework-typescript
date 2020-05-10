type Callback = () => void;

//Eventing class is used to handle events
export class Eventing {
  //events attribute can have any key/event and the key is mapped to a Callback[]. The array needs to be triggerd.
  events: { [key: string]: Callback[] } = {};

  //setting the event listener with the callbacks
  on = (eventName: string, callback: Callback): void => {
    //getting the callback array
    const handlers = this.events[eventName] || [];
    //adding the new callback
    handlers.push(callback);
    //setting the callback array to the new one
    this.events[eventName] = handlers;
  };

  //trigger all the callbacks attached to that particular event
  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];
    if (!handlers || handlers.length == 0) return;
    //call all callbacks
    handlers.forEach((callback) => {
      callback();
    });
  };
}
