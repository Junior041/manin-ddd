import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { CreateEmailUseCase } from '@/domain/application/use-cases/email/create-email-use-case';
import { makeLoja } from 'tests/factories/makeLoja';
import { InMemoryEmailRepository } from 'tests/repositories/in-memory-email-repository';
import { InMemoryLojaRepository } from 'tests/repositories/in-memory-loja-repository';

describe('EMAIL - create', async() => {
	let inMemoryEmailRepository: InMemoryEmailRepository;
	let inMemoryLojaRepository: InMemoryLojaRepository;
	let sut: CreateEmailUseCase;
	beforeEach(() => {
		inMemoryEmailRepository = new InMemoryEmailRepository();
		inMemoryLojaRepository = new InMemoryLojaRepository();
		sut = new CreateEmailUseCase(inMemoryEmailRepository, inMemoryLojaRepository);
	});

	it('should be able create a new email', async () => {
		const loja = makeLoja();
		inMemoryLojaRepository.create(loja);
		const result = await sut.execute({
			email: 'teste@gmail.com',
			nome: 'teste',
			principal: false,
			publico: true,
			referenceType: 'LOJA',
			referenceId: loja.id.toString(),
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryEmailRepository.items.length).toBe(1);
	});

	it('should not be able if not exists loja', async () => {
		const result = await sut.execute({
			email: 'teste@gmail.com',
			nome: 'teste',
			principal: false,
			publico: true,
			referenceType: 'LOJA',
			referenceId: 'loja.id.toString()',
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(ResourceNotFoundError);
		
	});

});