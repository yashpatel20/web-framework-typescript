import { UserList } from "./views/UserList";
import { CollectionView } from "./views/CollectionView";
import { UserProps, User } from "./models/User";
import { Collection } from "./models/Collection";
import { UserForm } from "./views/UserForm";
import { UserEdit } from "./views/UserEdit";

//creating a users collections with all the users from the db.json
const users = new Collection(
  "http://localhost:3000/users",
  (json: UserProps) => {
    return User.buildUser(json);
  }
);

//
users.on("change", () => {
  const root = document.getElementById("root");
  if (root) {
    new UserList(root, users).render();
  }
});

users.fetch();
