# Web Development Framework

Built a simple web development framework like React using TypeScript. Used the model view controller desgin pattern for the project structure. The project currently takes all the users from the db.json and renders them on the web page by attaching them to a root div in the DOM. It also can save users to the db and update them. Events and triggers are also addded that are triggerd anytime a new user is added so as to rerendered all the views. Everything is generic so as to make the code scale is easily. When and when not to use composition and inheritance were the biggest learning points of this project.

## Usage

Type the following command to run the json-server on port 3000.

```bash
cd web
npm run start:db
```

Open another terminal and type the following command to build and run the project.

```bash
cd web
npm run start:parcel
```

Then open the parcel localhost server in a browser.

## Learnings

1. Web development framework
2. When to use composition
3. When to use inheritance
4. Generics
5. Advance Generics
6. REST api
7. json-server
8. How Events and triggers work in a webdev framework
9. Document Object Model
10. MVC pattern
