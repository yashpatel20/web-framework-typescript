//Goal is to develop a web framework
//when a user is updated, dispatch a change event and notify other components to rerender
//typescript principles so that the code scales

import { User } from "./models/User";

//creating a new user
const user = new User({ id: 1, name: "neelisfat", age: 20 });

//adding an event listener to user
user.events.on("save", () => {
  console.log(user);
});

//new user is saved into the db
user.save();
