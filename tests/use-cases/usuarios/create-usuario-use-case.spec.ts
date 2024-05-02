import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { CreateUsuarioUseCase } from '@/domain/application/use-cases/usuario/create-usuario-use-case';
import { FakeHash } from 'tests/cryptography/fake-hash';
import { makeLoja } from 'tests/factories/makeLoja';
import { InMemoryLojaRepository } from 'tests/repositories/in-memory-loja-repository';
import { InMemoryUsuarioRepository } from 'tests/repositories/in-memory-usuario-repoitory';

describe('USUARIO - create', async() => {
	let inMemoryUsuarioRepository: InMemoryUsuarioRepository;
	let inMemoryLojaRepository: InMemoryLojaRepository;
	let fakeHash: FakeHash; 
	let sut: CreateUsuarioUseCase;
	beforeEach(() => {
		inMemoryUsuarioRepository = new InMemoryUsuarioRepository();
		inMemoryLojaRepository = new InMemoryLojaRepository;
		fakeHash = new FakeHash();
	
		sut = new CreateUsuarioUseCase(inMemoryUsuarioRepository,inMemoryLojaRepository,fakeHash);
	});

	it('should be able create a new usuario', async () => {
		const loja = makeLoja();
		await inMemoryLojaRepository.create(loja);
		const result = await sut.execute({
			lojaId: loja.id.toString(),
			cargo: 'MECANICO',
			cpf: '7879879798798',
			email: 'teste@gmail.com',
			nome: 'teste',
			senha: 'teste-senha',
		});
		expect(result.isRight()).toBe(true);
		expect(inMemoryUsuarioRepository.items.length).toBe(1);
		
		const passEncrypted = await fakeHash.compare('teste-senha', inMemoryUsuarioRepository.items[0].senha_hash);
		expect(passEncrypted).toBe(true);
		expect(inMemoryUsuarioRepository.items[0].nome).toBe('teste');
	});

	it('should not be able create a new usuario if loja not exists', async () => {
		const loja = makeLoja();
		const result = await sut.execute({
			lojaId: loja.id.toString(),
			cargo: 'MECANICO',
			cpf: '7879879798798',
			email: 'teste@gmail.com',
			nome: 'teste',
			senha: 'teste-senha',
		});
		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(ResourceNotFoundError);
		expect(inMemoryUsuarioRepository.items.length).toBe(0);
		
	});

});