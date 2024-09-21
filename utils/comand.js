import { readFileSync } from "node:fs";
import dotenv from "dotenv";

dotenv.config();

const comand = () => {
  const readComand = readFileSync(process.env.PATH_FILE_COMAND, "utf-8");
  return readComand;
};

export { comand };
