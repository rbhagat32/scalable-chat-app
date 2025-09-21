import Redis from "ioredis";
import { configDotenv } from "dotenv";

configDotenv({ quiet: true });

const pub = new Redis({
  username: process.env.REDIS_USERNAME,
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

const sub = new Redis({
  username: process.env.REDIS_USERNAME,
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

pub.on("ready", () => {
  console.log("Publisher connected to Redis !");
});

sub.on("ready", () => {
  console.log("Subscriber connected to Redis !");
});

pub.on("error", (err) => {
  console.error("Redis Pub Error:", err);
});

sub.on("error", (err) => {
  console.error("Redis Sub Error:", err);
});

export { pub, sub };
