import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { UpdateUsuarioUseCase } from '@/domain/application/use-cases/usuario/update-usuario-use-case';
import { makeUsuario } from 'tests/factories/makeUsuario';
import { InMemoryUsuarioRepository } from 'tests/repositories/in-memory-usuario-repoitory';

describe('USUARIO - update', async() => {
	let inMemoryUsuarioRepository: InMemoryUsuarioRepository;
	let sut: UpdateUsuarioUseCase;
	beforeEach(() => {
		inMemoryUsuarioRepository = new InMemoryUsuarioRepository();
		
		sut = new UpdateUsuarioUseCase(inMemoryUsuarioRepository);
	});

	it('should be able update usuario', async () => {
		const usuario = makeUsuario({cargo: 'GERENTE'});
		inMemoryUsuarioRepository.items.push(usuario);

		const response = await sut.execeute({
			idUsuario: usuario.id.toString(),
			nome: 'new name',
			cargo: 'MECANICO'
		});

		expect(response.isRight()).toBe(true);
	});

	it('should be not able update unexist usuario', async () => {

		const response = await sut.execeute({
			idUsuario: 'usuario.id.toString()',
			nome: 'new name',
			cargo: 'MECANICO'
		});

		expect(response.isLeft()).toBe(true);
		expect(response.value).toBeInstanceOf(ResourceNotFoundError);
	});

});