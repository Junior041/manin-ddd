import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Usuario, UsuarioProps } from '@/domain/enterprise/entities/usuarios.entity';
import { faker } from '@faker-js/faker';

export function makeUsuario(
	override: Partial<UsuarioProps> = {},
	id?: UniqueEntityID,
) {
	const answer = Usuario.create(
		{
			lojaId: override.lojaId ?? new UniqueEntityID(),
			nome: override.nome ?? faker.person.firstName(),
			cargo: override.cargo ??'MECANICO',
			cpf: override.cargo ?? faker.number.binary(),
			dataInativacao: override.dataInativacao ?? null,
			email: override.cargo ?? faker.internet.email(),
			senha_hash: override.cargo ?? faker.internet.password(),
			...override,
		},
		id,
	);

	return answer;
}