import dotenv from "dotenv";

dotenv.config();

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env;
export const MONGO_URI = `mongodb://${
	!!MONGO_USERNAME && !!MONGO_PASSWORD ? `${MONGO_USERNAME}:${encodeURIComponent(MONGO_PASSWORD!)}@` : ""
}${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
