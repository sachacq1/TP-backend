// 1° recibir los argumentos pasados por la terminal
// 2° enviarselos a ./utils/createObjectUser (en caso de crear o actualizar el usuario)
// 3° evaluar que acción quiere realizar el usuario (list, search/get, add, update, delete)
// 4° DEVOLVER EL OUTPUT AL CLIENTE FINAL

import {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} from "./models.js";
import dotenv from "dotenv";
import {
  createUserObject,
  createUpdateUserObject,
} from "./utils/createObjetcUser.js";
import { handleError } from "./utils/handleError.js";
import { comand } from "./utils/comand.js";
import { info } from "./utils/info.js";

dotenv.config();

const args = process.argv.splice(2);
const action = args[0];

switch (action) {
  case "list":
    console.log(getUsers(process.env.PATH_FILE_USER));
    break;
  case "search":
    console.log(getUserById(args[1]));
    break;
  case "add":
    const newUser = createUserObject(args);
    console.log(addUser(newUser));
    break;
  case "update":
    const updatedUser = createUpdateUserObject(args);
    console.log(updateUser(updatedUser));
    break;
  case "delete":
    console.log(deleteUser(args[1]));
    break;
  case "comand":
    console.log(comand());
    break;
  case "info":
    console.log(info);
    break;
  default:
    const error = handleError(
      new Error("Comand Incorrect"),
      process.env.PATH_FILE_ERROR
    );
    console.log(error);
    break;
}
