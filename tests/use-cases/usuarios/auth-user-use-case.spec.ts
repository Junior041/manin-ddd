import { WrongCredentialsError } from '@/domain/application/use-cases/_erros/wrong-credentials-error';
import { AuthUserUseCase } from '@/domain/application/use-cases/usuario/auth-user-use-case';
import { FakeEncrypter } from 'tests/cryptography/fake-encrypter';
import { FakeHash } from 'tests/cryptography/fake-hash';
import { makeUsuario } from 'tests/factories/makeUsuario';
import { InMemoryUsuarioRepository } from 'tests/repositories/in-memory-usuario-repoitory';

describe('USUARIO - auth', async() => {
	let inMemoryUsuarioRepository: InMemoryUsuarioRepository;
	let fakeHash: FakeHash; 
	let fakeEncrypter: FakeEncrypter; 
	let sut: AuthUserUseCase;
	beforeEach(() => {
		inMemoryUsuarioRepository = new InMemoryUsuarioRepository();
		fakeHash = new FakeHash();
		fakeEncrypter = new FakeEncrypter();
		
		sut = new AuthUserUseCase(inMemoryUsuarioRepository, fakeHash, fakeEncrypter);

		vi.useFakeTimers();
	});
	
	afterEach(() => {
		vi.useRealTimers();
	});

	it('should be able auth user', async () => {
		const date = new Date();
		date.setDate(date.getDate() + (1 - date.getDay() + 7) % 7); // Define a data para o próximo dia que será Segunda-feira
		date.setHours(9); // Define as horas para 9

		vi.setSystemTime(date);
		
		const user = makeUsuario({
			email: 'teste@gmail.com',
			senha_hash: await fakeHash.hash('teste-senha'),
		});
		inMemoryUsuarioRepository.items.push(user);

		const result = await sut.execute({
			email: 'teste@gmail.com',
			senha: 'teste-senha',
		});
		
		expect(result.isRight()).toBe(true);
	});

	it('should be able not auth user if credentials not match', async () => {
		const user = makeUsuario({
			email: 'teste@gmail.com',
			senha_hash: await fakeHash.hash('teste-senha'),
		});
		inMemoryUsuarioRepository.items.push(user);
		const result = await sut.execute({
			email: 'teste@gmail.com',
			senha: 'teste-senha-2222',
		});
		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(WrongCredentialsError);
	});

});