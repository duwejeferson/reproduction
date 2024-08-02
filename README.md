# Reproduction repo for [A Second "unnecessary" query being fired searching for infos that were already on the first one](https://github.com/mikro-orm/mikro-orm/discussions/5889#discussioncomment-10216200)

## Steps to reproduce
* Install dependecies `pnpm i`;
* Run migrations `pnpm exec mikro-orm migration:up`
* Exec the reproduction file `pnpm exec ts-node unnecessary-query-reproduction.ts`

The output (for the queries) will be:
```
First example, where only one query is executed:
[query] select "s0".*, "s1"."produt_id" as "s1__produt_id", "s1"."produt_descricao" as "s1__produt_descricao", "s1"."produt_ativo" as "s1__produt_ativo", "s1"."produt_data_alteracao" as "s1__produt_data_alteracao", "s1"."produt_data_cadastro" as "s1__produt_data_cadastro", "s1"."usr_codigo_cadastro" as "s1__usr_codigo_cadastro", "s1"."classe_id" as "s1__classe_id", "s1"."ncmsh_id" as "s1__ncmsh_id", "s2"."ncmsh_id" as "s2__ncmsh_id", "s2"."ncmsh_codigo" as "s2__ncmsh_codigo", "s2"."ncmsh_grupo" as "s2__ncmsh_grupo", "s2"."ncmsh_sub_grupo" as "s2__ncmsh_sub_grupo", "s2"."ncmsh_descricao" as "s2__ncmsh_descricao", "s2"."ncmsh_descricao1" as "s2__ncmsh_descricao1", "s2"."ncmsh_descricao2" as "s2__ncmsh_descricao2", "s2"."usr_codigo_cadastro" as "s2__usr_codigo_cadastro", "s2"."usr_codigo" as "s2__usr_codigo", "s2"."ncmsh_data_cadastro" as "s2__ncmsh_data_cadastro", "s2"."ncmsh_data_alteracao" as "s2__ncmsh_data_alteracao", "s2"."ncmsh_ativo" as "s2__ncmsh_ativo", "s3"."classe_id" as "s3__classe_id", "s3"."classe_sigla" as "s3__classe_sigla", "s3"."classe_descricao" as "s3__classe_descricao" from "public"."sft_sub_produto" as "s0" left join "public"."sft_produto" as "s1" on "s0"."produt_id" = "s1"."produt_id" left join "public"."sft_ncmsh" as "s2" on "s1"."ncmsh_id" = "s2"."ncmsh_id" left join "public"."sft_classe" as "s3" on "s1"."classe_id" = "s3"."classe_id" order by "s0"."subpro_id" asc limit 10 offset 20 [took 5 ms, 10 results]
10

Second example, where for some reason a second query is fired, searching for fields that were already on the first one:
[query] select "s0"."subpro_id", "s0"."subpro_comercial", "s0"."subpro_ativo", "s0"."subpro_data_cadastro", "s0"."subpro_data_alteracao", "s0"."subpro_ean", "s0"."produt_id", "s0"."subpro_peso_liquido", "s0"."subpro_peso_bruto", "s0"."subpro_codigo_fornecedor", "s1"."produt_id" as "s1__produt_id", "s1"."classe_id" as "s1__classe_id", "s1"."ncmsh_id" as "s1__ncmsh_id", "s2"."ncmsh_id" as "s2__ncmsh_id", "s2"."ncmsh_codigo" as "s2__ncmsh_codigo", "s3"."classe_id" as "s3__classe_id", "s3"."classe_sigla" as "s3__classe_sigla", "s3"."classe_descricao" as "s3__classe_descricao" from "public"."sft_sub_produto" as "s0" left join "public"."sft_produto" as "s1" on "s0"."produt_id" = "s1"."produt_id" left join "public"."sft_ncmsh" as "s2" on "s1"."ncmsh_id" = "s2"."ncmsh_id" left join "public"."sft_classe" as "s3" on "s1"."classe_id" = "s3"."classe_id" order by "s0"."subpro_id" asc limit 10 offset 20 [took 4 ms, 10 results]
[query] select "s0"."produt_id", "s0"."ncmsh_id", "s0"."classe_id", "s1"."ncmsh_id" as "s1__ncmsh_id", "s1"."ncmsh_codigo" as "s1__ncmsh_codigo", "s2"."classe_id" as "s2__classe_id", "s2"."classe_sigla" as "s2__classe_sigla", "s2"."classe_descricao" as "s2__classe_descricao" from "public"."sft_produto" as "s0" left join "public"."sft_ncmsh" as "s1" on "s0"."ncmsh_id" = "s1"."ncmsh_id" left join "public"."sft_classe" as "s2" on "s0"."classe_id" = "s2"."classe_id" where "s0"."produt_id" in (21, 22, 23, 24, 25, 26, 27, 28, 29, 30) [took 3 ms, 10 results]
10
```
