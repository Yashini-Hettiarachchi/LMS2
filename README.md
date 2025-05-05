# Learning Management System (LMS)

A full-stack web application for managing courses, user registration, and learning content.

## Project Overview

This Learning Management System (LMS) provides a platform for:
- User registration and authentication
- Course management (create, read, update, delete)
- Course categorization and filtering

## Technology Stack

- **Backend**: Spring Boot, Java
- **Frontend**: React.js
- **Database**: MongoDB
- **Authentication**: Custom JWT-based authentication

## Essential Tools & Setup Checklist

### 1. Essential Tools (Required)

- [x] **JDK 17+**
  - Purpose: Run Spring Boot backend
  - [Oracle JDK](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
  - [OpenJDK (Temurin)](https://adoptium.net/en-GB/temurin/releases/?version=17)

- [x] **Node.js + npm**
  - Purpose: Run and build React frontend
  - [Download Node.js](https://nodejs.org/en/download)

- [x] **MongoDB Community Server**
  - Purpose: Database for storing course and user data
  - [Download MongoDB](https://www.mongodb.com/try/download/community)

- [x] **Visual Studio Code** (or any preferred IDE)
  - Purpose: Code editor for backend and frontend
  - [Download VS Code](https://code.visualstudio.com/Download)

### 2. Optional but Recommended Tools

- [ ] **MongoDB Compass**
  - GUI for MongoDB
  - [Download MongoDB Compass](https://www.mongodb.com/try/download/compass)

- [x] **Git**
  - Version control system
  - [Download Git](https://git-scm.com/downloads)

- [ ] **Postman**
  - API testing tool
  - [Download Postman](https://www.postman.com/downloads/)

- [ ] **Java Extension Pack** (for VS Code)
  - Java support in VS Code
  - [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)

- [ ] **Spring Boot Extension** (for VS Code)
  - Tools for Spring Boot development
  - [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-spring-boot)

- [ ] **npm Intellisense** (VS Code Plugin)
  - Autocomplete for npm modules
  - [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)

- [ ] **ESLint + Prettier**
  - Code linting and formatting for frontend
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Getting Started

### Backend Setup

1. Ensure MongoDB is running on your system
2. Navigate to the `demo` directory
3. Run the Spring Boot application:
   ```
   ./mvnw spring-boot:run
   ```
4. The backend server will start on port 8089

### Frontend Setup

1. Navigate to the `frontend` directory
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. The frontend application will be available at http://localhost:3000

## Features

- **User Authentication**
  - Registration
  - Login
  - Role-based access control

- **Course Management**
  - Create new courses
  - View course listings
  - Edit course details
  - Delete courses

- **Course Filtering**
  - Filter by category
  - Filter by instructor
  - Filter by difficulty level

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login a user

### Courses

- `GET /api/v1/courses/getall` - Get all courses
- `POST /api/v1/courses/save` - Create a new course
- `PUT /api/v1/courses/edit/{id}` - Update a course
- `DELETE /api/v1/courses/delete/{id}` - Delete a course
- `GET /api/v1/courses/search/{id}` - Get a course by ID
- `GET /api/v1/courses/instructor/{instructor}` - Get courses by instructor
- `GET /api/v1/courses/category/{category}` - Get courses by category
- `GET /api/v1/courses/level/{level}` - Get courses by level

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
