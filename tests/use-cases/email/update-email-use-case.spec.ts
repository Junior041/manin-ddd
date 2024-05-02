import { UpdateEmailUseCase } from '@/domain/application/use-cases/email/update-email-use-case';
import { makeEmail } from 'tests/factories/makeEmail';
import { InMemoryEmailRepository } from 'tests/repositories/in-memory-email-repository';

describe('EMAIL - update', async() => {
	let inMemoryEmailRepository: InMemoryEmailRepository;
	let sut: UpdateEmailUseCase;
	beforeEach(() => {
		inMemoryEmailRepository = new InMemoryEmailRepository();
		sut = new UpdateEmailUseCase(inMemoryEmailRepository);
	});

	it('should be able create a update email', async () => {
		const email = makeEmail();
		inMemoryEmailRepository.create(email);
		const result = await sut.execute({
			email: 'teste@gmail.com',
			nome: 'teste',
			principal: false,
			publico: true,
			emailId: email.id.toString(),
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryEmailRepository.items.length).toBe(1);

		expect(inMemoryEmailRepository.items).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					email: 'teste@gmail.com',
					nome: 'teste',
					principal: false,
					publico: true,
				})
			])
		);
		
	});


});