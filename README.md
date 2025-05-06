# Learning Management System (LMS)

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/Yashini-Hettiarachchi/LMS2/main.yml?branch=main)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

A Skill-Sharing & Learning Platform built with Spring Boot REST API and React, allowing users to share and learn different skills through structured learning plans.

## Project Overview

This Learning Management System (LMS) provides a platform for:
- Learning plan creation and sharing
- Social interactions (likes, comments, follows)
- User profiles and activity tracking
- Real-time notifications
- Secure authentication via OAuth 2.0

## Technology Stack

- **Backend**: Spring Boot 3.x, Java 17
- **Frontend**: React 18, Bootstrap
- **Database**: MongoDB
- **Authentication**: OAuth 2.0 with social login

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

### Learning Plan Sharing
- Create structured learning plans with topics, resources, and completion timelines
- Track progress and update plans as you learn
- Share plans publicly or keep them private

### Interactivity & Engagement
- Like and comment on learning plans
- Edit or delete your own comments
- Learning plan owners can moderate comments

### User Profiles & Social Features
- Personalized profile pages displaying learning plans and activities
- Follow other users to see their content
- Public profiles to encourage interaction

### Notifications
- Receive notifications for likes and comments on your learning plans
- Stay updated on activities from users you follow

### Authentication
- Secure login using OAuth 2.0 with social media accounts

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login a user
- `GET /api/v1/oauth/callback` - OAuth callback handler

### Learning Plans
- `GET /api/v1/learning-plans` - Get all learning plans
- `GET /api/v1/learning-plans/{id}` - Get a learning plan by ID
- `POST /api/v1/learning-plans/save` - Create a new learning plan
- `PUT /api/v1/learning-plans/edit/{id}` - Update a learning plan
- `DELETE /api/v1/learning-plans/delete/{id}` - Delete a learning plan
- `GET /api/v1/learning-plans/user/{userId}` - Get learning plans by user

### Social Interactions
- `POST /api/v1/comments/save` - Add a comment
- `PUT /api/v1/comments/edit/{id}` - Edit a comment
- `DELETE /api/v1/comments/delete/{id}` - Delete a comment
- `POST /api/v1/likes/save` - Like a learning plan
- `DELETE /api/v1/likes/delete/{id}` - Unlike a learning plan
- `POST /api/v1/follows/follow` - Follow a user
- `DELETE /api/v1/follows/unfollow/follower/{followerId}/following/{followingId}` - Unfollow a user

### User Profiles
- `GET /api/v1/profiles/user/{userId}` - Get user profile
- `POST /api/v1/profiles/save` - Create/update user profile
- `GET /api/v1/notifications/user/{userId}` - Get user notifications

## Branching Strategy

This project follows the GitHub Flow branching strategy:

1. `main` - Production-ready code
2. `development` - Integration branch for features
3. Feature branches - Created from development for new features (e.g., `feature/add-notifications`)
4. Hotfix branches - Created from main for critical fixes (e.g., `hotfix/fix-auth-issue`)

## Contributing

1. Clone the repository
   ```
   git clone https://github.com/Yashini-Hettiarachchi/LMS2.git
   cd LMS2
   ```

2. Create a new branch from development
   ```
   git checkout development
   git pull
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and commit with meaningful messages
   ```
   git add .
   git commit -m "Add detailed description of your changes"
   ```

4. Push your branch and create a pull request
   ```
   git push -u origin feature/your-feature-name
   ```

5. After review and approval, your changes will be merged

## GitHub Workflow

This project uses GitHub Actions for continuous integration and deployment:

1. **CI Pipeline**: Automatically runs tests and builds the application on every push and pull request
2. **Code Quality**: Analyzes code quality using SonarCloud
3. **Deployment**: Automatically deploys to production when changes are merged to main

The workflow configuration can be found in the `.github/workflows/main.yml` file.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- SLIIT Faculty of Computing for the project requirements
- All team members who contributed to this project
