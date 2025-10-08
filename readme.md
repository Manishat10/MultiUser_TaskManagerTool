# Task Manager API

A secure RESTful API built with Node.js, Express, and PostgreSQL that supports role-based access control (RBAC), task management, comments, filtering, and drag-and-drop task movement.

## Features

- **User registration and login** with JWT authentication
- **Role-based access control (RBAC)**: Admin, Manager, User roles with different permissions
- **Full CRUD operations** for tasks
- **Assign tasks** to users and self
- **Add comments** to tasks
- **Filter tasks** by status, priority, or assignee
- **Drag-and-drop** support to move tasks between statuses (To-Do, In Progress, Done)
- Secure database integration with PostgreSQL
- Environment variable configuration for sensitive data

## Tech Stack

- Node.js & Express.js
- PostgreSQL
- JWT for authentication
- React (for front-end, if applicable)
- React DnD Kit (for drag-and-drop)

## Getting Started

### Prerequisites

- Node.js installed
- PostgreSQL set up with a database and user
- npm or yarn package manager

### Installation
1. Clone the repo:

2. Install dependencies:


3. Set up environment variables:

Create a `.env` file:


4. Initialize the database, run migrations, or seed data as needed.

5. Start the server:

npm start 

## API Endpoints

- `POST /register`: Register a new user
- `POST /login`: Authenticate user and generate JWT
- `GET /tasks`: Get tasks (with optional filters)
- `POST /tasks`: Create a task
- `PUT /tasks/:id`: Update task details
- `DELETE /tasks/:id`: Delete a task
- `POST /tasks/:id/comments`: Add comment to task
- `POST /tasks/:id/move`: Drag-and-drop move task between statuses

## Role-Based Access Control (RBAC)

- **Roles**: Admin, Manager, User
- **Permissions**: Create, read, update, delete tasks; comment; assign; move tasks
- Roles are assigned during registration or via admin panel.
- Access to endpoints is controlled based on user role, enforced via middleware.


## Contributing

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

## License

This project is licensed under the MIT License.

---

This README provides a detailed overview of your task manager API, highlighting RBAC and drag-and-drop features. If you'd like, I can generate the markdown file for you to include directly in your project.




1. Clone the repo:

