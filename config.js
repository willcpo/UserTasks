const env = process.env;

export default {
	mongodbUri: "mongodb://localhost:27017/test",
	nodeEnv: env.NODE_ENV || "development",
	port: env.PORT || 3000,
	host: env.HOST || "0.0.0.0",
	get serverUrl(){
		//may need to change to https
		return `http://${this.host}:${this.port}`;
	}
};