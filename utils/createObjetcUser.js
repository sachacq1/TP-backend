// 1° objetener los argumentos pasador por terminal (que vienen del index)
// 2° desarrollar las funciones que crean los objetos para añadir un usario y actualizar un usuario
// 3° aplicar control de errores entorno a las posibilidades de que surja uno

import dotenv from "dotenv";
import { handleError } from "./handleError.js";

dotenv.config();

const PATH_FILE_ERROR = process.env.PATH_FILE_ERROR;

const createUserObject = (args) => {
  try {
    const [name, lastName, email, password] = args.slice(1);

    if (!name || !lastName || !email || !password) {
      throw new Error("Faltan datos para crear usuario");
    }
    return {
      name,
      lastName,
      email,
      password,
    };
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};

const createUpdateUserObject = (args) => {
  try {
    const [id, name, lastName, email, password] = args.slice(1);

    const updateUser = { id };

    updateUser.id = id;

    if (name) updateUser.name = name;
    if (lastName) updateUser.lastName = lastName;
    if (email) updateUser.email = email;
    if (password) updateUser.password = password;

    return updateUser;
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};

export { createUserObject, createUpdateUserObject };
