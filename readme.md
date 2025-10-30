# Scalable Chat App

## Tech Stack:

- Frontend: Next.js

- Backend: Express.js

- Database: PostgreSQL

- ORM: Prisma

- Real-time Communication: Socket.io

- Pub/Sub: Redis

- Message Broker: Kafka

- Containerization: Docker

- Load Balancing: Nginx

## Steps to Run the Application locally:

1. Clone the Repository:

```bash
    git clone https://github.com/rbhagat32/scalable-chat-app.git
```

2. Install Dependencies (just to avoid red squiggly lines in IDE):

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

#### This will start 5 instances of Backend server (Express.js) balanced by Load Balancer (Nginx) on `http://localhost:4000`, Frontend server (Next.js) on `http://localhost:3000`, and Prisma Studio on `http://localhost:5555`.
