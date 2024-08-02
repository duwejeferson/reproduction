import { Migration } from '@mikro-orm/migrations';

export class Migration20240802121640 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "sft_classe" ("classe_id" serial primary key, "classe_sigla" varchar(10) null, "classe_descricao" varchar(80) not null);');

    this.addSql('create table "sft_ncmsh" ("ncmsh_id" serial primary key, "ncmsh_codigo" varchar(20) not null, "ncmsh_grupo" varchar(20) null, "ncmsh_sub_grupo" varchar(20) null, "ncmsh_descricao" text null, "ncmsh_descricao1" text null, "ncmsh_descricao2" text null, "usr_codigo_cadastro" int null, "usr_codigo" int null, "ncmsh_data_cadastro" timestamptz(6) null, "ncmsh_data_alteracao" timestamptz(6) null, "ncmsh_ativo" int null);');
    this.addSql('create index "sft_ncmsh_ncmsh_codigo_idx" on "sft_ncmsh" ("ncmsh_codigo");');

    this.addSql('create table "sft_produto" ("produt_id" serial primary key, "produt_descricao" varchar(120) null, "produt_ativo" int null, "produt_data_alteracao" timestamptz(6) null, "produt_data_cadastro" timestamptz(6) null, "usr_codigo_cadastro" int null, "classe_id" int null, "ncmsh_id" int null);');
    this.addSql('create index "sft_produto_produt_descricao_idx" on "sft_produto" ("produt_descricao");');
    this.addSql('create index "sft_produto_classe_id_idx" on "sft_produto" ("classe_id");');
    this.addSql('create index "sft_produto_ncmsh_id_idx" on "sft_produto" ("ncmsh_id");');

    this.addSql('create table "sft_sub_produto" ("subpro_id" serial primary key, "subpro_comercial" varchar(120) not null, "subpro_volume" numeric(18,6) null, "subpro_peso_liquido" numeric(18,4) not null default 0, "subpro_peso_bruto" numeric(18,4) not null default 0, "subpro_ean" varchar(50) null, "subpro_codigo" int null, "subpro_ativo" int null, "subpro_codigo_fornecedor" varchar(50) null, "subpro_data_cadastro" timestamptz(6) null, "subpro_data_alteracao" timestamptz(6) null, "produt_id" int null);');
    this.addSql('create index "sft_sub_produto_subpro_comercial_desc_idx" on "sft_sub_produto" ("subpro_comercial");');
    this.addSql('alter table "sft_sub_produto" add constraint "sft_sub_produto_produt_id_unique" unique ("produt_id");');
    this.addSql('create index "sft_sub_produto_subpro_comercial_subpro_ativo_idx" on "sft_sub_produto" ("subpro_comercial", "subpro_ativo");');
    this.addSql('create index "sft_sub_produto_subpro_ativo_produt_id_subpro_comercial_idx" on "sft_sub_produto" ("subpro_ativo", "produt_id", "subpro_comercial");');

    this.addSql('alter table "sft_produto" add constraint "sft_produto_classe_id_foreign" foreign key ("classe_id") references "sft_classe" ("classe_id") on update cascade on delete set null;');
    this.addSql('alter table "sft_produto" add constraint "sft_produto_ncmsh_id_foreign" foreign key ("ncmsh_id") references "sft_ncmsh" ("ncmsh_id") on update cascade on delete set null;');

    this.addSql('alter table "sft_sub_produto" add constraint "sft_sub_produto_produt_id_foreign" foreign key ("produt_id") references "sft_produto" ("produt_id") on update cascade on delete set null;');
  }

}
