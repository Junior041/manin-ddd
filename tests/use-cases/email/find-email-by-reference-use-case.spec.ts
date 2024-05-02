import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { FindEmailByReferenceIdUseCase } from '@/domain/application/use-cases/email/find-email-by-reference-use-case';
import { makeEmail } from 'tests/factories/makeEmail';
import { InMemoryEmailRepository } from 'tests/repositories/in-memory-email-repository';

describe('EMAIL - find by loja', async () => {
	let inMemoryEmailRepository: InMemoryEmailRepository;
	let sut: FindEmailByReferenceIdUseCase;
	beforeEach(() => {
		inMemoryEmailRepository = new InMemoryEmailRepository();
		sut = new FindEmailByReferenceIdUseCase(inMemoryEmailRepository);
	});

	it('should be return list of email', async () => {
		for (let index = 1; index <= 5; index++) {
			const email = makeEmail({referenceId: new UniqueEntityID('1')});
			inMemoryEmailRepository.items.push(email);
		}
		const result = await sut.execute({ referenceId: '1' });
		expect(result.isRight()).toBe(true);

		expect(result.value?.emails).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					referenceId: new UniqueEntityID('1'),
				})
			])
		);
	});
});
