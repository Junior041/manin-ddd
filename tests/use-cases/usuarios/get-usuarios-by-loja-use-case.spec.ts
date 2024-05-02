import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { GetUsuariosByLojaUseCase } from '@/domain/application/use-cases/usuario/get-usuarios-by-loja-use-case';
import { makeUsuario } from 'tests/factories/makeUsuario';
import { InMemoryUsuarioRepository } from 'tests/repositories/in-memory-usuario-repoitory';

describe('USUARIO - get by loja', async() => {
	let inMemoryUsuarioRepository: InMemoryUsuarioRepository;
	let sut: GetUsuariosByLojaUseCase;
	beforeEach(() => {
		inMemoryUsuarioRepository = new InMemoryUsuarioRepository();
		sut = new GetUsuariosByLojaUseCase(inMemoryUsuarioRepository);
	});

	it('should be able get users by loja id', async () => {
		for (let index = 1; index <= 25; index++) {
			inMemoryUsuarioRepository.items.push(makeUsuario({lojaId: new UniqueEntityID('loja-id')}));
		}

		const resultPage1 = await sut.execute({
			lojaId: 'loja-id',
			params: { page: 1 }
		});

		expect(resultPage1.isRight()).toBe(true);
		expect(resultPage1.value?.usuarios).toHaveLength(20);

		const resultPage2 = await sut.execute({
			lojaId: 'loja-id',
			params: { page: 2 }
		});

		expect(resultPage2.isRight()).toBe(true);
		expect(resultPage2.value?.usuarios).toHaveLength(5);

	});

});