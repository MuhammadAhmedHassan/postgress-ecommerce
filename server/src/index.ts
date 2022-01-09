import "reflect-metadata";
import { createConnection } from "typeorm";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY env must be defined");
  }
  try {
    await createConnection();
    console.log("Connected to db");
  } catch (err) {
    console.log(err);
  }
  const port = 5000;
  app.listen(port, () => {
    console.log(`Server up at http://localhost:${port}`);
  });
};
start();

// TODO: remove this code
// createConnection()
//   .then(async (connection) => {
//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.name = "abc";
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");
//   })
//   .catch((error) => console.log(error));
