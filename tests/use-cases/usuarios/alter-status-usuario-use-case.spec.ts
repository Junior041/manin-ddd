import { AlterStatusUsuarioUseCase } from '@/domain/application/use-cases/usuario/alter-status-usuario-use-case';
import { makeUsuario } from 'tests/factories/makeUsuario';
import { InMemoryUsuarioRepository } from 'tests/repositories/in-memory-usuario-repoitory';

describe('USUARIO - alter status', async() => {
	let inMemoryUsuarioRepository: InMemoryUsuarioRepository;
	let sut: AlterStatusUsuarioUseCase;
	beforeEach(() => {
		inMemoryUsuarioRepository = new InMemoryUsuarioRepository();
		sut = new AlterStatusUsuarioUseCase(inMemoryUsuarioRepository);

		vi.useFakeTimers();
	});
	afterEach(() => {
		vi.useRealTimers();
	});

	it('should be able inativete usuario', async () => {
		const user = makeUsuario({
			dataInativacao: null
		});
		inMemoryUsuarioRepository.items.push(user);
		vi.setSystemTime(new Date(2021, 1, 1, 0, 0, 0, 0));
		const response = await sut.execute({
			idUsuario: user.id.toString()
		});

		expect(response.isRight()).toBe(true);
		const usuarioInDatabase = await inMemoryUsuarioRepository.findById(user.id.toString());
		
		expect(usuarioInDatabase?.dataInativacao).not.toBeNull();
		expect(usuarioInDatabase?.dataInativacao).toEqual(new Date(2021, 1, 1, 0, 0, 0, 0));
	});

	it('should be able ativate usuario', async () => {
		const user = makeUsuario({
			dataInativacao: new Date(2021, 1, 1, 0, 0, 0, 0)
		});
		
		inMemoryUsuarioRepository.items.push(user);

		const response = await sut.execute({
			idUsuario: user.id.toString()
		});

		expect(response.isRight()).toBe(true);

		const usuarioInDatabase = await inMemoryUsuarioRepository.findById(user.id.toString());
		expect(usuarioInDatabase?.dataInativacao).toBeNull();
	});

});