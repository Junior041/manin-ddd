import { DeleteEmailUseCase } from '@/domain/application/use-cases/email/delete-email-use-case';
import { makeEmail } from 'tests/factories/makeEmail';
import { InMemoryEmailRepository } from 'tests/repositories/in-memory-email-repository';

describe('EMAIL - delete', async() => {
	let inMemoryEmailRepository: InMemoryEmailRepository;
	let sut: DeleteEmailUseCase;
	beforeEach(() => {
		inMemoryEmailRepository = new InMemoryEmailRepository();
		sut = new DeleteEmailUseCase(inMemoryEmailRepository);
	});

	it('should be able delete email', async () => {
		const email = makeEmail();
		inMemoryEmailRepository.create(email);
		expect(inMemoryEmailRepository.items.length).toBe(1);
		const result = await sut.execute({
			emailId: email.id.toString(),
		});
		expect(result.isRight()).toBe(true);
		expect(inMemoryEmailRepository.items.length).toBe(0);
	});


});