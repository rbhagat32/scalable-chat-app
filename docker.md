# Starting Services using Docker-CLI (manually)

## Postgres:

```bash
    docker run -d --name postgres -p 5430:5432 -e POSTGRES_USER=raghav -e POSTGRES_PASSWORD=password -e POSTGRES_DB=scalable-chat-app -v postgres_data:/var/lib/postgresql/data postgres
```

## Redis:

```bash
    docker run -d --name redis -p 6380:6379 -v redis_data:/data redis
```

## Kafka (takes time to start (20-30 sec), see container logs then start backend server):

```bash
    docker run -d --name kafka -p 9092:9092 -e KAFKA_ENABLE_KRAFT=yes -e KAFKA_CFG_NODE_ID=1 -e KAFKA_CFG_PROCESS_ROLES=broker,controller -e KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093 -e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -e KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER -e KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=1@localhost:9093 -e KAFKA_CFG_AUTO_CREATE_TOPICS_ENABLE=true -e ALLOW_PLAINTEXT_LISTENER=yes -v kafka_data:/bitnami/kafka bitnami/kafka
```

## Run Postgres Queries:

```bash
    docker exec -it postgres bash
    psql -U raghav -d scalable-chat-app
    select * from messages;
```

## See Messages in Redis:

```bash
    docker exec -it redis bash
    redis-cli SUBSCRIBE MESSAGES
```

## See Messages in Kafka:

```bash
    docker exec -it kafka bash
    kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic MESSAGES --from-beginning
```

## Run Multiple Instances of Server (Windows Powershell):

```bash
    $env:PORT=4000; npm start
    $env:PORT=4001; npm start
    $env:PORT=4002; npm start
```
