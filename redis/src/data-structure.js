const redis = require("redis");

const client = redis.createClient({
	host: "localhost",
	port: 6379,
});

client.on("error", (error) => console.error("Redis client error", error));

async function redisDataStructure() {
	try {
		await client.connect();

		await client.set("user:name", "hazzaz");
		const name = await client.get("user:name");
		// console.log(name);

		await client.mSet([
			"user:email",
			"hazzaz@gmail.com",
			"user:age",
			"24",
			"user:location",
			"Bangladesh",
		]);

		const [email, age, location] = await client.mGet([
			"user:email",
			"user:age",
			"user:location",
		]);

		// console.log(email, age, location);
		// await client.lPush('notes', ['note 1', 'note 2', 'note 3'])
		const allNotes = await client.lRange("notes", 0, 1);
		// console.log(allNotes);
		const firstNote = await client.lPop("notes");
		// console.log(firstNote);

		// sets
		// await client.sAdd('user:nickname', ['hazzaz', 'abdul', 'mannan'])
		const extractNickName = await client.sMembers("user:nickname");
		// console.log(extractNickName);
		const isHazzazIsNickName = await client.sIsMember("user:nickname", "AMIN");
		// console.log(isHazzazIsNickName);

		await client.sRem("user:nickname", "abdul");
		const getUpdatedNickNames = await client.sMembers("user:nickname");
		// console.log(getUpdatedNickNames);

		// hashes
		await client.hSet("product:1", {
			name: "Product 1",
			description: "Product",
			rating: "5",
		});

		const getProductRating = await client.hGet("product:1", "rating");
		// console.log(getProductRating);
		const getProductDetails = await client.hGet("product:1", "description");
		// console.log(getProductDetails);
	} catch (error) {
		console.log(error);
	} finally {
		client.quit();
	}
}

redisDataStructure();
