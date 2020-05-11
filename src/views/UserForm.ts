import { User, UserProps } from "../models/User";
import { View } from "./View";
//User form view
//To save or update the db
export class UserForm extends View<User, UserProps> {
  //all the listener attached to this views elements
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.set-name": this.onSetNameClick,
      "click:.set-age": this.onSetAgeClick,
      "Click:.save-model": this.onSaveModel,
    };
  }

  //save button handler
  onSaveModel = (): void => {
    this.model.save();
  };

  //set age button handler
  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  //set name button handler
  onSetNameClick = (): void => {
    const input = this.parent.querySelector("input");
    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  };

  //template method of the View class is implemented
  template(): string {
    return `
            <div>
                <input placeholder="${this.model.get("name")}" />
                <Button class="set-name">Set Name</Button>
                <Button class="set-age">Set Random Age</Button>
                <Button class="save-model">Save</Button>
            </div>

        `;
  }
}
