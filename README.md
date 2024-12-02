
# **RadioGaGa - Escucha Radios Online**

RadioGaGa es un proyecto para escuchar radios argentinas de manera online. Ofrece una interfaz moderna, liviana y adaptable, permitiendo gestionar estaciones de radio de manera sencilla.

## **Caracter�sticas del Proyecto**

- Listado din�mico de radios disponibles.
- Gesti�n de estaciones de radio (agregar, editar, eliminar).
- Reproducci�n de flujos de radio en vivo.
- Backend ligero con SQLite, configurable para m�s bases de datos si es necesario.
- Frontend desarrollado en tecnolog�as web modernas.

---

## **Estructura del Proyecto**

```
radio-app/
??? backend/                # Backend del proyecto
?   ??? app.js              # C�digo del servidor Express.js
?   ??? database.sqlite     # Base de datos SQLite (generada autom�ticamente)
?   ??? package.json        # Dependencias del proyecto
?   ??? .env                # Variables de entorno (no incluir en el repositorio)
??? frontend/               # Frontend del proyecto
?   ??? index.html          # P�gina principal
?   ??? styles.css          # Estilos CSS
?   ??? script.js           # L�gica del frontend
??? README.md               # Manual y gu�a del proyecto
```

---

## **Configuraci�n del Proyecto**

### **1. Clonar el Repositorio**

```bash
git clone <URL-del-repositorio>
cd radio-app
```

### **2. Configuraci�n del IDE**

1. **Descargar WebStorm**: Para un entorno de desarrollo c�modo y potente, WebStorm es una excelente opci�n para trabajar con proyectos JavaScript.
    - [Descargar WebStorm](https://www.jetbrains.com/es-es/webstorm/)

2. **Abrir el Proyecto en WebStorm**: Abre la carpeta del proyecto reci�n clonada en WebStorm para comenzar a trabajar en el proyecto. Aseg�rate de abrir tanto el `frontend` como el `backend` para manejar ambas partes del proyecto.

### **3. Configuraci�n del Backend (Node.js)**

1. **Instalar dependencias del backend**: Navega hasta la carpeta `backend` y ejecuta:

   ```bash
   cd backend
   npm install
   ```

2. **Configurar el archivo `.env`**: Crea un archivo `.env` dentro de la carpeta `backend` y a�ade las siguientes configuraciones:

   ```bash
   PORT=3001
   ```

3. **Iniciar el servidor**: Ejecuta el servidor en modo desarrollo con:

   ```bash
   node app.js
   ```

   El servidor backend estar� disponible en `http://localhost:3001`.

### **4. Configuraci�n del Frontend**

1. **Abrir el archivo `index.html`**: Abre `frontend/index.html` en tu navegador o usa un servidor local para servirlo. Ejemplo:

   ```bash
   npx serve frontend
   ```

   Accede a `http://localhost:5000` para ver el frontend en acci�n.

2. **Conectar el frontend con el backend**: Aseg�rate de que el archivo `frontend/script.js` est� correctamente apuntando a las URL del backend (`http://localhost:3001`), de modo que se pueda cargar y gestionar la lista de radios.

---

## **Gesti�n de Estaciones de Radio**

En la ra�z del proyecto encontrar�s un archivo llamado `test-endpoints.http`, donde podr�s probar las solicitudes HTTP. Este archivo ser� �til para interactuar con el backend y gestionar las estaciones de radio.

### **1. Endpoints del Backend**

# ? Documentaci�n de Endpoints de Radio

## Obtener Todas las Radios
- **M�todo**: GET
- **URL**: `http://localhost:3001/radios`
- **Descripci�n**: Recupera la lista completa de todas las radios almacenadas

## Agregar Nueva Radio
- **M�todo**: POST
- **URL**: `http://localhost:3001/add-radio`
- **Tipo de Contenido**: `application/json`
- **Campos Requeridos**:
    - `name`: Nombre de la radio
    - `stream_url`: URL de transmisi�n
- **Ejemplo de Solicitud**:
  ```json
  {
    "name": "Radio Mitre",
    "stream_url": "http://live-radio01.mediahubaustralia.com/2MIT/mp3/",
    "genre": "News",
    "country": "Argentina"
  }
  ```

## Actualizar Radio
- **M�todo**: POST
- **URL**: `http://localhost:3001/add-radio/`
- **Tipo de Contenido**: `application/json`
- **Ejemplo de Solicitud**:
  ```json
  {
    "name": "La 100 Actualizada",
    "stream_url": "https://la100radios.ssl.cdn.cra.com.ar/la100.mp3",
    "genre": "Pop",
    "country": "Argentina"
  }
  ```

## Eliminar Radio
- **M�todo**: DELETE
- **URL**: `http://localhost:3001/delete-radio/{id}`
- **Ejemplo**: `http://localhost:3001/delete-radio/4`
- **Descripci�n**: Elimina la radio con el ID especificado

## Actualizar Informaci�n de Radio
- **M�todo**: PUT
- **URL**: `http://localhost:3001/update-radio/{id}`
- **Tipo de Contenido**: `application/json`
- **Ejemplo de Solicitud**:
  ```json
  {
    "name": "La 100",
    "stream_url": "https://la100radios.ssl.cdn.cra.com.ar/la100.mp3",
    "genre": "Pop",
    "country": "Argentina"
  }
  ```
---

## **C�mo Contribuir**

1. **Clonar el Proyecto**: Realiza un fork del proyecto y cl�nalo a tu m�quina local.

2. **Crear una Rama Nueva**: Crea una nueva rama para tus modificaciones.

   ```bash
   git checkout -b nueva-funcionalidad
   ```

3. **Realizar Cambios y Verificar Funcionamiento**: Haz tus cambios y verifica que todo funcione correctamente.

4. **Hacer Commit de los Cambios**: Aseg�rate de hacer commit de tus cambios con un mensaje claro.

   ```bash
   git commit -m "Agregada nueva funcionalidad"
   ```

5. **Subir los Cambios a la Rama**: Sube tus cambios a tu repositorio remoto.

   ```bash
   git push origin nueva-funcionalidad
   ```

6. **Crear un Pull Request**: Una vez que tus cambios est�n listos, crea un Pull Request al repositorio principal para que los revisemos.

---

## **Notas Finales**

- Este proyecto utiliza Node.js y Express.js para el backend y tecnolog�as web est�ndar para el frontend.
- Aseg�rate de seguir las instrucciones para instalar las dependencias y configurar el entorno adecuadamente.
- Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue o contribuir con un pull request.

