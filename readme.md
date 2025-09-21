# Scalable Chat App

## Tech Stack:

- Frontend: Next.js

- Backend: Node.js

- Database: PostgreSQL

- ORM: Prisma

- Real-time Communication: Socket.io

- Pub/Sub: Redis

- Message Queue: Kafka

- Containerization: Docker

## Steps to Run the Application locally:

1. Clone the Repository:

```bash
    git clone https://github.com/rbhagat32/scalable-chat-app.git
```

2. Install Dependencies:

```bash
    cd frontend
    npm install

    cd backend
    npm install
    npx prisma generate
```

3. Start the Development Servers using Docker Compose:

```bash
    cd scalable-chat-app
    npm run up
```

This will start the Backend server (Express) on `http://localhost:4000` and the Frontend server (Next.js) on `http://localhost:3000`.
