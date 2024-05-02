import { DeleteEnderecoUseCase } from '@/domain/application/use-cases/endereco/delete-endereco-use-case';
import { makeEndereco } from 'tests/factories/makeEndereco';
import { InMemoryEnderecoRepository } from 'tests/repositories/in-memory-endereco-repository';

describe('ENDERECO - delete', async() => {
	let inMemoryEnderecoRepository: InMemoryEnderecoRepository;
	let sut: DeleteEnderecoUseCase;
	beforeEach(() => {
		inMemoryEnderecoRepository = new InMemoryEnderecoRepository();
		sut = new DeleteEnderecoUseCase(inMemoryEnderecoRepository);
	});

	it('should be able delete endereco', async () => {
		const endereco = makeEndereco();
		inMemoryEnderecoRepository.create(endereco);
		expect(inMemoryEnderecoRepository.items.length).toBe(1);
		const result = await sut.execute({
			enderecoId: endereco.id.toString(),
		});
		expect(result.isRight()).toBe(true);
		expect(inMemoryEnderecoRepository.items.length).toBe(0);
	});


});