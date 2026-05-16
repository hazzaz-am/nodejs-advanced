const redis = require("redis");

const client = redis.createClient({
	host: "localhost",
	port: 6379,
});

client.on("error", (error) => console.log("Redis client error occurred", error));

async function pubSub() {
	try {
		await client.connect();
		const subscriber = client.duplicate();
		await subscriber.connect();

		await subscriber.subscribe("dummy-channel", (message, channel) => {
			console.log(`Received message from ${channel}: ${message}`);
		});

		await client.publish("dummy-channel", "Some dummy data from publisher");
		await client.publish("dummy-channel", "Some new data from publisher");

		await new Promise((resolve) => setTimeout(resolve, 3000));

		await subscriber.unsubscribe("dummy-channel");
		await subscriber.quit();

    // pipeline & transactions
    

	} catch (error) {
		console.log(error);
	} finally {
		client.quit();
	}
}

pubSub();
