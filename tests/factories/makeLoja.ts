import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Loja, LojaProps } from '@/domain/enterprise/entities/loja.entity';
import { faker } from '@faker-js/faker';

export function makeLoja(
	override: Partial<LojaProps> = {},
	id?: UniqueEntityID,
) {
	const answer = Loja.create(
		{
			razaoSocial: override.razaoSocial ?? faker.person.firstName(),
			cnpj: override.cnpj ?? faker.number.toString(),
			ativo: override.ativo ?? faker.datatype.boolean(),
			...override,
		},
		id,
	);

	return answer;
}