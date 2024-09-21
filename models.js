import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID, createHash } from "node:crypto";
// Averiguar que importar de NODE para realizar el hash del pass
// Averiguar como "activar" la lectura de las variables de entorno del archivo .env (dotenv)
import { handleError } from "./utils/handleError.js";
import { url } from "node:inspector";
import dotenv from "dotenv";

dotenv.config();

// 1° recuperar variables de entorno
const PATH_FILE_USER = process.env.PATH_FILE_USER;
const PATH_FILE_ERROR = process.env.PATH_FILE_ERROR;
// 2° Declarar los metodos

const getUsers = (urlFile) => {
  try {
    if (!urlFile) {
      throw new Error("Acceso denegado");
    }

    const exist = existsSync(urlFile);

    if (!exist) {
      writeFileSync(urlFile, JSON.stringify([]));
      return [];
    }
    const users = JSON.parse(readFileSync(urlFile));
    return users;
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};

const getUserById = (id) => {
  try {
    if (!id) {
      throw new Error("ID no encontrado");
    }

    const users = getUsers(PATH_FILE_USER);

    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new Error("No existe user");
    }
    return user;
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};

// addUser recibe un objeto con toda la data para el nuevo user
// valida que esten los datos míminos para añadir un nuevo user
// valida que el nombre sea un string
// valida que el apellido sea un string
// valida que el email sea un string y que no se repita
// hashea la contraseña antes de registrar al user
const addUser = (user) => {
  try {
    const { name, lastName, email, password } = user;

    if (!name || !lastName || !email || !password) {
      throw new Error("Faltan datos");
    }
    if (
      typeof name !== "string" ||
      typeof lastName !== "string" ||
      typeof email !== "string"
    ) {
      throw new Error("Los datos ingresados no son String");
    }

    if (!email.includes("@")) {
      throw new Error("Invalid Email");
    }

    const users = getUsers(PATH_FILE_USER);

    const hashedPass = createHash("sha256").update(password).digest("hex");

    const newUser = {
      id: randomUUID(),
      name,
      lastName,
      email,
      password: hashedPass,
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
    };

    if (users.find((user) => user.email === email)) {
      throw new Error("El email ya está en uso.");
    }
    users.push(newUser);

    writeFileSync(PATH_FILE_USER, JSON.stringify(users));

    return newUser;
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};

// todos los datos del user seleccionado se podrían modificar menos el ID
// si se modifica la pass debería ser nuevamente hasheada
// si se modifica el email, validar que este no exista
const updateUser = (userData) => {
  try {
    const { id, name, lastName, email, password } = userData; // Mover la desestructuración aquí

    if (!id) {
      throw new Error("ID no encontrada");
    }

    const users = getUsers(PATH_FILE_USER);
    const user = users.find((u) => u.id === id); // Llama a getUserById después de definir id

    if (
      typeof name !== "string" ||
      typeof lastName !== "string" ||
      typeof email !== "string"
    ) {
      throw new Error("Los datos ingresados no son String");
    }

    if (!email.includes("@")) {
      throw new Error("Email invalido");
    }

    if (email && users.find((u) => u.email === email && u.id !== id)) {
      throw new Error("El email ya está en uso.");
    }

    // Solo hashea la contraseña si se proporciona
    if (password) {
      const hashedPass = createHash("sha256").update(password).digest("hex");
      user.password = hashedPass; // Actualiza la contraseña hasheada
    }

    // Actualiza otros campos
    if (name) user.name = name;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    user.updateAt = new Date().toISOString();

    // Actualiza la lista de usuarios
    writeFileSync(PATH_FILE_USER, JSON.stringify(users));

    return user;
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};

const deleteUser = (id) => {
  try {
    if (!id) {
      throw new Error("Id no encontrada");
    }

    const users = getUsers(PATH_FILE_USER);
    const user = getUserById(id);

    const newUsers = users.filter((user) => user.id !== id);

    writeFileSync(PATH_FILE_USER, JSON.stringify(newUsers));
    return user;
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};

// const respuesta = addUser({
//   name: "martin",
//   lastName: "gonzales",
//   email: "mar6tn@gma.com",
//   password: "234meg",
// });

// console.log(respuesta);
// const respuesta = async () => {
//   const result = await addUser({
//     name: "martin",
//     lastName: "gonzales",
//     email: "martddn@gma.com",
//     password: "234meddg",
//   });
//   console.log(result);
// };

// respuesta();

export { getUsers, getUserById, addUser, updateUser, deleteUser };
