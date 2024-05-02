import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Email, EmailProps } from '@/domain/enterprise/entities/email.entity';
import { faker } from '@faker-js/faker';

export function makeEmail(
	override: Partial<EmailProps> = {},
	id?: UniqueEntityID,
) {
	const answer = Email.create(
		{
			referenceId: override.referenceId ?? new UniqueEntityID(),
			referenceType: override.referenceType ?? 'LOJA',
			email: override.email ?? faker.internet.email(),
			nome: override.nome ?? faker.person.firstName(),
			principal: override.principal ?? faker.datatype.boolean(),
			publico: override.publico ?? faker.datatype.boolean(),
			...override,
		},
		id,
	);

	return answer;
}