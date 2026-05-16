import express from "express";
import Redis from "ioredis";
import mongoose from "mongoose";

const app = express();
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
const mongo = process.env.MONGO_URL || "mongodb://localhost:27017/redis_mongo";

app.get("/redis", async (req, res) => {
	const replay = await redis.ping();
	res.json({ redis: replay });
});

app.get("/mongo", async (req, res) => {
	if (mongoose.connection.readyState === 0) {
		await mongoose.connect(mongo);
	}
	res.json({ mongo: "connected", database: mongoose.connection.name });
});

app.listen(3000, () => {
	console.log(`Server is running on ${`http://localhost:${3000}`}`);
});
