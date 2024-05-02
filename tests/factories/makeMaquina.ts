import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Maquina, MaquinaProps } from '@/domain/enterprise/entities/maquina.entity';
import { faker } from '@faker-js/faker';

export function makeMaquina(
	override: Partial<MaquinaProps> = {},
	id?: UniqueEntityID,
) {	
	const maquina = Maquina.create(
		{
			codigo: override.codigo || faker.number.int().toString(),
			dataAquisição: override.dataAquisição || null,
			dataInativacao: override.dataInativacao || null,
			descricao: override.descricao || faker.lorem.sentence(),
			lojaId: override.lojaId || new UniqueEntityID(),
			marca: override.marca || faker.lorem.word(),
			nome: override.nome || faker.lorem.word(),
			...override,
		},
		id,
	);	
	return maquina;
}