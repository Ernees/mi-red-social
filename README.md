# 🌐 Social Connect – Fullstack Web Platform

Plataforma web interactiva de interacción social desarrollada bajo una arquitectura **Fullstack modular y desacoplada**, utilizando **Angular** en el cliente y **NestJS (Node.js)** con **MongoDB** en el servidor.

---

## 🏗️ Arquitectura y Características Técnicas

- **Arquitectura Backend & APIs:** Servicios RESTful construidos en NestJS bajo el patrón **Controller-Service-Repository**, garantizando modularidad, validación estricta de DTOs y tipado fuerte de punta a punta con TypeScript.
- **Seguridad y Control de Acceso:** Autenticación y autorización stateless mediante tokens **JWT**, con guards, estrategias de validación y middlewares personalizados para la protección de rutas y control de roles (incluyendo panel administrativo).
- **Modelado de Datos:** Esquemas y relaciones documentales en **MongoDB** mediante **Mongoose** para la gestión eficiente de usuarios, publicaciones e interacciones en tiempo real.
- **Cliente Web Reactivo:** Frontend modular en Angular con manejo desacoplado de servicios e interceptores HTTP para la inyección automática de credenciales en cada petición.

---

## ✨ Funcionalidades Principales

- 👤 **Gestión de Usuarios y Sesiones:** Registro, inicio de sesión seguro y control de perfiles mediante JWT.
- 📝 **Publicaciones (CRUD Completo):** Creación, edición, listado y eliminación de posts con validación de autoría.
- ❤️ **Interacciones Sociales:** Sistema dinámico de "me gusta" y actualización de estado en tiempo real sobre publicaciones.
- 🛡️ **Panel de Administración:** Vista y herramientas exclusivas para gestión y moderación de la plataforma.

---

## 🛠️ Stack Tecnológico

### Frontend
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### Backend & Base de Datos
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

---

## 📦 Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Ernees/mi-red-social.git
   cd mi-red-social
   ```

2. **Configurar y levantar el Backend:**
   ```bash
   cd backend
   npm install
   ```
   *(Asegurate de configurar tus variables de entorno como la URI de conexión a MongoDB y el secreto de JWT antes de iniciar)*
   ```bash
   npm run start:dev
   ```

3. **Configurar y levantar el Frontend (en otra terminal):**
   ```bash
   cd frontend
   npm install
   ng serve
   ```
   Abrí tu navegador en `http://localhost:4200/`.

---

## 👨‍💻 Autor

**Ernesto Huerta**  
- [LinkedIn](https://www.linkedin.com/in/ern-huert)
- [GitHub](https://github.com/Ernees)
