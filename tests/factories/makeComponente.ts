import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Componente, ComponenteProps } from '@/domain/enterprise/entities/componente.entity';
import { faker } from '@faker-js/faker';
import { makeMaquina } from './makeMaquina';

export function makeComponente(
	override: Partial<ComponenteProps> = {},
	id?: UniqueEntityID,
) {	
	const componente = Componente.create(
		{
			maquina: override.maquina || makeMaquina(),
			nome: override.nome || faker.lorem.word(),
			descricao: override.descricao || faker.lorem.sentence(),
			valorUnitario: override.valorUnitario || 'UNIDADE',
			identificador: override.identificador || faker.lorem.word(),
			valor: override.valor || faker.number.int(),
			...override,
		},
		id,
	);	
	return componente;
}