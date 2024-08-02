import { BaseEntity, Collection, Entity, Index, ManyToOne, OneToMany, OneToOne, Opt, PrimaryKey, PrimaryKeyProp, Property, Ref } from "@mikro-orm/core";

@Entity({ tableName: "sft_classe", schema: "public" })
export class SftClasse extends BaseEntity {

	[PrimaryKeyProp]?: "classeId";

	@PrimaryKey({ fieldName: "classe_id", type: "number" })
	classeId!: number;

	@Property({ fieldName: "classe_sigla", type: "string", length: 10, nullable: true })
	classeSigla?: string;

	@Property({ fieldName: "classe_descricao", type: "string", length: 80 })
	classeDescricao!: string;

	@OneToMany({ entity: () => SftProduto, mappedBy: "sftClasse", lazy: true })
	sftProdutoInverse = new Collection<SftProduto>(this);
}

@Entity({ tableName: "sft_ncmsh", schema: "public" })
export class SftNcmsh extends BaseEntity {

	[PrimaryKeyProp]?: "ncmshId";

	@PrimaryKey({ fieldName: "ncmsh_id", type: "number" })
	ncmshId!: number;

	@Index({ name: "sft_ncmsh_ncmsh_codigo_idx" })
	@Property({ fieldName: "ncmsh_codigo", type: "string", length: 20 })
	ncmshCodigo!: string;

	@Property({ fieldName: "ncmsh_grupo", type: "string", length: 20, nullable: true })
	ncmshGrupo?: string;

	@Property({ fieldName: "ncmsh_sub_grupo", type: "string", length: 20, nullable: true })
	ncmshSubGrupo?: string;

	@Property({ fieldName: "ncmsh_descricao", type: "string", columnType: "text", nullable: true })
	ncmshDescricao?: string;

	@Property({ fieldName: "ncmsh_descricao1", type: "string", columnType: "text", nullable: true })
	ncmshDescricao1?: string;

	@Property({ fieldName: "ncmsh_descricao2", type: "string", columnType: "text", nullable: true })
	ncmshDescricao2?: string;

	@Property({ fieldName: "usr_codigo_cadastro", type: "number", nullable: true })
	usrCodigoCadastro?: number;

	@Property({ fieldName: "usr_codigo", type: "number", nullable: true })
	usrCodigo?: number;

	@Property({ fieldName: "ncmsh_data_cadastro", type: "Date", length: 6, nullable: true })
	ncmshDataCadastro?: Date;

	@Property({ fieldName: "ncmsh_data_alteracao", type: "Date", length: 6, nullable: true })
	ncmshDataAlteracao?: Date;

	@Property({ fieldName: "ncmsh_ativo", type: "number", nullable: true })
	ncmshAtivo?: number;

	@OneToMany({ entity: () => SftProduto, mappedBy: "sftNcmsh", lazy: true })
	sftProdutoInverse = new Collection<SftProduto>(this);
}

@Entity({ tableName: "sft_produto", schema: "public" })
export class SftProduto extends BaseEntity {

	[PrimaryKeyProp]?: "produtId";

	@PrimaryKey({ fieldName: "produt_id", type: "number" })
	produtId!: number;

	@Index({ name: "sft_produto_produt_descricao_idx" })
	@Property({ fieldName: "produt_descricao", type: "string", length: 120, nullable: true })
	produtDescricao?: string;

	@Property({ fieldName: "produt_ativo", type: "number", nullable: true })
	produtAtivo?: number;

	@Property({ fieldName: "produt_data_alteracao", type: "Date", length: 6, nullable: true })
	produtDataAlteracao?: Date;

	@Property({ fieldName: "produt_data_cadastro", type: "Date", length: 6, nullable: true })
	produtDataCadastro?: Date;

	@Property({ fieldName: "usr_codigo_cadastro", type: "number", nullable: true })
	usrCodigoCadastro?: number;

	@ManyToOne({ entity: () => SftClasse, ref: true, fieldName: "classe_id", nullable: true, lazy: true, index: "sft_produto_classe_id_idx" })
	sftClasse?: Ref<SftClasse>;

	@ManyToOne({ entity: () => SftNcmsh, ref: true, fieldName: "ncmsh_id", nullable: true, lazy: true, index: "sft_produto_ncmsh_id_idx" })
	sftNcmsh?: Ref<SftNcmsh>;
}

@Entity({ tableName: "sft_sub_produto", schema: "public" })
@Index({ name: "sft_sub_produto_data_cadastro_date_idx", expression: "CREATE INDEX sft_sub_produto_data_cadastro_date_idx ON public.sft_sub_produto USING btree (((subpro_data_cadastro)::date))" })
@Index({ name: "sft_sub_produto_subpro_ativo_produt_id_subpro_comercial_idx", properties: ["subproAtivo", "sftProduto", "subproComercial"] })
@Index({ name: "sft_sub_produto_subpro_comercial_subpro_ativo_idx", properties: ["subproComercial", "subproAtivo"] })
export class SftSubProduto extends BaseEntity {

	[PrimaryKeyProp]?: "subproId";

	@PrimaryKey({ fieldName: "subpro_id", type: "number" })
	subproId!: number;

	@Index({ name: "sft_sub_produto_subpro_comercial_desc_idx" })
	@Property({ fieldName: "subpro_comercial", type: "string", length: 120 })
	subproComercial!: string;

	@Property({ fieldName: "subpro_volume", type: "string", columnType: "numeric(18,6)", nullable: true })
	subproVolume?: number;

	@Property({ fieldName: "subpro_peso_liquido", type: "string", columnType: "numeric(18,4)", defaultRaw: `0` })
	subproPesoLiquido!: number & Opt;

	@Property({ fieldName: "subpro_peso_bruto", type: "string", columnType: "numeric(18,4)", defaultRaw: `0` })
	subproPesoBruto!: number & Opt;

	@Property({ fieldName: "subpro_ean", type: "string", length: 50, nullable: true })
	subproEan?: string;

	@Property({ fieldName: "subpro_codigo", type: "number", nullable: true })
	subproCodigo?: number;

	@Property({ fieldName: "subpro_ativo", type: "number", nullable: true })
	subproAtivo?: number;

	@Property({ fieldName: "subpro_codigo_fornecedor", type: "string", length: 50, nullable: true })
	subproCodigoFornecedor?: string;

	@Property({ fieldName: "subpro_data_cadastro", type: "Date", length: 6, nullable: true })
	subproDataCadastro?: Date;

	@Property({ fieldName: "subpro_data_alteracao", type: "Date", length: 6, nullable: true })
	subproDataAlteracao?: Date;

	@OneToOne({ entity: () => SftProduto, ref: true, fieldName: "produt_id", nullable: true, lazy: true })
	sftProduto?: Ref<SftProduto>;
}