//Goal is to develop a web framework
//when a user is updated, dispatch a change event and notify other components to rerender
//typescript principles so that the code scales

import { User } from "./models/User";

//creating a new user
const user = User.buildUser({ id: 1 });

//adding an event listener to user
user.on("change", () => {
  console.log(user);
});

//new user is saved into the db
user.fetch();

user.isAdminUser();
