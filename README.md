# ProjectLocation Nodejs Back-end

Este repositorio está destinado para el Back-end de la solución Location manager.

## Instalación en ambiente local

Prerrequisitos:

- Nodejs versión 10 o superior.
- IDE para el manejo de código javascript, preferiblemente VisualStudio code.
- Instalar un ambiente local o remoto de postgres.

1. Posterior a la instalación de Nodejs, es necesario modifcar la conexión a la base de datos Postgres en el proyecto. Para esto iremos a los archivos
ProjectLocation-db/setup.js y ProjectLocation-utils/config.js y cambiaremos los parametros de nombre de base de datos, usuario, contraseña, host y puerto
por los que usa la base de datos que aprovisionó en los prerrequisitos.

2. En la raiz de los módulos ProjectLocation-db, ProjectLocation-api y ProjectLocation-utils vamos a abrir una consola de comandos y ejecutaremos npm install.

3. En la raiz del proyecto ProjectLocation-db, abriremos una consola y ejecutaremos el comando npm run npm run setup -- --yes. Esto creará la tabla de la base de datos.

4. Finalmente ejecutaremos el comando npm run start-dev para levantar el servidor local. 

