# Gestión de Usuarios

Este proyecto es una aplicación para gestionar usuarios, permitiendo realizar operaciones como agregar, buscar, actualizar y eliminar usuarios.

## Comandos

Puedes usar los siguientes comandos en la terminal:

1. **Obtener información sobre los comandos:**

   ```bash
   node index.js help
   ```

2. **Listar todos los usuarios:**

   ```bash
   node index.js list
   ```

3. **Buscar un usuario por ID:**

   ```bash
   node index.js search "User_id"
   ```

4. **Crear un nuevo usuario:**

   ```bash
   node index.js add "Nombre" "Apellido" "Email" "Password"
   ```

5. **Actualizar los datos de un usuario:**

   ```bash
   node index.js update "User_id" "Nombre" "Apellido" "Email" "Password"
   ```

6. **Eliminar un usuario:**
   ```bash
   node index.js delete "User_id"
   ```

## Instalación

Para instalar el proyecto, clona el repositorio y luego instala las dependencias:

```bash
git clone https://github.com/sachacq1/TP-backend
cd TP-backend
npm install
```

## Uso

Una vez que hayas instalado las dependencias, puedes ejecutar los comandos mencionados anteriormente para gestionar los usuarios.
