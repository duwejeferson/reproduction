import { Options } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import path from "path";
import { SftClasse, SftNcmsh, SftProduto, SftSubProduto } from "./entities";

const config: Options = {
	migrations: {
		path: path.join(__dirname, "./migrations"),
		glob: "!(*.d).{js,ts}",
	},
	driver: PostgreSqlDriver,
	driverOptions: {
		connection: {
			idleTimeoutMillis: 60000,
			client_encoding: "UTF8",
			application_name: "reproduction",
			fallback_application_name: "reproduction",
		}
	},
	contextName: "name",
	host: "192.168.90.226",
	port: 2002,
	user: "postgres",
	password: "postgres",
	dbName: "reproducao-erros",
	schema: "public",
	entities: [SftClasse, SftNcmsh, SftProduto, SftSubProduto],
	ensureIndexes: false,
	connect: false,
	logger: console.log,
	debug: true,
};

export default config;