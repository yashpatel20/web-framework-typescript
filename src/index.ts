import { User } from "./models/User";
const user = new User({ name: "new record", age: 999 });
user.save();
