# Task Management REST API

A small and complete REST API built with **Express + TypeScript + MongoDB (Mongoose)**.

## Features

- User registration and login
- Password hashing with `bcryptjs`
- JWT based authentication
- Task CRUD operations
- Task assignment to users
- Task status and priority tracking

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- dotenv

## Project Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Then update values:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/task-management
JWT_SECRET=your-super-secret-key
```

3. Run development server:

```bash
npm run dev
```

4. Build and start production server:

```bash
npm run build
npm start
```

## API Base URL

`http://localhost:5000/api`

## Endpoints

### Health

- `GET /health`

### Users

- `POST /users/register`
- `POST /users/login`
- `GET /users` (protected)

### Tasks (protected)

- `POST /tasks`
- `GET /tasks`
- `GET /tasks/:id`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

## Postman Deliverables

Postman files are in the `postman` directory:

- `postman/task-management-api.postman_collection.json`
- `postman/task-management-api.postman_environment.json`

The collection includes sample request bodies and uses:

- `{{BASE_URL}}` for the API host
- `{{TOKEN}}` for Bearer auth