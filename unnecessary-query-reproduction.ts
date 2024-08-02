import { MikroORM, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { SftClasse, SftNcmsh, SftProduto, SftSubProduto } from "./entities";

const orm = MikroORM.initSync({
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
});

function getRandomBetween1And10(): number {
	return Math.floor(Math.random() * 10) + 1;
}

async function createDataIfNeeded() {

	const em = orm.em.fork();

	const count = await em.count(SftSubProduto);

	if (count > 0) return;

	for (let i = 0; i < 10; i++) {

		const classe = new SftClasse();
		classe.classeDescricao = `Classe ${i}`;
		classe.classeSigla= `CLSS${i}`;

		const ncmsh = new SftNcmsh();
		ncmsh.ncmshCodigo = `NCM ${i}`;

		em.persist(classe);
		em.persist(ncmsh);
	}

	await em.flush();

	for (let i = 0; i < 1000; i++) {

		const produto = new SftProduto();

		em.assign(produto, {
			sftClasse: em.getReference(SftClasse, getRandomBetween1And10()),
			sftNcmsh: em.getReference(SftNcmsh, getRandomBetween1And10()),
		})

		const subProduto = new SftSubProduto();

		em.assign(subProduto, {
			sftProduto: produto,
			subproComercial: `Subproduto ${i}`,
			subproAtivo: 1,
			subproDataCadastro: new Date(),
			subproDataAlteracao: new Date(),
			subproEan: `EAN ${i}`,
			subproPesoLiquido: i,
			subproPesoBruto: i,
			subproCodigoFornecedor: `Fornecedor ${i}`,
		});

		em.persist(produto);
		em.persist(subProduto);
	}

	await em.flush();
}

async function getAllFieldsExample() {

	const em = orm.em.fork();

	const repo = em.getRepository(SftSubProduto)

	const entities = await repo.find({}, {
		populate: ["sftProduto", "sftProduto.sftNcmsh", "sftProduto.sftClasse"],
		strategy: "joined",
		limit: 10,
		offset: 20,
		orderBy: { subproId: "ASC" }
	});

	console.log(entities.length);
}

async function getLimitedFieldsExample() {

	const em = orm.em.fork();

	const repo = em.getRepository(SftSubProduto)

	const entities = await repo.find(undefined, {
		populate: ["sftProduto", "sftProduto.sftNcmsh", "sftProduto.sftClasse"],
		strategy: "joined",
		fields: [
			"subproId",
			"subproComercial",
			"subproAtivo",
			"subproDataCadastro",
			"subproDataAlteracao",
			"subproEan",
			"sftProduto.sftNcmsh.ncmshCodigo",
			"subproPesoLiquido",
			"subproPesoBruto",
			"subproCodigoFornecedor",
			"sftProduto.sftClasse.classeSigla",
			"sftProduto.sftClasse.classeDescricao",
		],
		limit: 10,
		offset: 20,
		orderBy: { subproId: "ASC" }
	});

	console.log(entities.length);
}

(async () => {

	await createDataIfNeeded();

	console.log("\nFirst example, where only one query is executed:")
	await getAllFieldsExample();

	console.log("\nSecond example, where for some reason a second query is fired, searching for fields that were already on the first one:")
	await getLimitedFieldsExample();

})()