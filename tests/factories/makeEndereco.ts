import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Endereco, EnderecoProps } from '@/domain/enterprise/entities/endereco.entity';
import { faker } from '@faker-js/faker';

export function makeEndereco(
	override: Partial<EnderecoProps> = {},
	id?: UniqueEntityID,
) {
	const answer = Endereco.create(
		{
			referenceId: override.referenceId ?? new UniqueEntityID(),
			bairro: override.bairro ?? faker.location.streetAddress(),
			cep: override.cep ?? faker.location.zipCode(),
			cidade: override.cidade ?? faker.location.city(),
			complemeto: override.complemeto ?? faker.location.country(),
			endereco: override.endereco ?? faker.location.street(),
			estado: override.estado ?? faker.location.state(),
			latitude: override.latitude ?? faker.location.latitude(),
			longitude: override.longitude ?? faker.location.longitude(),
			numero: override.numero ?? faker.location.buildingNumber(),
			principal: override.principal ?? faker.datatype.boolean(),
			...override,
		},
		id,
	);

	return answer;
}