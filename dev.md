# Development Environment Setup

1. Change `backend/.env`.
2. In `compose.yaml`, un-comment port mappings for Postgres, Redis, Kafka.
3. Change `KAFKA_CFG_ADVERTISED_LISTENERS` value from `PLAINTEXT://kafka:9092` to `PLAINTEXT://localhost:9092`
4. Change `KAFKA_CFG_CONTROLLER_QUORUM_VOTERS` value from `1@kafka:9093` to `1@localhost:9093`
5. Comment entire backend service in `compose.yaml`.

## **IMP : _Revert these changes to switch back to Production._**
