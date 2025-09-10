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
    git  clone <repository-url>
```

2. Install Dependencies:

```bash
    npm  install  -g  concurrently

    cd  backend
    npm  install

    cd  frontend
    npm  install
```

3. Prisma Setup:

```bash
    cd  backend
    npx  prisma  generate
```

4. Start PostgreSQL, Redis, Kafka using Docker Compose:
   _Kafka service usually takes 10-20 secs to start, so wait before moving on to next step._

```bash
    docker  compose  up  -d
```

5. PostgreSQL Database Migration:

```bash
    cd  backend
    npx  prisma  migrate  dev
```

6. Start the Backend & Frontend Servers:

```bash
    npm  run  dev
```

This will start the Backend server on `http://localhost:4000` and the Frontend server on `http://localhost:3000`.

7. To see data stored in PostgreSQL:

```bash
    cd  backend
    npx  prisma  studio
```
