import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { FindEnderecoByReferenceIdUseCase } from '@/domain/application/use-cases/endereco/find-endereco-by-reference-use-case';
import { makeEndereco } from 'tests/factories/makeEndereco';
import { InMemoryEnderecoRepository } from 'tests/repositories/in-memory-endereco-repository';

describe('ENDERECO - find by reference', async () => {
	let inMemoryEnderecoRepository: InMemoryEnderecoRepository;
	let sut: FindEnderecoByReferenceIdUseCase;
	beforeEach(() => {
		inMemoryEnderecoRepository = new InMemoryEnderecoRepository();
		sut = new FindEnderecoByReferenceIdUseCase(inMemoryEnderecoRepository);
	});

	it('should be return list of endereco', async () => {
		for (let index = 1; index <= 5; index++) {
			const endereco = makeEndereco({referenceId: new UniqueEntityID('1')});
			inMemoryEnderecoRepository.items.push(endereco);
		}
		const result = await sut.execute({ referenceId: '1' });
		expect(result.isRight()).toBe(true);

		expect(result.value?.enderecos).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					referenceId: new UniqueEntityID('1'),
				})
			])
		);
	});
});
